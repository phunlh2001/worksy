import * as React from 'react'
import {
  Download,
  Play,
  Square,
  Sparkles,
  GripVertical,
  Clock,
  PauseCircle,
  RotateCcw,
  MousePointer,
  CheckCircle2,
  Sliders
} from 'lucide-react'

export function HeroSection(): React.JSX.Element {
  // Live Interactive Demo State
  const [taskName, setTaskName] = React.useState('Frontend Architecture & Design')
  const [isRunning, setIsRunning] = React.useState(false)
  const [isIdlePaused, setIsIdlePaused] = React.useState(false)
  const [seconds, setSeconds] = React.useState(42)
  const [widgetPosition, setWidgetPosition] = React.useState({ x: 0, y: 0 })
  const [widgetOpacity, setWidgetOpacity] = React.useState(80)
  const [isDragging, setIsDragging] = React.useState(false)
  const [showModal, setShowModal] = React.useState(false)
  const [completedSessions, setCompletedSessions] = React.useState([
    { id: '1', name: 'Electron IPC & Window Bridge', time: '00d:01h:24m:15s' }
  ])

  // Timer interval
  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isRunning && !isIdlePaused) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1)
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, isIdlePaused])

  const formatDemoTime = (totalSecs: number): { d: string; h: string; m: string; s: string } => {
    const d = Math.floor(totalSecs / 86400)
    const h = Math.floor((totalSecs % 86400) / 3600)
    const m = Math.floor((totalSecs % 3600) / 60)
    const s = totalSecs % 60
    return {
      d: String(d).padStart(2, '0'),
      h: String(h).padStart(2, '0'),
      m: String(m).padStart(2, '0'),
      s: String(s).padStart(2, '0')
    }
  }

  const { d, h, m, s } = formatDemoTime(seconds)

  const handleStart = (): void => {
    setIsRunning(true)
    setIsIdlePaused(false)
  }

  const handleStop = (): void => {
    setIsRunning(false)
    setIsIdlePaused(false)
    setShowModal(true)
  }

  const handleSimulateIdle = (): void => {
    if (!isRunning) return
    setIsIdlePaused((prev) => !prev)
  }

  const handleModalSave = (save: boolean): void => {
    if (save && seconds > 0) {
      setCompletedSessions((prev) => [
        { id: Date.now().toString(), name: taskName, time: `${d}d:${h}h:${m}m:${s}s` },
        ...prev
      ])
    }
    setShowModal(false)
    setSeconds(0)
  }

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-caro-cyan border-b border-cyan-500/20">
      {/* Background Neon Ambient Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] radial-glow-cyan pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] radial-glow-emerald pointer-events-none -z-10 opacity-70" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center relative z-10">
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-medium mb-6 neon-glow-cyan-sm">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Automatic Desktop Work-Time Tracking</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.1]">
          Effortless Time Tracking That{' '}
          <span className="neon-text-cyan block sm:inline">Stays Out Of Your Way.</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
          Zero distraction. Worksy automatically detects when you walk away for{' '}
          <strong>3 minutes</strong>, pauses tracking, resumes upon your return, and docks out of
          sight into a floating top-right desktop widget.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#download"
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-2xl text-sm font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-all duration-200 neon-glow-cyan active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Download for Windows (.exe)</span>
          </a>
          <a
            href="#demo"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-all duration-200 active:scale-95"
          >
            <Play className="w-4 h-4 text-cyan-400" />
            <span>Try Interactive Demo</span>
          </a>
        </div>

        <p className="mt-3 text-xs text-slate-400 font-mono">
          Windows 10 / 11 (64-bit) • 100% In-Memory Ephemeral Privacy • Free & Open Source
        </p>

        {/* ========================================================= */}
        {/* INTERACTIVE LIVE DEMO CANVAS */}
        {/* ========================================================= */}
        <div id="demo" className="mt-16 w-full max-w-4xl scroll-mt-24">
          <div className="relative rounded-3xl glass-neon-card p-4 sm:p-6 shadow-2xl backdrop-blur-xl">
            {/* Demo Header Controls */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-5">
              <div className="flex items-center gap-2 text-left">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-slate-400 ml-2">
                  interactive-worksy-simulation.exe
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                  LIVE SIMULATOR
                </span>
              </div>
            </div>

            {/* Interactive Simulation Body */}
            <div
              onMouseMove={() => {
                // If user simulated idle and moves mouse back, auto-resume!
                if (isIdlePaused) {
                  setIsIdlePaused(false)
                }
              }}
              className="relative min-h-[340px] rounded-2xl bg-[#06101c]/80 border border-cyan-500/20 p-6 flex flex-col items-center justify-center overflow-hidden"
            >
              {/* Background watermark */}
              <div className="absolute inset-0 cyber-grid opacity-40 pointer-events-none" />

              {!isRunning ? (
                /* Main Dashboard Mode */
                <div className="relative z-10 w-full max-w-md flex flex-col items-center gap-4 text-center">
                  <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                    Step 1: Set Task & Start
                  </span>

                  <input
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    placeholder="Enter current task name..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-cyan-500/40 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono transition-colors"
                  />

                  {/* Segmented Clock Preview */}
                  <div className="flex items-center gap-2 my-2 font-mono">
                    <div className="flex flex-col items-center">
                      <div className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xl font-bold text-slate-200">
                        {d}
                      </div>
                      <span className="text-[9px] text-slate-400 mt-1">DAYS</span>
                    </div>
                    <span className="text-slate-600 -mt-4">:</span>
                    <div className="flex flex-col items-center">
                      <div className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xl font-bold text-slate-200">
                        {h}
                      </div>
                      <span className="text-[9px] text-slate-400 mt-1">HOURS</span>
                    </div>
                    <span className="text-slate-600 -mt-4">:</span>
                    <div className="flex flex-col items-center">
                      <div className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xl font-bold text-slate-200">
                        {m}
                      </div>
                      <span className="text-[9px] text-slate-400 mt-1">MINS</span>
                    </div>
                    <span className="text-slate-600 -mt-4">:</span>
                    <div className="flex flex-col items-center">
                      <div className="px-3 py-2 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-xl font-bold text-cyan-400">
                        {s}
                      </div>
                      <span className="text-[9px] text-cyan-400 mt-1">SECS</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleStart}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm cursor-pointer transition-all duration-200 neon-glow-cyan active:scale-98"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Launch & Dock to Top-Right</span>
                  </button>
                </div>
              ) : (
                /* Top-Right Floating Widget Simulation Mode */
                <div className="relative z-10 w-full h-full min-h-[300px] flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800/80 pb-2">
                    <span className="flex items-center gap-1.5 text-cyan-400">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                      Main Window Blurred/Closed • Floating Overlay Active
                    </span>
                    <span className="text-[11px] text-slate-400 hidden sm:inline">
                      Simulated Desktop Screen
                    </span>
                  </div>

                  {/* Simulated Draggable Floating Overlay Widget */}
                  <div className="flex items-start justify-end py-6">
                    <div
                      onMouseDown={(e) => {
                        if (e.button === 0) setIsDragging(true)
                      }}
                      onMouseUp={() => setIsDragging(false)}
                      style={{
                        transform: `translate(${widgetPosition.x}px, ${widgetPosition.y}px)`,
                        backgroundColor: isIdlePaused
                          ? widgetOpacity > 45
                            ? 'rgba(120, 53, 15, 0.35)'
                            : 'rgba(254, 243, 199, 0.95)'
                          : `rgba(${Math.round(255 * (1 - widgetOpacity / 100) + 15 * (widgetOpacity / 100))}, ${Math.round(255 * (1 - widgetOpacity / 100) + 23 * (widgetOpacity / 100))}, ${Math.round(255 * (1 - widgetOpacity / 100) + 42 * (widgetOpacity / 100))}, ${(0.96 * (1 - widgetOpacity / 100) + 0.12 * (widgetOpacity / 100)).toFixed(2)})`,
                        borderColor: isIdlePaused
                          ? 'rgba(245, 158, 11, 0.6)'
                          : widgetOpacity > 40
                            ? `rgba(255, 255, 255, ${(0.85 * (1 - widgetOpacity / 100) + 0.18 * (widgetOpacity / 100)).toFixed(2)})`
                            : `rgba(203, 213, 225, ${(0.85 * (1 - widgetOpacity / 100) + 0.18 * (widgetOpacity / 100)).toFixed(2)})`,
                        backdropFilter: `blur(${Math.round(8 * (1 - widgetOpacity / 100) + 2 * (widgetOpacity / 100))}px)`,
                        WebkitBackdropFilter: `blur(${Math.round(8 * (1 - widgetOpacity / 100) + 2 * (widgetOpacity / 100))}px)`
                      }}
                      className={`group relative flex items-center justify-between gap-4 px-4 py-3 rounded-2xl transition-all duration-300 select-none ${
                        isDragging
                          ? 'cursor-grabbing scale-102 ring-2 ring-cyan-400/50 shadow-2xl'
                          : 'cursor-grab'
                      } ${isIdlePaused ? 'ring-2 ring-amber-400/20' : 'border shadow-lg'}`}
                    >
                      {/* Grip & Info */}
                      <div className="flex items-center gap-2">
                        <GripVertical
                          className={`w-4 h-4 transition-colors ${
                            widgetOpacity > 45
                              ? 'text-slate-300/60 drop-shadow-xs'
                              : 'text-slate-400'
                          }`}
                        />
                        <div className="text-left">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`text-xs font-semibold max-w-[130px] truncate transition-colors ${
                                widgetOpacity > 45
                                  ? 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]'
                                  : 'text-slate-800'
                              }`}
                            >
                              {taskName || 'Untitled Task'}
                            </span>
                            {isIdlePaused && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
                                IDLE 3m
                              </span>
                            )}
                          </div>
                          <div
                            className={`text-[10px] flex items-center gap-1 transition-colors ${
                              widgetOpacity > 45
                                ? 'text-slate-200/90 drop-shadow-xs font-medium'
                                : 'text-slate-500'
                            }`}
                          >
                            {isIdlePaused ? (
                              <PauseCircle className="w-2.5 h-2.5 text-amber-400" />
                            ) : (
                              <Clock
                                className={`w-2.5 h-2.5 animate-spin ${
                                  widgetOpacity > 45 ? 'text-cyan-300' : 'text-cyan-600'
                                }`}
                                style={{ animationDuration: '3s' }}
                              />
                            )}
                            <span>{isIdlePaused ? 'Paused (Inactivity)' : 'Tracking Live'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Timer Display (Clearly displayed) */}
                      <div className="flex items-baseline font-mono font-bold text-xs tracking-tight transition-colors">
                        <span
                          className={
                            widgetOpacity > 45
                              ? 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]'
                              : 'text-slate-900'
                          }
                        >
                          {d}d
                        </span>
                        <span className="text-slate-400 mx-0.5">:</span>
                        <span
                          className={
                            widgetOpacity > 45
                              ? 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]'
                              : 'text-slate-900'
                          }
                        >
                          {h}h
                        </span>
                        <span className="text-slate-400 mx-0.5">:</span>
                        <span
                          className={
                            widgetOpacity > 45
                              ? 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]'
                              : 'text-slate-900'
                          }
                        >
                          {m}m
                        </span>
                        <span className="text-slate-400 mx-0.5">:</span>
                        <span
                          className={`font-black transition-colors ${
                            isIdlePaused
                              ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]'
                              : widgetOpacity > 45
                                ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(0,245,255,0.8)]'
                                : 'text-cyan-600'
                          }`}
                        >
                          {s}s
                        </span>
                      </div>

                      {/* Stop Button (Clearly displayed) */}
                      <button
                        type="button"
                        onClick={handleStop}
                        title="Stop Session"
                        className="p-2 rounded-xl bg-rose-500 hover:bg-rose-600 active:scale-95 text-white shadow-md shadow-rose-950/40 border border-rose-400/50 transition-all cursor-pointer"
                      >
                        <Square className="w-3.5 h-3.5 fill-current text-white" />
                      </button>
                    </div>
                  </div>

                  {/* Simulation Helper Controls */}
                  <div className="flex flex-col gap-3 pt-4 border-t border-slate-800/80 text-xs font-mono">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-slate-400 text-left">
                        <MousePointer className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>
                          {isIdlePaused
                            ? 'Move your mouse inside this canvas to auto-resume!'
                            : 'Drag the widget or simulate stepping away:'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleSimulateIdle}
                          className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-all ${
                            isIdlePaused
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                              : 'bg-amber-500/10 text-amber-400 border-amber-500/40 hover:bg-amber-500/20'
                          }`}
                        >
                          {isIdlePaused ? 'Resume Tracking' : '⚡ Simulate 3-Min Inactivity'}
                        </button>

                        <button
                          type="button"
                          onClick={() => setWidgetPosition({ x: 0, y: 0 })}
                          title="Reset Widget Position"
                          className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Background Opacity Control Line */}
                    <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-800/50">
                      <div className="flex items-center gap-2 text-slate-300 shrink-0">
                        <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="text-[11px]">Background Line Control:</span>
                      </div>
                      <div className="flex items-center gap-2 flex-1 max-w-sm">
                        <span className="text-[10px] text-slate-400 shrink-0">Solid White</span>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={widgetOpacity}
                          onChange={(e) => setWidgetOpacity(Number(e.target.value))}
                          className="w-full h-1.5 bg-gradient-to-r from-slate-200 via-cyan-300 to-cyan-500 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                        />
                        <span className="text-[10px] text-slate-400 shrink-0">
                          Faded Transparent
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded bg-cyan-950/70 shrink-0">
                        {widgetOpacity}% Faded
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Stop Confirmation Modal Simulation */}
              {showModal && (
                <div className="absolute inset-0 z-20 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
                  <div className="w-full max-w-sm rounded-2xl bg-[#0d1322] border border-cyan-500/30 p-5 text-left shadow-2xl flex flex-col gap-3">
                    <h4 className="text-sm font-bold text-white">Session Stopped</h4>
                    <p className="text-xs text-slate-400">
                      Tracking stopped at{' '}
                      <span className="font-mono text-cyan-400 font-bold">
                        {d}d:{h}h:{m}m:{s}s
                      </span>
                      . Would you like to save this task to today&apos;s session record?
                    </p>
                    <div className="flex flex-col gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => handleModalSave(true)}
                        className="w-full py-2 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs hover:bg-cyan-300 cursor-pointer"
                      >
                        Save & Create New Task
                      </button>
                      <button
                        type="button"
                        onClick={() => handleModalSave(false)}
                        className="w-full py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs cursor-pointer"
                      >
                        Don&apos;t Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Simulated Session Stamps Footer */}
            {completedSessions.length > 0 && (
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Logged Today: {completedSessions[0].name}</span>
                </span>
                <span className="text-cyan-400 font-bold">{completedSessions[0].time}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
