import { BrowserWindow, screen, shell } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import icon from '../../../resources/icon.png?asset'

export class WindowManager {
  private mainWindow: BrowserWindow | null = null
  private widgetWindow: BrowserWindow | null = null

  public createWindows(): void {
    this.createMainWindow()
    this.createWidgetWindow()
  }

  public getMainWindow(): BrowserWindow | null {
    return this.mainWindow
  }

  public getWidgetWindow(): BrowserWindow | null {
    return this.widgetWindow
  }

  private createMainWindow(): void {
    this.mainWindow = new BrowserWindow({
      width: 480,
      height: 660,
      show: false,
      autoHideMenuBar: true,
      frame: false,
      transparent: false,
      resizable: false,
      backgroundColor: '#f8fafc',
      ...(process.platform === 'linux' ? { icon } : {}),
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false
      }
    })

    this.mainWindow.on('ready-to-show', () => {
      this.mainWindow?.show()
    })

    this.mainWindow.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url)
      return { action: 'deny' }
    })

    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      this.mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
      this.mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    }
  }

  private createWidgetWindow(): void {
    const primaryDisplay = screen.getPrimaryDisplay()
    const { width } = primaryDisplay.workAreaSize
    const defaultX = Math.max(0, width - 350)
    const defaultY = 24

    this.widgetWindow = new BrowserWindow({
      width: 330,
      height: 76,
      x: defaultX,
      y: defaultY,
      show: false,
      frame: false,
      transparent: true,
      alwaysOnTop: true,
      skipTaskbar: true,
      resizable: false,
      hasShadow: false,
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false
      }
    })

    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      this.widgetWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}?window=widget`)
    } else {
      this.widgetWindow.loadFile(join(__dirname, '../renderer/index.html'), {
        query: { window: 'widget' }
      })
    }
  }

  public showWidgetMode(): void {
    if (this.mainWindow && !this.mainWindow.isDestroyed()) {
      this.mainWindow.hide()
    }
    if (this.widgetWindow && !this.widgetWindow.isDestroyed()) {
      this.widgetWindow.show()
    }
  }

  public showDashboardMode(): void {
    if (this.widgetWindow && !this.widgetWindow.isDestroyed()) {
      this.widgetWindow.hide()
    }
    if (this.mainWindow && !this.mainWindow.isDestroyed()) {
      this.mainWindow.show()
      this.mainWindow.focus()
    }
  }

  public moveWidget(deltaX: number, deltaY: number): void {
    if (this.widgetWindow && !this.widgetWindow.isDestroyed()) {
      const [currX, currY] = this.widgetWindow.getPosition()
      this.widgetWindow.setPosition(Math.round(currX + deltaX), Math.round(currY + deltaY))
    }
  }

  public broadcast(channel: string, data: unknown): void {
    if (this.mainWindow && !this.mainWindow.isDestroyed()) {
      this.mainWindow.webContents.send(channel, data)
    }
    if (this.widgetWindow && !this.widgetWindow.isDestroyed()) {
      this.widgetWindow.webContents.send(channel, data)
    }
  }
}
