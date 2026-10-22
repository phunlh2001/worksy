import * as React from 'react'
import { WidgetView } from './components/WidgetView'
import { DashboardView } from './components/DashboardView'
import { UpdateModal } from './components/ui/UpdateModal'
import type { CurrentTask, SessionTask, UpdateStatus } from '@shared/types'

function App(): React.JSX.Element {
  const isWidget = React.useMemo(() => {
    return (
      (window.api && window.api.isWidgetWindow && window.api.isWidgetWindow()) ||
      window.location.search.includes('window=widget')
    )
  }, [])

  const [currentTask, setCurrentTask] = React.useState<CurrentTask>({
    id: '',
    name: '',
    totalSeconds: 0,
    status: 'IDLE',
    idleSeconds: 0
  })

  const [sessionTasks, setSessionTasks] = React.useState<SessionTask[]>([])
  const [showStopPrompt, setShowStopPrompt] = React.useState(false)
  const [updateStatus, setUpdateStatus] = React.useState<UpdateStatus>({ state: 'idle' })
  const [widgetOpacity, setWidgetOpacity] = React.useState<number>(() => {
    try {
      const saved = localStorage.getItem('worksy_widget_opacity')
      return saved !== null ? Number(saved) : 80
    } catch {
      return 80
    }
  })

  React.useEffect(() => {
    let isMounted = true

    window.api
      ?.getSessionTasks?.()
      .then((tasks) => {
        if (isMounted) {
          setSessionTasks(tasks)
        }
      })
      .catch((err) => {
        console.error('Failed to get session tasks:', err)
      })

    window.api
      ?.getWidgetOpacity?.()
      .then((val) => {
        if (isMounted && typeof val === 'number') {
          setWidgetOpacity(val)
        }
      })
      .catch((err) => {
        console.error('Failed to get widget opacity:', err)
      })

    window.api
      ?.getUpdateStatus?.()
      .then((st) => {
        if (isMounted && st) {
          setUpdateStatus(st)
        }
      })
      .catch((err) => {
        console.error('Failed to get update status:', err)
      })

    // Subscribe to real-time timer updates from Electron Main Process
    const unsubscribeUpdate = window.api?.onTimerUpdate?.((task) => {
      setCurrentTask(task)
    })

    // Subscribe to stop prompt trigger
    const unsubscribePrompt = window.api?.onShowStopPrompt?.((task) => {
      setCurrentTask(task)
      setShowStopPrompt(true)
    })

    // Subscribe to widget opacity updates from other window
    const unsubscribeOpacity = window.api?.onWidgetOpacityUpdate?.((val) => {
      setWidgetOpacity(val)
      try {
        localStorage.setItem('worksy_widget_opacity', String(val))
      } catch {
        // ignore
      }
    })

    // Subscribe to auto-updater status updates
    const unsubscribeUpdater = window.api?.onUpdateStatus?.((status) => {
      setUpdateStatus(status)
    })

    return () => {
      isMounted = false
      unsubscribeUpdate?.()
      unsubscribePrompt?.()
      unsubscribeOpacity?.()
      unsubscribeUpdater?.()
    }
  }, [])

  const refreshSessionTasks = React.useCallback(async () => {
    try {
      if (window.api && window.api.getSessionTasks) {
        const tasks = await window.api.getSessionTasks()
        setSessionTasks(tasks)
      }
    } catch (err) {
      console.error('Failed to get session tasks:', err)
    }
  }, [])

  const handleStart = async (taskName: string): Promise<void> => {
    try {
      await window.api.startTracking(taskName)
    } catch (err) {
      console.error('Failed to start tracking:', err)
    }
  }

  const handleStop = async (): Promise<void> => {
    try {
      await window.api.stopTracking()
    } catch (err) {
      console.error('Failed to stop tracking:', err)
    }
  }

  const handleSavePromptResponse = async (save: boolean, createNew: boolean): Promise<void> => {
    try {
      await window.api.saveCurrentTask(save, createNew)
      await refreshSessionTasks()
    } catch (err) {
      console.error('Failed to handle save prompt:', err)
    }
  }

  const handleOpacityChange = React.useCallback(async (newVal: number) => {
    setWidgetOpacity(newVal)
    try {
      localStorage.setItem('worksy_widget_opacity', String(newVal))
      await window.api?.setWidgetOpacity?.(newVal)
    } catch (err) {
      console.error('Failed to update widget opacity:', err)
    }
  }, [])

  const handleRestartUpdate = React.useCallback(async () => {
    try {
      await window.api?.restartAndInstallUpdate?.()
    } catch (err) {
      console.error('Failed to restart and install update:', err)
    }
  }, [])

  if (isWidget) {
    return (
      <>
        <WidgetView
          task={currentTask}
          onStop={handleStop}
          opacity={widgetOpacity}
          onOpacityChange={handleOpacityChange}
        />
        <UpdateModal status={updateStatus} onRestart={handleRestartUpdate} />
      </>
    )
  }

  return (
    <>
      <DashboardView
        task={currentTask}
        sessionTasks={sessionTasks}
        onStart={handleStart}
        onStop={handleStop}
        onSavePromptResponse={handleSavePromptResponse}
        showPrompt={showStopPrompt}
        onClosePrompt={() => setShowStopPrompt(false)}
        widgetOpacity={widgetOpacity}
        onWidgetOpacityChange={handleOpacityChange}
      />
      <UpdateModal status={updateStatus} onRestart={handleRestartUpdate} />
    </>
  )
}

export default App
