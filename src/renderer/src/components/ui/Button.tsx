import * as React from 'react'
import { cn } from '../../lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg' | 'icon'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]',
          {
            // Variants
            'bg-sky-600 text-white hover:bg-sky-500 shadow-sm shadow-sky-600/20 active:bg-sky-700':
              variant === 'primary',
            'bg-slate-100 text-slate-800 hover:bg-slate-200 active:bg-slate-300':
              variant === 'secondary',
            'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300':
              variant === 'outline',
            'hover:bg-slate-100 text-slate-600 hover:text-slate-900': variant === 'ghost',
            'bg-rose-500 text-white hover:bg-rose-600 active:bg-rose-700':
              variant === 'destructive',

            // Sizes
            'text-xs px-2.5 py-1.5 rounded-lg': size === 'sm',
            'text-sm px-4 py-2 rounded-xl': size === 'md',
            'text-base px-6 py-3 rounded-xl': size === 'lg',
            'p-2 rounded-xl': size === 'icon'
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'
