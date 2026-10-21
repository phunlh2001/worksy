import * as React from 'react'
import { Activity, Layers, Clock, ShieldCheck, Power, Zap, Move } from 'lucide-react'

export function FeatureSection(): React.JSX.Element {
  const features = [
    {
      icon: Activity,
      title: '3-Minute OS-Level Inactivity Engine',
      description:
        'Uses Windows native powerMonitor to detect when you step away. Pauses automatically after 3 minutes without keylogging or intrusive tracking, and resumes the instant you touch your mouse.',
      glowClass: 'neon-glow-cyan-sm',
      accentColor: 'text-cyan-400',
      badge: 'NATIVE WINDOWS API'
    },
    {
      icon: Layers,
      title: 'Top-Right Floating Overlay',
      description:
        'On start, the main window minimizes and reveals a compact, translucent, always-on-top pill docked at desktop top-right. Zero desktop clutter, maximum focus.',
      glowClass: 'neon-glow-emerald',
      accentColor: 'text-emerald-400',
      badge: 'DUAL-WINDOW SYSTEM'
    },
    {
      icon: Clock,
      title: 'Segmented Precision Format',
      description:
        'Displays days, hours, minutes, and seconds (00d:00h:00m:00s) with micro-labels so you always know your exact active duration at a glance.',
      glowClass: 'neon-glow-cyan-sm',
      accentColor: 'text-cyan-400',
      badge: 'LABELED SEGMENTS'
    },
    {
      icon: ShieldCheck,
      title: '100% Ephemeral In-Memory Privacy',
      description:
        'Zero cloud sync, zero SQLite databases, and zero analytics telemetry. All daily task stamps live exclusively in RAM and reset to zero upon shutdown.',
      glowClass: 'neon-glow-emerald',
      accentColor: 'text-emerald-400',
      badge: 'ZERO DISK FOOTPRINT'
    },
    {
      icon: Power,
      title: 'Launch on Windows Startup',
      description:
        'Optionally opens right as your desktop turns on, ready for one-click tracking. Stays tucked in the Windows notification tray until you need it.',
      glowClass: 'neon-glow-cyan-sm',
      accentColor: 'text-cyan-400',
      badge: 'ONE-CLICK STARTUP'
    },
    {
      icon: Move,
      title: 'Draggable Anywhere on Screen',
      description:
        'Reposition the floating overlay widget anywhere across your multi-monitor desktop setup by grabbing the built-in tactile grip handle.',
      glowClass: 'neon-glow-emerald',
      accentColor: 'text-emerald-400',
      badge: 'MULTI-MONITOR READY'
    }
  ]

  return (
    <section
      id="features"
      className="py-24 relative bg-caro-emerald border-t border-emerald-500/20 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>BUILT FOR PURE FOCUS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Designed to work <span className="neon-text-emerald">silently in the background.</span>
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            Every feature in Worksy is optimized to eliminate manual timer management and protect
            your uninterrupted flow state.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => {
            const Icon = f.icon
            return (
              <div
                key={f.title}
                className="group relative rounded-3xl glass-neon-card glass-neon-card-emerald p-7 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-950/70 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>
                    <span className="text-[10px] font-mono tracking-wider text-emerald-300/90 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30">
                      {f.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {f.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed">{f.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-emerald-500/15 flex items-center gap-2 text-xs font-mono text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>View documentation</span>
                  <span>→</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
