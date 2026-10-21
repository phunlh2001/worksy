import { powerMonitor } from 'electron'
import type { TaskManager } from './taskManager'
import type { CurrentTask } from '../../shared/types'

export class IdleMonitor {
  private timer: NodeJS.Timeout | null = null
  private taskManager: TaskManager
  private onUpdate: (task: CurrentTask) => void
  private readonly IDLE_THRESHOLD_SECONDS = 180 // 3 minutes

  constructor(taskManager: TaskManager, onUpdate: (task: CurrentTask) => void) {
    this.taskManager = taskManager
    this.onUpdate = onUpdate
  }

  public start(): void {
    if (this.timer) return

    this.timer = setInterval(() => {
      this.checkIdle()
    }, 1000)
  }

  public stop(): void {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  }

  private checkIdle(): void {
    const current = this.taskManager.getCurrentTask()
    const idleSeconds = powerMonitor.getSystemIdleTime()

    if (current.status === 'RUNNING') {
      if (idleSeconds >= this.IDLE_THRESHOLD_SECONDS) {
        const updated = this.taskManager.setIdlePaused(idleSeconds)
        this.onUpdate(updated)
      } else {
        // Normal running tick
        const ticked = this.taskManager.tick()
        if (ticked) {
          this.onUpdate(ticked)
        }
      }
    } else if (current.status === 'IDLE_PAUSED') {
      // If user comes back (idle time resets to < 5 seconds)
      if (idleSeconds < 5) {
        const resumed = this.taskManager.setIdleResumed()
        this.onUpdate(resumed)
      }
    }
  }
}
