import type { CurrentTask, SessionTask } from '../../shared/types'

export class TaskManager {
  private currentTask: CurrentTask = {
    id: '',
    name: '',
    totalSeconds: 0,
    status: 'IDLE',
    idleSeconds: 0
  }

  // Ephemeral in-memory storage for today's session (resets on app close/reboot)
  private sessionTasks: SessionTask[] = []

  public getCurrentTask(): CurrentTask {
    return { ...this.currentTask }
  }

  public getSessionTasks(): SessionTask[] {
    return [...this.sessionTasks]
  }

  public startTask(name: string): CurrentTask {
    const trimmed = name.trim() || 'Untitled Work Task'
    // If resuming the same task or starting fresh
    if (this.currentTask.name === trimmed && this.currentTask.totalSeconds > 0) {
      this.currentTask.status = 'RUNNING'
      this.currentTask.startedAt = Date.now()
    } else {
      this.currentTask = {
        id: Math.random().toString(36).substring(2, 9),
        name: trimmed,
        totalSeconds: 0,
        status: 'RUNNING',
        idleSeconds: 0,
        startedAt: Date.now()
      }
    }
    return this.getCurrentTask()
  }

  public stopTask(): CurrentTask {
    this.currentTask.status = 'PAUSED'
    return this.getCurrentTask()
  }

  public tick(): CurrentTask | null {
    if (this.currentTask.status === 'RUNNING') {
      this.currentTask.totalSeconds += 1
      return this.getCurrentTask()
    }
    return null
  }

  public setIdlePaused(idleSecs: number): CurrentTask {
    if (this.currentTask.status === 'RUNNING') {
      this.currentTask.status = 'IDLE_PAUSED'
      this.currentTask.idleSeconds = idleSecs
      return this.getCurrentTask()
    }
    return this.getCurrentTask()
  }

  public setIdleResumed(): CurrentTask {
    if (this.currentTask.status === 'IDLE_PAUSED') {
      this.currentTask.status = 'RUNNING'
      this.currentTask.idleSeconds = 0
      return this.getCurrentTask()
    }
    return this.getCurrentTask()
  }

  public handleSavePrompt(save: boolean, createNew: boolean): CurrentTask {
    if (save && this.currentTask.totalSeconds > 0 && this.currentTask.name) {
      const now = new Date()
      const timeStr = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
      this.sessionTasks.unshift({
        id: this.currentTask.id,
        name: this.currentTask.name,
        totalSeconds: this.currentTask.totalSeconds,
        completedAt: timeStr
      })
    }

    if (createNew) {
      this.currentTask = {
        id: '',
        name: '',
        totalSeconds: 0,
        status: 'IDLE',
        idleSeconds: 0
      }
    }

    return this.getCurrentTask()
  }
}
