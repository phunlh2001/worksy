export type TimerStatus = 'IDLE' | 'RUNNING' | 'PAUSED' | 'IDLE_PAUSED'

export interface CurrentTask {
  id: string
  name: string
  totalSeconds: number
  status: TimerStatus
  idleSeconds: number
  startedAt?: number
}

export interface SessionTask {
  id: string
  name: string
  totalSeconds: number
  completedAt: string
}

export type UpdateState =
  'idle' | 'checking' | 'available' | 'downloading' | 'downloaded' | 'not-available' | 'error'

export interface UpdateStatus {
  state: UpdateState
  version?: string
  percent?: number
  transferred?: number
  total?: number
  bytesPerSecond?: number
  error?: string
}

export interface AppApi {
  startTracking: (taskName: string) => Promise<void>
  stopTracking: () => Promise<void>
  saveCurrentTask: (save: boolean, createNew: boolean) => Promise<void>
  getSessionTasks: () => Promise<SessionTask[]>
  onTimerUpdate: (callback: (task: CurrentTask) => void) => () => void
  onShowStopPrompt: (callback: (task: CurrentTask) => void) => () => void
  closeApp: () => void
  minimizeApp: () => void
  moveWidget: (deltaX: number, deltaY: number) => void
  isWidgetWindow: () => boolean
  getAutoStart: () => Promise<boolean>
  setAutoStart: (enabled: boolean) => Promise<boolean>
  getWidgetOpacity: () => Promise<number>
  setWidgetOpacity: (opacity: number) => Promise<number>
  onWidgetOpacityUpdate: (callback: (opacity: number) => void) => () => void
  getUpdateStatus: () => Promise<UpdateStatus>
  checkForUpdates: () => Promise<void>
  restartAndInstallUpdate: () => Promise<void>
  onUpdateStatus: (callback: (status: UpdateStatus) => void) => () => void
}
