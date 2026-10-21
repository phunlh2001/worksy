import * as React from 'react'
import { cn } from '../../lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'active' | 'idle' | 'paused' | 'neutral'
}

export function Badge({ className, variant = 'neutral', ...props }: BadgeProps): React.JSX.Element {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide transition-colors',
        {
          'bg-emerald-50 text-emerald-700 border border-emerald-200': variant === 'active',
          'bg-amber-50 text-amber-700 border border-amber-200 animate-pulse': variant === 'idle',
          'bg-slate-100 text-slate-700 border border-slate-200': variant === 'paused',
          'bg-slate-50 text-slate-600 border border-slate-200': variant === 'neutral'
        },
        className
      )}
      {...props}
    />
  )
}
