import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap'

// Module-level singleton so any component (header drawer, attraction dialog)
// can stop/start the same instance without prop-drilling or context.
let lenis: Lenis | null = null

export function initLenis(): Lenis {
  if (lenis) return lenis
  lenis = new Lenis({ autoRaf: false })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis?.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
  return lenis
}

export function destroyLenis() {
  lenis?.destroy()
  lenis = null
}

export function getLenis(): Lenis | null {
  return lenis
}
