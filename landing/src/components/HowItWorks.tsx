import * as React from 'react'
import { Play, Sparkles, Coffee, History } from 'lucide-react'

export function HowItWorks(): React.JSX.Element {
  const steps = [
    {
      num: '01',
      title: 'Name Your Focus Task',
      desc: 'Type your task name into the minimalist dashboard. Worksy stamps tasks in-memory without bloated configurations.',
      icon: Sparkles,
      color: 'text-cyan-400',
      border: 'border-cyan-500/40'
    },
    {
      num: '02',
      title: 'One-Click Start & Dock',
      desc: 'Hit Start or press Enter. The main window blurs and minimizes, leaving a compact draggable floating timer at top-right.',
      icon: Play,
      color: 'text-emerald-400',
      border: 'border-emerald-500/40'
    },
    {
      num: '03',
      title: '3-Minute Auto Pause & Resume',
      desc: 'Step away from your desk for 3 minutes and tracking pauses automatically. Come back and touch your mouse to resume immediately.',
      icon: Coffee,
      color: 'text-amber-400',
      border: 'border-amber-500/40'
    },
    {
      num: '04',
      title: 'Stop & Ephemeral Daily Stamp',
      desc: 'Click Stop to pause time. Save the session to today’s list or start a new task. Everything resets cleanly on desktop shutdown.',
      icon: History,
      color: 'text-cyan-400',
      border: 'border-cyan-500/40'
    }
  ]

  return (
    <section
      id="how-it-works"
      className="py-24 relative bg-caro-cyan border-t border-cyan-500/20 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-medium text-cyan-400 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30">
            SIMPLE WORKFLOW
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How Worksy <span className="neon-text-cyan">Works</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base">
            No friction, no complex spreadsheets. Just open, focus, and let automatic idle detection
            handle the rest.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => {
            const Icon = s.icon
            return (
              <div
                key={s.num}
                className="relative rounded-3xl glass-neon-card p-6 flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-mono font-extrabold text-slate-600 group-hover:text-cyan-400 transition-colors">
                      {s.num}
                    </span>
                    <div
                      className={`w-10 h-10 rounded-xl bg-slate-900/80 border ${s.border} flex items-center justify-center ${s.color}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {s.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">{s.desc}</p>
                </div>

                <div className="mt-6 h-1 w-full rounded-full bg-slate-800/80 overflow-hidden">
                  <div className="h-full bg-cyan-400 w-0 group-hover:w-full transition-all duration-500 shadow-[0_0_10px_rgba(0,245,255,0.6)]" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
