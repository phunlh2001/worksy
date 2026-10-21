import * as React from 'react'
import { WidgetView } from './components/WidgetView'
import { DashboardView } from './components/DashboardView'
import type { CurrentTask, SessionTask } from '@shared/types'

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

    // Subscribe to real-time timer updates from Electron Main Process
    const unsubscribeUpdate = window.api?.onTimerUpdate?.((task) => {
      setCurrentTask(task)
    })

    // Subscribe to stop prompt trigger
    const unsubscribePrompt = window.api?.onShowStopPrompt?.((task) => {
      setCurrentTask(task)
      setShowStopPrompt(true)
    })

    return () => {
      isMounted = false
      unsubscribeUpdate?.()
      unsubscribePrompt?.()
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

  if (isWidget) {
    return <WidgetView task={currentTask} onStop={handleStop} />
  }

  return (
    <DashboardView
      task={currentTask}
      sessionTasks={sessionTasks}
      onStart={handleStart}
      onStop={handleStop}
      onSavePromptResponse={handleSavePromptResponse}
      showPrompt={showStopPrompt}
      onClosePrompt={() => setShowStopPrompt(false)}
    />
  )
}

export default App
