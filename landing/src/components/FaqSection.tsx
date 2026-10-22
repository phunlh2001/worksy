import * as React from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

export function FaqSection(): React.JSX.Element {
  const faqs = [
    {
      q: 'What is the recommended / right way to use Worksy?',
      a: 'Name your active focus task and click Start Tracking. Worksy automatically minimizes into a compact floating widget docked at desktop top-right. Set your preferred background opacity slider once. From there, just focus on your work—do not manually pause the timer when grabbing coffee or taking a call, as Worksy automatically pauses after 3 minutes of inactivity and resumes when you return. Click Stop to record your session when switching tasks.'
    },
    {
      q: 'How does the widget background opacity slider work?',
      a: 'A dedicated control line lets you adjust the widget background between crisp solid white (100%) and a faint, faded transparent glass HUD (10%). At transparent levels, background windows, IDEs, and documents remain completely visible beneath the widget, while the timer digits and red Stop button remain prominently sharp with high-contrast text and dropshadows.'
    },
    {
      q: 'How does the 3-minute idle detection work?',
      a: 'Worksy queries Windows OS-level idle duration directly via Electron’s native powerMonitor API. It measures system-wide keyboard and mouse inactivity without reading your keystrokes, recording your screen, or logging what apps you are using.'
    },
    {
      q: 'Does Worksy send my data to the cloud or save files to disk?',
      a: 'No. Worksy is 100% offline. There is zero telemetry, zero analytics tracking, and zero database storage. As per our core philosophy, all task records live exclusively in-memory during your current desktop session and reset cleanly to zero upon computer shutdown or reboot.'
    },
    {
      q: 'How do I make Worksy start automatically with Windows?',
      a: 'In the main dashboard Settings, toggle "Launch on Windows Startup" on. Worksy integrates directly with Windows Login Items to start silently in your notification tray every time you power on your desktop.'
    },
    {
      q: 'Can I move the floating overlay timer to another screen?',
      a: 'Yes! Simply click and drag the tactile grip handle on the left side of the floating overlay. You can drag and dock it anywhere across your primary or secondary desktop monitors.'
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
            COMMON QUESTIONS & GUIDANCE
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Frequently Asked <span className="neon-text-cyan">Questions</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base">
            Everything you need to know about using Worksy the right way, including privacy, idle
            rules, and widget controls.
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
