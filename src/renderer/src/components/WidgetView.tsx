import * as React from 'react'
import { Square, GripVertical, Clock, PauseCircle } from 'lucide-react'
import { TimeDisplay } from './TimeDisplay'
import type { CurrentTask } from '@shared/types'
import { cn } from '../lib/utils'

interface WidgetViewProps {
  task: CurrentTask
  onStop: () => void
}

export function WidgetView({ task, onStop }: WidgetViewProps): React.JSX.Element {
  const [isDragging, setIsDragging] = React.useState(false)
  const dragStartRef = React.useRef<{ x: number; y: number } | null>(null)

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    // Only drag with left click and not on buttons
    if (e.button !== 0) return
    setIsDragging(true)
    dragStartRef.current = { x: e.screenX, y: e.screenY }
  }

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      if (!isDragging || !dragStartRef.current) return
      const deltaX = e.screenX - dragStartRef.current.x
      const deltaY = e.screenY - dragStartRef.current.y

      if (deltaX !== 0 || deltaY !== 0) {
        window.api.moveWidget(deltaX, deltaY)
        dragStartRef.current = { x: e.screenX, y: e.screenY }
      }
    }

    const handleMouseUp = (): void => {
      setIsDragging(false)
      dragStartRef.current = null
    }

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  const isIdle = task.status === 'IDLE_PAUSED'

  return (
    <div
      onMouseDown={handleMouseDown}
      className={cn(
        'group w-full h-full flex items-center justify-between px-3 py-2 rounded-2xl border transition-all duration-300 select-none cursor-move app-drag-region',
        isDragging && 'scale-102 shadow-2xl bg-slate-950/90 border-sky-400/60 backdrop-blur-md',
        isIdle
          ? 'bg-amber-950/30 hover:bg-amber-950/80 border-amber-500/40 hover:border-amber-400 ring-2 ring-amber-400/20 shadow-lg'
          : 'bg-slate-950/20 hover:bg-slate-950/85 border-white/10 hover:border-slate-700/80 backdrop-blur-[2px] hover:backdrop-blur-md hover:shadow-2xl hover:shadow-black/60'
      )}
    >
      {/* Drag Grip Handle */}
      <div className="flex items-center gap-1.5 min-w-0 pr-2">
        <GripVertical className="w-3.5 h-3.5 text-slate-400/40 group-hover:text-slate-400 shrink-0 transition-colors" />
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1">
            <span
              className="text-[11px] font-medium text-slate-300/65 group-hover:text-white group-hover:font-semibold truncate max-w-[100px] transition-colors"
              title={task.name || 'Untitled Task'}
            >
              {task.name || 'Untitled Task'}
            </span>
            {isIdle && (
              <span className="inline-flex items-center px-1 py-0.2 rounded text-[9px] font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0 animate-pulse">
                Idle
              </span>
            )}
          </div>
          <div className="text-[10px] text-slate-400/50 group-hover:text-slate-400 flex items-center gap-1 transition-colors">
            {isIdle ? (
              <PauseCircle className="w-2.5 h-2.5 text-amber-400" />
            ) : (
              <Clock
                className="w-2.5 h-2.5 text-sky-400/70 group-hover:text-sky-400 animate-spin"
                style={{ animationDuration: '4s' }}
              />
            )}
            <span className="truncate">{isIdle ? 'Paused (Inactivity)' : 'Tracking Active'}</span>
          </div>
        </div>
      </div>

      {/* Real-time Counter */}
      <div className="flex items-center gap-2.5 shrink-0">
        <TimeDisplay
          totalSeconds={task.totalSeconds}
          size="compact"
          status={task.status}
          variant="dimmed"
        />

        {/* Stop Icon Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onStop()
          }}
          title="Stop Tracking"
          className="app-no-drag flex items-center justify-center w-7.5 h-7.5 rounded-xl bg-white/5 group-hover:bg-rose-500/20 text-rose-400/60 group-hover:text-rose-400 border border-white/10 group-hover:border-rose-500/40 hover:!bg-rose-500 hover:!text-white hover:!border-rose-500 transition-all duration-200 cursor-pointer active:scale-95 shadow-xs"
        >
          <Square className="w-3.5 h-3.5 fill-current" />
        </button>
      </div>
    </div>
  )
}
