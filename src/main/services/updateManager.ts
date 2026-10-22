import { app, ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'
import type { ProgressInfo, UpdateInfo } from 'electron-updater'
import { is } from '@electron-toolkit/utils'
import type { WindowManager } from '../windows/windowManager'
import type { UpdateStatus } from '../../shared/types'

export class UpdateManager {
  private windowManager: WindowManager
  private currentStatus: UpdateStatus = { state: 'idle' }
  private restartTimeout: NodeJS.Timeout | null = null

  constructor(windowManager: WindowManager) {
    this.windowManager = windowManager
  }

  public init(): void {
    // Configure autoUpdater
    autoUpdater.autoDownload = true
    autoUpdater.autoInstallOnAppQuit = false
    autoUpdater.autoRunAppAfterInstall = true
    autoUpdater.allowPrerelease = false

    // In development mode, allow testing against dev-app-update.yml
    if (is.dev || !app.isPackaged) {
      autoUpdater.forceDevUpdateConfig = true
    }

    // Logger configuration
    autoUpdater.logger = {
      info: (msg: unknown) => console.log('[AutoUpdater]', msg),
      warn: (msg: unknown) => console.warn('[AutoUpdater]', msg),
      error: (msg: unknown) => console.error('[AutoUpdater]', msg)
    }

    // Register updater events
    autoUpdater.on('checking-for-update', () => {
      console.log('[AutoUpdater] Checking for updates...')
      this.updateState({ state: 'checking' })
    })

    autoUpdater.on('update-available', (info: UpdateInfo) => {
      console.log(`[AutoUpdater] Update available: v${info.version}`)
      this.updateState({
        state: 'available',
        version: info.version,
        percent: 0
      })
    })

    autoUpdater.on('download-progress', (progress: ProgressInfo) => {
      this.updateState({
        state: 'downloading',
        percent: Math.round(progress.percent),
        transferred: progress.transferred,
        total: progress.total,
        bytesPerSecond: progress.bytesPerSecond
      })
    })

    autoUpdater.on('update-downloaded', (info: UpdateInfo) => {
      console.log(
        `[AutoUpdater] Update v${info.version} downloaded successfully. Restarting soon...`
      )
      this.updateState({
        state: 'downloaded',
        version: info.version,
        percent: 100
      })

      // Give user 2.5 seconds to see the completed state before restart
      if (this.restartTimeout) clearTimeout(this.restartTimeout)
      this.restartTimeout = setTimeout(() => {
        this.restartAndInstall()
      }, 2500)
    })

    autoUpdater.on('update-not-available', (info: UpdateInfo) => {
      console.log(
        `[AutoUpdater] App is up to date (current: v${app.getVersion()}, latest: v${info.version}). Doing nothing.`
      )
      this.updateState({ state: 'not-available', version: info.version })
    })

    autoUpdater.on('error', (err: Error) => {
      console.error('[AutoUpdater] Error encountered during update check:', err.message)
      this.updateState({ state: 'error', error: err.message })
    })

    // Register IPC handlers
    ipcMain.handle('updater:get-status', () => {
      return this.currentStatus
    })

    ipcMain.handle('updater:check', async () => {
      return this.checkForUpdates()
    })

    ipcMain.handle('updater:restart-and-install', () => {
      this.restartAndInstall()
    })

    // Automatically check for updates on application startup
    // Delay slightly to ensure windows and renderer event listeners are ready
    setTimeout(() => {
      this.checkForUpdates()
    }, 2000)
  }

  public async checkForUpdates(): Promise<void> {
    try {
      console.log(
        `[AutoUpdater] Checking for latest release on GitHub repo (current version: v${app.getVersion()})...`
      )
      await autoUpdater.checkForUpdates()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      console.error('[AutoUpdater] Check for updates caught error:', message)
      this.updateState({ state: 'error', error: message })
    }
  }

  public restartAndInstall(): void {
    if (this.restartTimeout) {
      clearTimeout(this.restartTimeout)
      this.restartTimeout = null
    }
    try {
      console.log('[AutoUpdater] Invoking quitAndInstall...')
      autoUpdater.quitAndInstall(false, true)
    } catch (err) {
      console.error('[AutoUpdater] Failed to quit and install:', err)
    }
  }

  private updateState(partial: Partial<UpdateStatus>): void {
    this.currentStatus = {
      ...this.currentStatus,
      ...partial
    }
    this.windowManager.broadcast('updater:status', this.currentStatus)
  }
}
