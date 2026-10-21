import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import type { AppApi, CurrentTask, SessionTask } from '../shared/types'

// Custom APIs for renderer
const api: AppApi = {
  startTracking: (taskName: string): Promise<void> => {
    return ipcRenderer.invoke('tracking:start', taskName)
  },
  stopTracking: (): Promise<void> => {
    return ipcRenderer.invoke('tracking:stop')
  },
  saveCurrentTask: (save: boolean, createNew: boolean): Promise<void> => {
    return ipcRenderer.invoke('tracking:save-prompt-response', { save, createNew })
  },
  getSessionTasks: (): Promise<SessionTask[]> => {
    return ipcRenderer.invoke('tracking:get-session-tasks')
  },
  onTimerUpdate: (callback: (task: CurrentTask) => void): (() => void) => {
    const subscription = (_event: Electron.IpcRendererEvent, task: CurrentTask): void => {
      callback(task)
    }
    ipcRenderer.on('timer:update', subscription)
    return () => {
      ipcRenderer.removeListener('timer:update', subscription)
    }
  },
  onShowStopPrompt: (callback: (task: CurrentTask) => void): (() => void) => {
    const subscription = (_event: Electron.IpcRendererEvent, task: CurrentTask): void => {
      callback(task)
    }
    ipcRenderer.on('tracking:show-stop-prompt', subscription)
    return () => {
      ipcRenderer.removeListener('tracking:show-stop-prompt', subscription)
    }
  },
  closeApp: (): void => {
    ipcRenderer.send('window:close')
  },
  minimizeApp: (): void => {
    ipcRenderer.send('window:minimize')
  },
  moveWidget: (deltaX: number, deltaY: number): void => {
    ipcRenderer.send('widget:move', { deltaX, deltaY })
  },
  isWidgetWindow: (): boolean => {
    return window.location.search.includes('window=widget')
  },
  getAutoStart: (): Promise<boolean> => {
    return ipcRenderer.invoke('app:get-auto-start')
  },
  setAutoStart: (enabled: boolean): Promise<boolean> => {
    return ipcRenderer.invoke('app:set-auto-start', enabled)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to renderer
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
