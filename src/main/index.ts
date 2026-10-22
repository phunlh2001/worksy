import { app, ipcMain } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import { TaskManager } from './services/taskManager'
import { IdleMonitor } from './services/idleMonitor'
import { WindowManager } from './windows/windowManager'
import { TrayManager } from './services/trayManager'
import { UpdateManager } from './services/updateManager'
import type { CurrentTask } from '../shared/types'

const taskManager = new TaskManager()
const windowManager = new WindowManager()
let idleMonitor: IdleMonitor | null = null
let trayManager: TrayManager | null = null
let updateManager: UpdateManager | null = null

function broadcastUpdate(task: CurrentTask): void {
  windowManager.broadcast('timer:update', task)
  trayManager?.updateContextMenu()
}

// Ensure single instance
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', () => {
    windowManager.showDashboardMode()
  })
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.worksy.app')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // Create windows and tray
  windowManager.createWindows()
  trayManager = new TrayManager(windowManager, taskManager, () => updateManager)
  trayManager.init()

  // Initialize GitHub Releases auto updater
  updateManager = new UpdateManager(windowManager)
  updateManager.init()

  // Initialize Idle Monitor with broadcast callback
  idleMonitor = new IdleMonitor(taskManager, (task) => {
    broadcastUpdate(task)
  })
  idleMonitor.start()

  // Enable auto-start on Windows boot/login by default
  try {
    app.setLoginItemSettings({
      openAtLogin: true
    })
  } catch (err) {
    console.error('Failed to configure login item settings:', err)
  }

  // IPC: Auto-start on boot
  ipcMain.handle('app:get-auto-start', () => {
    try {
      const settings = app.getLoginItemSettings()
      return settings.openAtLogin
    } catch {
      return false
    }
  })

  ipcMain.handle('app:set-auto-start', (_, enabled: boolean) => {
    try {
      app.setLoginItemSettings({
        openAtLogin: enabled
      })
      trayManager?.updateContextMenu()
      return enabled
    } catch (err) {
      console.error('Failed to set login item settings:', err)
      return false
    }
  })

  // IPC: Widget Opacity / Transparency Settings
  let widgetOpacity = 80
  ipcMain.handle('app:get-widget-opacity', () => {
    return widgetOpacity
  })

  ipcMain.handle('app:set-widget-opacity', (_, opacity: number) => {
    widgetOpacity = Math.max(0, Math.min(100, opacity))
    windowManager.broadcast('widget:opacity-updated', widgetOpacity)
    return widgetOpacity
  })

  // IPC: Start Tracking
  ipcMain.handle('tracking:start', (_, taskName: string) => {
    const task = taskManager.startTask(taskName)
    broadcastUpdate(task)
    windowManager.showWidgetMode()
    return task
  })

  // IPC: Stop Tracking (triggered from widget or dashboard)
  ipcMain.handle('tracking:stop', () => {
    const task = taskManager.stopTask()
    broadcastUpdate(task)
    // Restore dashboard and prompt user
    windowManager.showDashboardMode()
    windowManager.broadcast('tracking:show-stop-prompt', task)
    return task
  })

  // IPC: Save prompt response from user modal
  ipcMain.handle(
    'tracking:save-prompt-response',
    (_, { save, createNew }: { save: boolean; createNew: boolean }) => {
      const task = taskManager.handleSavePrompt(save, createNew)
      broadcastUpdate(task)
      return task
    }
  )

  // IPC: Get session tasks
  ipcMain.handle('tracking:get-session-tasks', () => {
    return taskManager.getSessionTasks()
  })

  // IPC: Widget Dragging
  ipcMain.on('widget:move', (_, { deltaX, deltaY }: { deltaX: number; deltaY: number }) => {
    windowManager.moveWidget(deltaX, deltaY)
  })

  // IPC: Window minimize / close
  ipcMain.on('window:minimize', () => {
    const win = windowManager.getMainWindow()
    if (win && !win.isDestroyed()) {
      win.minimize()
    }
  })

  ipcMain.on('window:close', () => {
    const win = windowManager.getMainWindow()
    if (win && !win.isDestroyed()) {
      win.hide()
    }
  })

  app.on('activate', () => {
    windowManager.showDashboardMode()
  })
})

app.on('window-all-closed', () => {
  // Keep app active in background tray on Windows
  if (process.platform !== 'darwin') {
    // If user explicitly quits via tray, app will quit.
  }
})

app.on('before-quit', () => {
  idleMonitor?.stop()
})
