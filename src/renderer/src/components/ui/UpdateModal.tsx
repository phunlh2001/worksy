import * as React from 'react'
import { Download, CheckCircle2, Sparkles, RefreshCw } from 'lucide-react'
import type { UpdateStatus } from '@shared/types'

interface UpdateModalProps {
  status: UpdateStatus
  onRestart: () => void
}

function formatBytes(bytes?: number): string {
  if (!bytes || bytes <= 0) return '0.0 MB'
  const mb = bytes / (1024 * 1024)
  return `${mb.toFixed(1)} MB`
}

function formatSpeed(bytesPerSec?: number): string {
  if (!bytesPerSec || bytesPerSec <= 0) return ''
  const mb = bytesPerSec / (1024 * 1024)
  return `${mb.toFixed(1)} MB/s`
}

export function UpdateModal({ status, onRestart }: UpdateModalProps): React.JSX.Element | null {
  // Only show UI when an update is actively downloading or ready
  if (
    status.state !== 'available' &&
    status.state !== 'downloading' &&
    status.state !== 'downloaded'
  ) {
    return null
  }

  const isDownloaded = status.state === 'downloaded'
  const percent = Math.min(100, Math.max(isDownloaded ? 100 : 0, status.percent || 0))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm rounded-3xl bg-white border border-slate-200/90 shadow-2xl p-6 flex flex-col items-center text-center overflow-hidden">
        {/* Ambient Top Glow */}
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 -translate-y-10 blur-2xl pointer-events-none ${
            isDownloaded ? 'bg-emerald-400/25' : 'bg-sky-400/25'
          }`}
        />

        {/* Status Badge */}
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider mb-4 border ${
            isDownloaded
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-sky-50 text-sky-700 border-sky-200'
          }`}
        >
          {isDownloaded ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Update Ready</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-sky-600 animate-pulse" />
              <span>Updating Worksy</span>
            </>
          )}
        </div>

        {/* Icon Avatar */}
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 border shadow-sm transition-all ${
            isDownloaded
              ? 'bg-emerald-500 text-white border-emerald-400 shadow-emerald-500/20'
              : 'bg-sky-500 text-white border-sky-400 shadow-sky-500/20'
          }`}
        >
          {isDownloaded ? (
            <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
          ) : (
            <Download className="w-7 h-7 stroke-[2.2] animate-bounce" />
          )}
        </div>

        {/* Title & Description */}
        <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-1">
          {isDownloaded
            ? `Worksy v${status.version || ''} Ready`
            : `Updating to v${status.version || 'Latest'}`}
        </h3>

        <p className="text-xs text-slate-500 leading-relaxed mb-6 max-w-[280px]">
          {isDownloaded
            ? 'The update has been downloaded. Restarting the application to apply the latest version...'
            : 'Downloading the latest version from GitHub releases. Please wait a moment...'}
        </p>

        {/* Progress Bar Container */}
        <div className="w-full mb-3">
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/60 p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                isDownloaded
                  ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                  : 'bg-gradient-to-r from-sky-500 to-cyan-400 shadow-[0_0_10px_rgba(56,189,248,0.5)]'
              }`}
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Progress Stats */}
        <div className="w-full flex items-center justify-between text-[11px] font-mono text-slate-400 mb-6 px-1">
          <span>{isDownloaded ? 'Complete' : `${percent}%`}</span>
          {!isDownloaded && status.total && status.total > 0 && (
            <span>
              {formatBytes(status.transferred)} / {formatBytes(status.total)}
            </span>
          )}
          {!isDownloaded && status.bytesPerSecond && status.bytesPerSecond > 0 && (
            <span className="text-sky-600 font-semibold">{formatSpeed(status.bytesPerSecond)}</span>
          )}
        </div>

        {/* Action Button */}
        {isDownloaded ? (
          <button
            type="button"
            onClick={onRestart}
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-md shadow-emerald-950/20 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Restart Now</span>
          </button>
        ) : (
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
            <RefreshCw className="w-3 h-3 animate-spin text-sky-500" />
            <span>Restarting automatically after download</span>
          </div>
        )}
      </div>
    </div>
  )
}
