import { lazy, Suspense, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'

import { type Attraction } from './data/attractions'
import { faqEntries } from './data/faq'
import { buildAttractionsJsonLd, buildFaqJsonLd } from './seo/structuredData'
import SeoJsonLd from './seo/SeoJsonLd'
import { ScrollTrigger } from './lib/gsap'
import { getLenis } from './lib/lenis'
import AttractionDialog from './components/AttractionDialog'
import LenisProvider from './components/LenisProvider'
import ScrollProgressBar from './components/ScrollProgressBar'
import BackToTop from './components/BackToTop'
import SiteHeader from './components/sections/SiteHeader'
import HeroSection from './components/sections/HeroSection'
import StatsStrip from './components/sections/StatsStrip'
import AttractionsSection from './components/sections/AttractionsSection'
import LocalFlavorsSection from './components/sections/LocalFlavorsSection'
import TrustSection from './components/sections/TrustSection'
import ItinerarySection from './components/sections/ItinerarySection'
import AboutSection from './components/sections/AboutSection'
import FaqSection from './components/sections/FaqSection'
import CtaBanner from './components/sections/CtaBanner'
import SiteFooter from './components/sections/SiteFooter'

// Leaflet + react-leaflet are the single heaviest dependency and only needed
// below the fold — split it out of the main bundle instead of paying for it
// on every page load.
const MapSection = lazy(() => import('./components/sections/MapSection'))

function App() {
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null)

  // Async webfonts (Inter / IBM Plex Sans Thai) and MUI's dialog scroll-lock
  // can both shift layout after ScrollTrigger has already computed section
  // start/end positions — refresh once fonts settle and whenever the dialog closes.
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  }, [])

  useEffect(() => {
    if (selectedAttraction === null) {
      ScrollTrigger.refresh()
      getLenis()?.start()
    } else {
      getLenis()?.stop()
    }
  }, [selectedAttraction])

  return (
    <Box>
      <SeoJsonLd data={buildAttractionsJsonLd()} />
      <SeoJsonLd data={buildFaqJsonLd(faqEntries)} />
      <LenisProvider />
      <ScrollProgressBar />
      <SiteHeader />
      <HeroSection />
      <StatsStrip />
      <AttractionsSection onViewDetails={setSelectedAttraction} />
      <LocalFlavorsSection />
      <Suspense fallback={<Skeleton variant="rectangular" height={480} sx={{ mx: 'auto', maxWidth: 'lg' }} />}>
        <MapSection onSelect={setSelectedAttraction} />
      </Suspense>
      <TrustSection />
      <ItinerarySection />
      <AboutSection />
      <FaqSection />
      <CtaBanner />
      <SiteFooter />
      <BackToTop />

      <AttractionDialog attraction={selectedAttraction} onClose={() => setSelectedAttraction(null)} />
    </Box>
  )
}

export default App
