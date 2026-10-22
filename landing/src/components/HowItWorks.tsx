import * as React from 'react'
import { Play, Sparkles, Coffee, Sliders, CheckCircle2, ShieldCheck, Zap } from 'lucide-react'

export function HowItWorks(): React.JSX.Element {
  const steps = [
    {
      num: '01',
      title: 'Name & Desktop Auto-Start',
      desc: 'Type your focus task into the minimalist dashboard. Optionally enable "Launch on Windows Startup" in settings so Worksy is waiting in your tray when you boot.',
      icon: Sparkles,
      color: 'text-cyan-400',
      border: 'border-cyan-500/40'
    },
    {
      num: '02',
      title: 'One-Click Start & Dock',
      desc: 'Hit Start or press Enter. The main window minimizes and docks into a compact floating overlay at desktop top-right (380×72px) with zero desktop clutter.',
      icon: Play,
      color: 'text-emerald-400',
      border: 'border-emerald-500/40'
    },
    {
      num: '03',
      title: 'Tune Opacity (White to Transparent)',
      desc: 'Use the background slider line to fade the widget from solid white to a faint transparent glass HUD. Background windows stay visible while time and stop remain vivid.',
      icon: Sliders,
      color: 'text-cyan-400',
      border: 'border-cyan-500/40'
    },
    {
      num: '04',
      title: '3-Minute Auto Pause & Stop',
      desc: 'Step away for 3 minutes and tracking pauses automatically. Resume the instant you touch your mouse. Hit the red Stop button anytime to stamp your daily progress.',
      icon: Coffee,
      color: 'text-amber-400',
      border: 'border-amber-500/40'
    }
  ]

  const rightWayPractices = [
    {
      title: 'Hands-Off Inactivity Pausing',
      desc: 'Never waste mental energy manually pausing before grabbing coffee or taking a quick call. Worksy monitors OS-level input and pauses at 3 minutes automatically, resuming the moment you return.',
      icon: Zap,
      tag: 'AUTOMATIC ENGINE'
    },
    {
      title: 'Tune Background Opacity Once',
      desc: 'Set the widget background to faint transparent (10%-30%) so it sits smoothly over code editors and documents without blocking your view, while the high-contrast timer stays sharp.',
      icon: Sliders,
      tag: 'HUD VISIBILITY'
    },
    {
      title: 'Zero-Footprint Ephemeral Peace',
      desc: 'No database cleanup or privacy anxiety. All task logs live strictly in RAM during your session and reset cleanly when you power down your PC.',
      icon: ShieldCheck,
      tag: 'ZERO DISK LEAK'
    }
  ]

  return (
    <section
      id="how-it-works"
      className="py-24 relative bg-caro-cyan border-t border-cyan-500/20 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-medium text-cyan-400 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30">
            OFFICIAL USAGE GUIDELINE
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How to Use Worksy <span className="neon-text-cyan">the Right Way</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base">
            Designed for ambient, hands-off operation. Learn how the docked overlay, 3-minute idle
            engine, and opacity slider work together to protect your focus.
          </p>
        </div>

        {/* 4-Step Workflow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
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

        {/* Best Practice Guidance Box */}
        <div className="rounded-3xl glass-neon-card p-8 sm:p-10 border border-cyan-500/30 bg-cyan-950/20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-cyan-500/20">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-medium mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>RECOMMENDED WORKFLOW RULES</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                3 Golden Rules for Peak Efficiency
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">
              No micromanagement • Zero bloat
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rightWayPractices.map((practice) => {
              const Icon = practice.icon
              return (
                <div
                  key={practice.title}
                  className="rounded-2xl bg-slate-900/60 border border-cyan-500/20 p-5 hover:border-cyan-400/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                      {practice.tag}
                    </span>
                    <Icon className="w-4 h-4 text-cyan-400" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2">{practice.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{practice.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
