import * as React from 'react'

export interface DialogProps {
  isOpen: boolean
  title: string
  description?: string
  children: React.ReactNode
  onClose?: () => void
}

export function Dialog({
  isOpen,
  title,
  description,
  children
}: DialogProps): React.JSX.Element | null {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl border border-slate-100 flex flex-col gap-4 animate-in zoom-in-95 duration-150">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          {description && (
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">{description}</p>
          )}
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}
