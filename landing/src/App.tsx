import { NeonCanvasBackground } from './components/NeonCanvasBackground'
import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { FeatureSection } from './components/FeatureSection'
import { HowItWorks } from './components/HowItWorks'
import { DownloadSection } from './components/DownloadSection'
import { FaqSection } from './components/FaqSection'
import { Footer } from './components/Footer'

export function App(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-[#06131c] text-slate-100 flex flex-col relative selection:bg-cyan-500/30 selection:text-cyan-300">
      <NeonCanvasBackground />
      <Navbar />
      <main className="flex-1 relative z-10">
        <HeroSection />
        <FeatureSection />
        <HowItWorks />
        <DownloadSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
