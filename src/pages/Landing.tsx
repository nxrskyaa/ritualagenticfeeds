import { useState } from 'react'
import AmbientBackground from '@/components/AmbientBackground'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import FloatingButton from '@/components/FloatingButton'
import AboutModal from '@/components/AboutModal'
import HeroSection from '../sections/HeroSection'
import LiveFeedPreviewSection from '../sections/LiveFeedPreviewSection'
import FeaturesSection from '../sections/FeaturesSection'
import RitualInfrastructureSection from '../sections/RitualInfrastructureSection'

export default function Landing() {
  const [aboutOpen, setAboutOpen] = useState(false)

  return (
    <div className="relative min-h-screen">
      <AmbientBackground />
      <Navigation />
      <div className="relative z-10">
        <HeroSection />
        <LiveFeedPreviewSection />
        <FeaturesSection />
        <RitualInfrastructureSection />
        <Footer />
      </div>
      <FloatingButton onClick={() => setAboutOpen(true)} />
      <AboutModal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  )
}
