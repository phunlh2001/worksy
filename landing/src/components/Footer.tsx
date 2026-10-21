import * as React from 'react'
import { Clock } from 'lucide-react'
import { GithubIcon } from './GithubIcon'

export function Footer(): React.JSX.Element {
  return (
    <footer className="py-12 bg-[#061612]/95 border-t border-emerald-500/20 text-xs font-mono text-slate-400 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Clock className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-sm text-white">Worksy</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">Automated Desktop Work-Time Tracking</span>
        </div>

        <div className="flex items-center gap-6">
          <a href="#features" className="hover:text-emerald-400 transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-cyan-400 transition-colors">
            How It Works
          </a>
          <a href="#download" className="hover:text-emerald-400 transition-colors">
            Download
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
        </div>

        <div className="flex items-center gap-1 text-slate-500">
          <span>MIT License • Built for focused builders</span>
        </div>
      </div>
    </footer>
  )
}
