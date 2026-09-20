import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { Observer } from 'gsap/Observer'
import { Flip } from 'gsap/Flip'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Observer, Flip)

// Single entrance recipe reused by every section via useSectionReveal —
// keep tuning here so the whole site stays visually consistent.
export const REVEAL_DURATION = 0.6
export const REVEAL_STAGGER = 0.08
export const REVEAL_Y = 24
export const REVEAL_EASE = 'power2.out'

export { gsap, ScrollTrigger, ScrollToPlugin, Observer, Flip }
