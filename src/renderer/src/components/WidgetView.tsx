import * as React from 'react'
import { Square, GripVertical, Clock, PauseCircle, Sliders } from 'lucide-react'
import { TimeDisplay } from './TimeDisplay'
import type { CurrentTask } from '@shared/types'
import { cn } from '../lib/utils'

interface WidgetViewProps {
  task: CurrentTask
  onStop: () => void
  opacity?: number
  onOpacityChange?: (opacity: number) => void
}

export function WidgetView({
  task,
  onStop,
  opacity = 80,
  onOpacityChange
}: WidgetViewProps): React.JSX.Element {
  const [isDragging, setIsDragging] = React.useState(false)
  const [showSlider, setShowSlider] = React.useState(false)
  const dragStartRef = React.useRef<{ x: number; y: number } | null>(null)

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    // Only drag with left click and not on interactive buttons/inputs
    if (e.button !== 0) return
    const target = e.target as HTMLElement
    if (target.closest('button') || target.closest('input')) return
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
  const t = Math.max(0, Math.min(100, opacity)) / 100
  const isTransparent = t > 0.45

  // Interpolate background and border smoothly from white to faded transparent
  const r = Math.round(255 * (1 - t) + 15 * t)
  const g = Math.round(255 * (1 - t) + 23 * t)
  const b = Math.round(255 * (1 - t) + 42 * t)
  const a = Number((0.96 * (1 - t) + 0.12 * t).toFixed(2))
  const borderAlpha = Number((0.85 * (1 - t) + 0.18 * t).toFixed(2))
  const borderColor =
    t > 0.4 ? `rgba(255, 255, 255, ${borderAlpha})` : `rgba(203, 213, 225, ${borderAlpha})`
  const blurPx = Math.round(8 * (1 - t) + 2 * t)

  return (
    <div
      onMouseDown={handleMouseDown}
      style={{
        backgroundColor: isIdle
          ? isTransparent
            ? 'rgba(120, 53, 15, 0.35)'
            : 'rgba(254, 243, 199, 0.95)'
          : `rgba(${r}, ${g}, ${b}, ${a})`,
        borderColor: isIdle ? 'rgba(245, 158, 11, 0.6)' : borderColor,
        backdropFilter: `blur(${blurPx}px)`,
        WebkitBackdropFilter: `blur(${blurPx}px)`
      }}
      className={cn(
        'group relative w-full h-full flex flex-col justify-center px-3 py-2 rounded-2xl border transition-all duration-300 select-none cursor-move app-drag-region',
        isDragging && 'scale-102 shadow-2xl ring-2 ring-sky-400/40',
        isIdle && 'ring-2 ring-amber-400/20'
      )}
    >
      <div className="flex items-center justify-between w-full">
        {/* Drag Grip Handle & Task Info */}
        <div className="flex items-center gap-1.5 min-w-0 pr-2">
          <GripVertical
            className={cn(
              'w-3.5 h-3.5 shrink-0 transition-colors',
              isTransparent ? 'text-slate-300/60 drop-shadow-xs' : 'text-slate-400'
            )}
          />

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1">
              <span
                className={cn(
                  'text-[11px] font-semibold truncate max-w-[95px] transition-colors',
                  isTransparent
                    ? 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]'
                    : 'text-slate-800'
                )}
                title={task.name || 'Untitled Task'}
              >
                {task.name || 'Untitled Task'}
              </span>
              {isIdle && (
                <span className="inline-flex items-center px-1 py-0.2 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 shrink-0 animate-pulse">
                  Idle
                </span>
              )}
            </div>

            <div
              className={cn(
                'text-[10px] flex items-center gap-1 transition-colors',
                isTransparent ? 'text-slate-200/90 drop-shadow-xs font-medium' : 'text-slate-500'
              )}
            >
              {isIdle ? (
                <PauseCircle className="w-2.5 h-2.5 text-amber-400 shrink-0" />
              ) : (
                <Clock
                  className={cn(
                    'w-2.5 h-2.5 shrink-0 animate-spin',
                    isTransparent ? 'text-sky-300' : 'text-sky-500'
                  )}
                  style={{ animationDuration: '4s' }}
                />
              )}
              <span className="truncate">{isIdle ? 'Paused (Inactivity)' : 'Tracking Active'}</span>
            </div>
          </div>
        </div>

        {/* Real-time Counter & Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Quick Slider Toggle Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setShowSlider((prev) => !prev)
            }}
            title="Adjust Background Opacity Line"
            className={cn(
              'app-no-drag p-1 rounded-lg transition-all opacity-0 group-hover:opacity-100 cursor-pointer',
              isTransparent
                ? 'text-slate-300 hover:text-white hover:bg-white/10'
                : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100',
              showSlider && '!opacity-100 bg-sky-500/20 text-sky-300'
            )}
          >
            <Sliders className="w-3 h-3" />
          </button>

          {/* Time Display (Clearly displayed) */}
          <TimeDisplay
            totalSeconds={task.totalSeconds}
            size="compact"
            status={task.status}
            isTransparent={isTransparent}
          />

          {/* Stop Icon Button (Clearly displayed) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onStop()
            }}
            title="Stop Tracking"
            className="app-no-drag flex items-center justify-center w-7.5 h-7.5 rounded-xl bg-rose-500 hover:bg-rose-600 active:scale-95 text-white transition-all duration-150 cursor-pointer shadow-md shadow-rose-950/40 border border-rose-400/50 shrink-0"
          >
            <Square className="w-3.5 h-3.5 fill-current text-white" />
          </button>
        </div>
      </div>

      {/* Inline Control Line Slider */}
      {showSlider && (
        <div
          onMouseDown={(e) => e.stopPropagation()}
          className={cn(
            'app-no-drag mt-1.5 pt-1.5 border-t flex items-center gap-2 animate-in fade-in duration-200',
            isTransparent ? 'border-white/15 text-slate-200' : 'border-slate-200 text-slate-600'
          )}
        >
          <span className="text-[9px] font-medium shrink-0">White</span>
          <input
            type="range"
            min="0"
            max="100"
            value={opacity}
            onChange={(e) => onOpacityChange?.(Number(e.target.value))}
            className="w-full h-1 bg-gradient-to-r from-slate-200 via-sky-300 to-sky-600 rounded-lg appearance-none cursor-pointer accent-sky-500"
          />
          <span className="text-[9px] font-medium shrink-0">Transparent</span>
        </div>
      )}
    </div>
  )
}
