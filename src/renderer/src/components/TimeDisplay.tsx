import * as React from 'react'
import { formatSecondsToTime } from '../lib/timeUtils'
import { cn } from '../lib/utils'

interface TimeDisplayProps {
  totalSeconds: number
  className?: string
  size?: 'normal' | 'compact'
  status?: 'IDLE' | 'RUNNING' | 'PAUSED' | 'IDLE_PAUSED'
  variant?: 'default' | 'dimmed'
}

export function TimeDisplay({
  totalSeconds,
  className,
  size = 'normal',
  status = 'IDLE',
  variant = 'default'
}: TimeDisplayProps): React.JSX.Element {
  const { days, hours, minutes, seconds } = formatSecondsToTime(totalSeconds)

  if (size === 'compact') {
    if (variant === 'dimmed') {
      const isIdle = status === 'IDLE_PAUSED'
      return (
        <div
          className={cn(
            'flex items-baseline font-mono font-medium tracking-tight select-none transition-colors duration-200',
            className
          )}
        >
          <span className="text-slate-200/70 group-hover:text-white transition-colors">{days}</span>
          <span className="text-[10px] text-slate-400/50 group-hover:text-slate-400 font-sans mx-0.5 transition-colors">
            d
          </span>
          <span className="text-slate-500/40 group-hover:text-slate-500 mx-0.5 transition-colors">
            :
          </span>
          <span className="text-slate-200/70 group-hover:text-white transition-colors">
            {hours}
          </span>
          <span className="text-[10px] text-slate-400/50 group-hover:text-slate-400 font-sans mx-0.5 transition-colors">
            h
          </span>
          <span className="text-slate-500/40 group-hover:text-slate-500 mx-0.5 transition-colors">
            :
          </span>
          <span className="text-slate-200/70 group-hover:text-white transition-colors">
            {minutes}
          </span>
          <span className="text-[10px] text-slate-400/50 group-hover:text-slate-400 font-sans mx-0.5 transition-colors">
            m
          </span>
          <span className="text-slate-500/40 group-hover:text-slate-500 mx-0.5 transition-colors">
            :
          </span>
          <span
            className={cn(
              'font-bold transition-colors',
              isIdle
                ? 'text-amber-400/80 group-hover:text-amber-300'
                : 'text-sky-400/80 group-hover:text-sky-300'
            )}
          >
            {seconds}
          </span>
          <span
            className={cn(
              'text-[10px] font-sans ml-0.5 transition-colors',
              isIdle
                ? 'text-amber-400/60 group-hover:text-amber-400'
                : 'text-sky-400/60 group-hover:text-sky-400'
            )}
          >
            s
          </span>
        </div>
      )
    }

    return (
      <div
        className={cn(
          'flex items-baseline font-mono font-semibold text-slate-800 tracking-tight',
          className
        )}
      >
        <span className="text-slate-900">{days}</span>
        <span className="text-[10px] text-slate-400 font-sans mx-0.5">d</span>
        <span className="text-slate-300 mx-0.5">:</span>
        <span className="text-slate-900">{hours}</span>
        <span className="text-[10px] text-slate-400 font-sans mx-0.5">h</span>
        <span className="text-slate-300 mx-0.5">:</span>
        <span className="text-slate-900">{minutes}</span>
        <span className="text-[10px] text-slate-400 font-sans mx-0.5">m</span>
        <span className="text-slate-300 mx-0.5">:</span>
        <span className="text-sky-600 font-bold">{seconds}</span>
        <span className="text-[10px] text-sky-500 font-sans ml-0.5">s</span>
      </div>
    )
  }

  const segments = [
    { value: days, label: 'DAYS' },
    { value: hours, label: 'HOURS' },
    { value: minutes, label: 'MINUTES' },
    { value: seconds, label: 'SECONDS', highlight: true }
  ]

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className="flex items-center gap-2">
        {segments.map((seg, idx) => (
          <React.Fragment key={seg.label}>
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'flex items-center justify-center min-w-[70px] h-18 rounded-2xl bg-white border shadow-xs transition-colors',
                  seg.highlight
                    ? status === 'IDLE_PAUSED'
                      ? 'border-amber-300 bg-amber-50/50 text-amber-700'
                      : 'border-sky-200 bg-sky-50/30 text-sky-600'
                    : 'border-slate-200 text-slate-800'
                )}
              >
                <span className="font-mono text-3xl font-bold tracking-tight">{seg.value}</span>
              </div>
              <span className="mt-2 text-[10px] font-semibold tracking-wider text-slate-400">
                {seg.label}
              </span>
            </div>
            {idx < segments.length - 1 && (
              <span className="text-xl font-bold text-slate-300 -mt-6">:</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
