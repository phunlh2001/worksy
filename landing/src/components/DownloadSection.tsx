import * as React from 'react'
import { Download, FolderArchive, Check, ShieldCheck, Cpu, HardDrive, FileCode } from 'lucide-react'

export function DownloadSection(): React.JSX.Element {
  return (
    <section
      id="download"
      className="py-24 relative bg-caro-emerald border-t border-emerald-500/20 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-medium text-emerald-400 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30">
            OFFICIAL RELEASES
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Download Worksy for <span className="neon-text-emerald">Windows</span>
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base">
            Latest release: <strong className="text-white font-mono">v1.0.4</strong> • Built with
            Electron 44 & React 19
          </p>
        </div>

        {/* Download Options Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card 1: Windows Setup Installer */}
          <div className="relative rounded-3xl glass-neon-card glass-neon-card-emerald border-2 border-emerald-500/60 p-8 flex flex-col justify-between neon-glow-emerald">
            <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-emerald-400 text-slate-950 text-xs font-bold font-mono uppercase tracking-wide">
              RECOMMENDED
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-400/60 flex items-center justify-center text-emerald-400">
                  <Download className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Windows Installer</h3>
                  <p className="text-xs font-mono text-slate-300">
                    worksy-setup-1.0.0.exe (~108 MB)
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Standard Windows executable installer. Configures desktop shortcuts, startup launch
                integration, and automatic background updates.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>One-click install with desktop icon</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Optional automatic launch on Windows boot</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>System tray background integration</span>
                </li>
              </ul>
            </div>

            <a
              href="https://github.com/phunlh2001/worksy/releases"
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-sm transition-all duration-150 cursor-pointer neon-glow-emerald active:scale-98"
            >
              <Download className="w-4 h-4" />
              <span>Download Installer (.exe)</span>
            </a>
          </div>

          {/* Card 2: Portable Archive */}
          <div className="rounded-3xl glass-neon-card glass-neon-card-emerald p-8 flex flex-col justify-between hover:border-emerald-500/50 transition-all">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-900/90 border border-slate-700 flex items-center justify-center text-slate-300">
                  <FolderArchive className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Portable Archive</h3>
                  <p className="text-xs font-mono text-slate-300">
                    worksy-portable-1.0.0.zip (~3 MB)
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Zero installation required. Extract anywhere and launch directly from a USB stick or
                portable directory without registry modifications.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>No administrative permissions required</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Zero registry footprint</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Runs standalone out-of-the-box</span>
                </li>
              </ul>
            </div>

            <a
              href="https://github.com/phunlh2001/worksy/releases"
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-emerald-500/30 font-semibold text-sm transition-all duration-150 cursor-pointer hover:border-emerald-400/50 active:scale-98"
            >
              <Download className="w-4 h-4" />
              <span>Download Portable (.zip)</span>
            </a>
          </div>
        </div>

        {/* System Specs & Integrity Bar */}
        <div className="mt-12 max-w-4xl mx-auto rounded-2xl glass-neon-card p-5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-300">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>OS: Windows 10 / 11 (64-bit)</span>
          </div>
          <div className="flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-cyan-400" />
            <span>Memory: ~65 MB RAM footprint</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>SHA-256 Verified Binary</span>
          </div>
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-slate-400" />
            <a
              href="https://github.com/phunlh2001/worksy/releases"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:underline"
            >
              GitHub Releases Workflow
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
