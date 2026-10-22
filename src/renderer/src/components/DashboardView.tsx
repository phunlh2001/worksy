import * as React from 'react'
import {
  Play,
  Square,
  Minus,
  X,
  History,
  Info,
  Clock,
  Sparkles,
  CheckCircle2,
  Power,
  Sliders,
  RefreshCw
} from 'lucide-react'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { Badge } from './ui/Badge'
import { Dialog } from './ui/Dialog'
import { TimeDisplay } from './TimeDisplay'
import { formatSecondsToCompactString } from '../lib/timeUtils'
import type { CurrentTask, SessionTask } from '@shared/types'

interface DashboardViewProps {
  task: CurrentTask
  sessionTasks: SessionTask[]
  onStart: (taskName: string) => void
  onStop: () => void
  onSavePromptResponse: (save: boolean, createNew: boolean) => void
  showPrompt: boolean
  onClosePrompt: () => void
  widgetOpacity?: number
  onWidgetOpacityChange?: (opacity: number) => void
}

export function DashboardView({
  task,
  sessionTasks,
  onStart,
  onStop,
  onSavePromptResponse,
  showPrompt,
  onClosePrompt,
  widgetOpacity = 80,
  onWidgetOpacityChange
}: DashboardViewProps): React.JSX.Element {
  const [taskInput, setTaskInput] = React.useState(task.name || '')
  const [prevTaskName, setPrevTaskName] = React.useState(task.name)
  const [autoStart, setAutoStart] = React.useState<boolean>(true)

  React.useEffect(() => {
    let isMounted = true
    window.api
      ?.getAutoStart?.()
      .then((enabled) => {
        if (isMounted) setAutoStart(enabled)
      })
      .catch((err) => {
        console.error('Failed to get auto-start setting:', err)
      })
    return () => {
      isMounted = false
    }
  }, [])

  const handleToggleAutoStart = async (): Promise<void> => {
    const nextVal = !autoStart
    setAutoStart(nextVal)
    try {
      await window.api?.setAutoStart?.(nextVal)
    } catch (err) {
      console.error('Failed to update auto start setting:', err)
      setAutoStart(autoStart)
    }
  }

  const [checkingUpdate, setCheckingUpdate] = React.useState(false)

  const handleCheckUpdate = async (): Promise<void> => {
    setCheckingUpdate(true)
    try {
      await window.api?.checkForUpdates?.()
    } catch (err) {
      console.error('Manual check update error:', err)
    } finally {
      setTimeout(() => {
        setCheckingUpdate(false)
      }, 1500)
    }
  }

  if (task.name !== prevTaskName) {
    setPrevTaskName(task.name)
    setTaskInput(task.name || '')
  }

  const isRunning = task.status === 'RUNNING'
  const isIdle = task.status === 'IDLE_PAUSED'

  const handleStartClick = (): void => {
    onStart(taskInput.trim() || 'Focus Work Session')
  }

  const handleSaveModal = (save: boolean, createNew: boolean): void => {
    onSavePromptResponse(save, createNew)
    if (createNew) {
      setTaskInput('')
    }
    onClosePrompt()
  }

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-50/80 text-slate-800 select-none overflow-hidden">
      {/* Custom Minimalist Titlebar */}
      <header className="h-11 px-4 flex items-center justify-between border-b border-slate-200/80 bg-white/80 backdrop-blur-xs app-drag-region">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-lg bg-sky-600 flex items-center justify-center text-white shadow-xs">
            <Clock className="w-3 h-3 stroke-[2.5]" />
          </div>
          <span className="font-semibold text-xs tracking-tight text-slate-900">Worksy</span>
          <span className="text-[10px] text-slate-400 font-medium">Desktop</span>
        </div>

        <div className="flex items-center gap-1 app-no-drag">
          <button
            type="button"
            onClick={() => window.api.minimizeApp()}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => window.api.closeApp()}
            title="Minimize to Tray"
            className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-6">
        {/* Status Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">Time Tracker</h1>
            <p className="text-xs text-slate-500">Track automatic work time on desktop</p>
          </div>
          <Badge variant={isRunning ? 'active' : isIdle ? 'idle' : 'neutral'} className="gap-1.5">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isRunning ? 'bg-emerald-500' : isIdle ? 'bg-amber-500' : 'bg-slate-400'
              }`}
            />
            {isRunning ? 'Tracking Live' : isIdle ? 'Idle Paused (3m)' : 'Ready'}
          </Badge>
        </div>

        {/* Task Input Card */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col gap-2">
          <label htmlFor="task-name" className="text-xs font-semibold text-slate-700">
            Current Task Name
          </label>
          <Input
            id="task-name"
            placeholder="e.g., Code Review, Product Design, Bug Fixing..."
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            disabled={isRunning || isIdle}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isRunning && !isIdle) {
                handleStartClick()
              }
            }}
          />
        </div>

        {/* Large Digital Clock Segment Display */}
        <div className="py-2 flex flex-col items-center">
          <TimeDisplay totalSeconds={task.totalSeconds} status={task.status} />
        </div>

        {/* Action Controls */}
        <div className="flex gap-3">
          {!isRunning && !isIdle ? (
            <Button
              onClick={handleStartClick}
              size="lg"
              className="flex-1 gap-2 bg-sky-600 hover:bg-sky-500 shadow-md shadow-sky-600/25"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start Tracking</span>
            </Button>
          ) : (
            <Button
              onClick={onStop}
              variant="destructive"
              size="lg"
              className="flex-1 gap-2 shadow-md shadow-rose-600/20"
            >
              <Square className="w-4 h-4 fill-current" />
              <span>Stop Tracking</span>
            </Button>
          )}
        </div>

        {/* Inactivity Notice */}
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-sky-50/60 border border-sky-100 text-sky-900 text-xs leading-relaxed">
          <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
          <p>
            When you start, the main window closes and a compact floating overlay appears at the
            top-right of your screen. If you remain inactive for <strong>3 minutes</strong>,
            tracking auto-pauses and resumes immediately when you return.
          </p>
        </div>

        {/* Windows Startup Toggle */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
          <div className="flex items-center gap-2">
            <Power className={`w-3.5 h-3.5 ${autoStart ? 'text-emerald-500' : 'text-slate-400'}`} />
            <div>
              <p className="text-xs font-semibold text-slate-800">Launch on Windows Startup</p>
              <p className="text-[10px] text-slate-400">Automatically open when desktop turns on</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleToggleAutoStart}
            role="switch"
            aria-checked={autoStart}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              autoStart ? 'bg-sky-600' : 'bg-slate-200'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                autoStart ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* GitHub Auto-Update Status Row */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <div>
              <p className="text-xs font-semibold text-slate-800">GitHub Auto-Updates</p>
              <p className="text-[10px] text-slate-400">
                Checks for newer releases every time app opens
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleCheckUpdate}
            disabled={checkingUpdate}
            className="px-2.5 py-1 rounded-lg text-[10px] font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
          >
            {checkingUpdate ? (
              <>
                <RefreshCw className="w-2.5 h-2.5 animate-spin text-sky-600" />
                <span>Checking...</span>
              </>
            ) : (
              <span>Check Now</span>
            )}
          </button>
        </div>

        {/* Docked Widget Background Control Line */}
        <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-sky-600" />
              <div>
                <p className="text-xs font-semibold text-slate-800">Docked Widget Background</p>
                <p className="text-[10px] text-slate-400">
                  Transition from solid white to a faded, transparent state
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              {widgetOpacity}% Faded
            </span>
          </div>

          {/* Slider Control Line */}
          <div className="flex items-center gap-2.5 pt-1">
            <span className="text-[10px] font-semibold text-slate-600 shrink-0">Solid White</span>
            <div className="relative flex-1 flex items-center">
              <input
                type="range"
                min="0"
                max="100"
                value={widgetOpacity}
                onChange={(e) => onWidgetOpacityChange?.(Number(e.target.value))}
                className="w-full h-1.5 bg-gradient-to-r from-slate-200 via-sky-300 to-sky-600 rounded-lg appearance-none cursor-pointer accent-sky-600"
              />
            </div>
            <span className="text-[10px] font-semibold text-slate-600 shrink-0">
              Faded Transparent
            </span>
          </div>
        </div>

        {/* Ephemeral Daily Session Stamps */}
        <div className="flex flex-col gap-2.5 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
              <History className="w-3.5 h-3.5 text-slate-500" />
              <span>Today&apos;s Sessions (In-Memory)</span>
            </div>
            <span className="text-[10px] text-slate-400">Resets on shutdown</span>
          </div>

          {sessionTasks.length === 0 ? (
            <div className="p-5 rounded-2xl bg-white border border-dashed border-slate-200 text-center flex flex-col items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-slate-300" />
              <p className="text-xs text-slate-400 font-medium">No completed tasks yet today</p>
              <p className="text-[10px] text-slate-400">Completed tasks will be stamped here</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-1">
              {sessionTasks.map((st) => (
                <div
                  key={st.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="text-xs font-medium text-slate-800 truncate">{st.name}</span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-mono font-bold text-slate-700">
                      {formatSecondsToCompactString(st.totalSeconds)}
                    </span>
                    <span className="text-[10px] text-slate-400">{st.completedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Stop Prompt Dialog */}
      <Dialog
        isOpen={showPrompt}
        title="Session Stopped"
        description={`Tracking stopped at ${formatSecondsToCompactString(task.totalSeconds)}.`}
        onClose={onClosePrompt}
      >
        <div className="flex flex-col gap-3">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
            <span className="font-semibold text-slate-900">Task:</span>{' '}
            {task.name || 'Untitled Task'}
          </div>

          <p className="text-xs text-slate-500">
            Would you like to save this task to today&apos;s session record and create a new one?
          </p>

          <div className="flex flex-col gap-2 mt-2">
            <Button
              onClick={() => handleSaveModal(true, true)}
              className="w-full text-xs font-semibold justify-center py-2.5"
            >
              Save & Create New Task
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSaveModal(true, false)}
              className="w-full text-xs font-semibold justify-center py-2.5"
            >
              Save & Keep Current Task
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleSaveModal(false, false)}
              className="w-full text-xs text-slate-500 hover:text-rose-600 justify-center py-2"
            >
              Don&apos;t Save
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
