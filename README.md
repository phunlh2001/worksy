# Worksy

> **Minimalist, automatic desktop work-time tracking for Windows.**  
> Built with Electron, React, TypeScript, and TailwindCSS. Designed with a dual-window docked HUD, 3-minute native Windows inactivity detection, user-controllable widget opacity, and 100% ephemeral in-memory privacy.

---

## ⚡ Overview

**Worksy** is an ambient, zero-friction time tracker built for creators, engineers, and knowledge workers who want accurate active-time measurement without the overhead of manual start/stop micromanagement or intrusive surveillance.

- **Dual-Window System**: A spacious dashboard for setting tasks and reviewing daily stamps, paired with a compact, always-on-top docked floating widget.
- **3-Minute Native Inactivity Engine**: Leverages Windows OS-level `powerMonitor` to automatically halt active tracking after 3 minutes of system-wide inactivity and seamlessly resumes when you return.
- **User-Controllable Background Opacity Line**: Smoothly adjust widget background opacity from crisp **Solid White** (`100%`) to a faint **Faded Transparent Glass** (`10%`) so it never obscures background windows while keeping the timer and Stop button clearly visible.
- **100% Ephemeral In-Memory Privacy**: Zero cloud accounts, zero telemetry, zero SQLite databases. Everything lives in RAM and resets cleanly on computer shutdown.
- **Windows Startup Integration**: Seamlessly launch with Windows and stay tucked in the system tray until you need it.

---

## 🎯 How to Use Worksy (The Right Way)

Follow this recommended workflow to get the most out of Worksy with zero friction:

### 1. Set Your Focus Task & Desktop Startup
- Open Worksy and type your active focus objective into the input field (e.g. `Refactoring Auth API` or `Client Design Review`).
- *(Optional)* In **Settings**, toggle **"Launch on Windows Startup"** on. This ensures Worksy is ready and waiting in your Windows system tray every time you power on your desktop.

### 2. One-Click Start & Automatic Docking
- Click **"Start Tracking"** or press `Enter`.
- The main application window automatically minimizes and docks into a compact floating pill at the **top-right of your screen** (`380 x 72 px`).
- The widget stays always-on-top so you always have peripheral awareness of your active focus duration.
- Need to move it? Grab the **tactile grip handle** on the left to drag the widget anywhere across multiple monitors.

### 3. Tune the Background Opacity (White to Transparent)
- Customize how prominent the docked widget appears against your desktop wallpaper and active windows:
  - **Faded Transparent HUD (10% - 30%)**: Perfect for coding or reading documents behind the widget. The background dissolves into a faint translucent outline, while the time digits (`00d:00h:00m:00s`) and the red **Stop** button remain high-contrast and razor-sharp.
  - **Solid White Card (70% - 100%)**: Ideal if you have busy desktop wallpapers or prefer high card contrast.
- You can adjust the opacity slider in either the **Dashboard** or directly on the **Floating Widget**—both windows stay synchronized instantly.

### 4. Hands-Off 3-Minute Idle Tracking
- **Do not manually pause the timer** when you step away for coffee, take a call, or stretch.
- Worksy checks Windows OS-level input idle time every second without keystroke logging.
- When you are inactive for **3 minutes**, tracking pauses automatically, displaying an amber `IDLE 3m` status badge.
- As soon as you touch your mouse or press any keyboard key, Worksy **instantly resumes tracking**.

### 5. Stop & Daily Ephemeral Stamping
- When your focus block ends or you transition to a new project:
  - Click the prominent red **Stop** button on the widget (or in the dashboard).
  - Choose to **Save** the session to today's completed list or **Discard** it.
  - The main dashboard reopens, showing your accumulated focus time for the day.

### 6. Clean Ephemeral Reset
- At the end of the day, shut down or restart your computer.
- Worksy leaves **zero disk footprint**. There are no lingering databases, no background sync demons, and no telemetry logs left behind.

---

## 🛠️ Feature Highlights

| Feature | Description |
| :--- | :--- |
| **3-Min Inactivity Engine** | Queries Windows OS `powerMonitor` idle state. Automatically pauses at 3 minutes; auto-resumes on touch. |
| **Top-Right Floating HUD** | 380×72px floating pill that docks at top-right when tracking starts, leaving your screen clean. |
| **Background Opacity Slider** | User control line to fade the widget from solid white to transparent glass HUD. |
| **High-Contrast Ambient Controls** | Time digits and Stop button remain vividly legible even at 10% opacity. |
| **Segmented Precision Format** | Clean `00d:00h:00m:00s` labeled time breakdown for unambiguous duration clarity. |
| **100% In-Memory Privacy** | Zero disk writes, zero cloud sync, zero telemetry. History resets upon desktop reboot. |
| **Windows Startup & Tray** | Launch automatically on Windows boot, minimize to system tray with quick-toggle menu. |

---

## 💻 Tech Stack & Architecture

- **Runtime & Desktop Shell**: [Electron](https://www.electronjs.org/) (Dual `BrowserWindow` architecture with IPC synchronization)
- **Frontend Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/) via [electron-vite](https://electron-vite.org/)
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/) with custom neon color system
- **Icons**: [Lucide React](https://lucide.dev/)
- **Sound Effects**: HTML5 Web Audio synthesized clicks for start, stop, and idle triggers

### Directory Layout

```
worksy/
├── src/
│   ├── main/                 # Electron main process
│   │   ├── index.ts          # Window managers, powerMonitor idle engine, IPC handlers
│   ├── preload/              # Secure contextBridge bindings
│   │   ├── index.ts          # Exposes window.api and window.electron
│   ├── renderer/             # React Application
│   │   └── src/
│   │       ├── App.tsx       # Dual-view coordinator (Dashboard vs Widget)
│   │       ├── components/   # UI components (DashboardView, WidgetView, TimeDisplay, etc.)
│   │       └── types/        # TypeScript models
│   └── shared/               # Shared IPC schemas and types
├── landing/                  # Standalone neon product landing page
│   ├── src/
│   │   ├── components/       # HeroSection, FeatureSection, HowItWorks, FaqSection, etc.
│   │   └── App.tsx           # Landing page layout with animated neon canvas
└── package.json
```

---

## 🚀 Quick Start & Development

### Prerequisites
- Windows 10 or 11
- Node.js (v18+)
- Yarn package manager

### Installation

```bash
# Clone the repository
$ git clone https://github.com/phunlh2001/worksy.git
$ cd worksy

# Install dependencies
$ cmd /c "yarn"
```

### Running the Desktop App

```bash
# Start Electron dev server with hot module replacement
$ cmd /c "yarn dev"
```

### Running the Landing Page

```bash
# Start the landing page Vite dev server
$ cmd /c "yarn dev:landing"
```

### Building for Production

```bash
# Build Windows desktop installer / portable executable
$ cmd /c "yarn build:win"

# Build static bundle for the product landing page
$ cmd /c "yarn build:landing"
```

---

## ❓ Frequently Asked Questions

#### Q: How does Worksy know I am idle without keylogging?
Worksy queries Electron's built-in `powerMonitor.getSystemIdleTime()`, an OS-level API that returns the number of seconds elapsed since the last global mouse movement or keyboard action. Worksy never reads, intercepts, or logs your keystrokes or screen.

#### Q: Why can't I see old tasks from last week?
By design, Worksy is an ephemeral in-memory tracker. It does not write your task names or work durations to disk or cloud databases. When your computer shuts down, your slate resets cleanly.

#### Q: Can I run Worksy on dual or triple monitors?
Yes. When tracking begins, Worksy docks to the top-right corner of your primary display. You can grab the tactile grip handle on the left side of the floating widget to drag it to any position or monitor.

---

## 📄 License

MIT © [Worksy](https://github.com/phunlh2001/worksy)
