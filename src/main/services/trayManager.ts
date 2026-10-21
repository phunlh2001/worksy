import { Tray, Menu, app, nativeImage } from 'electron'
import iconPath from '../../../resources/favicon.ico?asset'
import type { WindowManager } from '../windows/windowManager'
import type { TaskManager } from './taskManager'

export class TrayManager {
  private tray: Tray | null = null
  private windowManager: WindowManager
  private taskManager: TaskManager

  constructor(windowManager: WindowManager, taskManager: TaskManager) {
    this.windowManager = windowManager
    this.taskManager = taskManager
  }

  public init(): void {
    let trayIcon: Electron.NativeImage
    try {
      trayIcon = nativeImage.createFromPath(iconPath).resize({ width: 16, height: 16 })
    } catch {
      trayIcon = nativeImage.createEmpty()
    }

    this.tray = new Tray(trayIcon)
    this.tray.setToolTip('Worksy - Work Time Tracker')

    this.updateContextMenu()

    this.tray.on('click', () => {
      this.windowManager.showDashboardMode()
    })
  }

  public updateContextMenu(): void {
    if (!this.tray) return

    const current = this.taskManager.getCurrentTask()
    const statusLabel =
      current.status === 'RUNNING'
        ? `🟢 Tracking: ${current.name}`
        : current.status === 'IDLE_PAUSED'
          ? `🟡 Idle Paused: ${current.name}`
          : '⚪ Idle (No Task Active)'

    const contextMenu = Menu.buildFromTemplate([
      { label: statusLabel, enabled: false },
      { type: 'separator' },
      {
        label: 'Open Dashboard',
        click: (): void => {
          this.windowManager.showDashboardMode()
        }
      },
      {
        label: 'Show Overlay Widget',
        click: (): void => {
          this.windowManager.showWidgetMode()
        }
      },
      { type: 'separator' },
      {
        label: 'Start with Windows',
        type: 'checkbox',
        checked: app.getLoginItemSettings().openAtLogin,
        click: (menuItem): void => {
          app.setLoginItemSettings({
            openAtLogin: menuItem.checked
          })
          this.updateContextMenu()
        }
      },
      { type: 'separator' },
      {
        label: 'Quit Worksy',
        click: (): void => {
          app.quit()
        }
      }
    ])

    this.tray.setContextMenu(contextMenu)
  }
}
