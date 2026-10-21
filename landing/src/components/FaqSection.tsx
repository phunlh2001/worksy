import * as React from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

export function FaqSection(): React.JSX.Element {
  const faqs = [
    {
      q: 'How does the 3-minute idle detection work?',
      a: 'Worksy queries Windows OS-level idle duration directly via Electron’s native powerMonitor API. It measures system-wide keyboard and mouse inactivity without reading your keystrokes, recording your screen, or logging what apps you are using.'
    },
    {
      q: 'Does Worksy send my data to the cloud or external servers?',
      a: 'No. Worksy is 100% offline. There is zero telemetry, zero analytics tracking, and zero internet requirement for timer functionality.'
    },
    {
      q: 'Are my completed tasks saved permanently to disk?',
      a: 'No. As per the design philosophy, all task records live exclusively in-memory during your current desktop session. When you shut down or restart your computer, everything resets to a clean slate with zero persistent disk footprint.'
    },
    {
      q: 'Can I move the floating overlay timer to another screen?',
      a: 'Yes! Simply click and drag the tactile grip handle on the left of the floating overlay. You can position it anywhere on your primary or secondary desktop monitors.'
    },
    {
      q: 'How do I run Worksy silently in the background?',
      a: 'When you click Start Tracking, the main window automatically minimizes and docks into the compact floating overlay. You can also minimize Worksy to the Windows system tray at any time.'
    }
  ]

  const [openIdx, setOpenIdx] = React.useState<number | null>(0)

  return (
    <section
      id="faq"
      className="py-24 relative bg-caro-cyan border-t border-cyan-500/20 scroll-mt-20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-xs font-mono font-medium text-cyan-400 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30">
            COMMON QUESTIONS
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Frequently Asked <span className="neon-text-cyan">Questions</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base">
            Everything you need to know about Worksy&apos;s privacy, idle detection, and
            architecture.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx
            return (
              <div
                key={faq.q}
                className="rounded-2xl glass-neon-card transition-all overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left text-sm font-semibold text-white hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-cyan-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-cyan-500/15">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
