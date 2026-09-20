import { useRef, type RefObject } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger, REVEAL_DURATION, REVEAL_STAGGER, REVEAL_Y, REVEAL_EASE } from '../lib/gsap'
import useReducedMotion from './useReducedMotion'

/**
 * The one entrance animation reused by every section: items fade + rise in as
 * they enter the viewport, batched per-section rather than one ScrollTrigger
 * per item. Reduced-motion users get the final state immediately and no
 * ScrollTrigger is ever created for them.
 */
export default function useSectionReveal<T extends HTMLElement = HTMLDivElement>(
  selector: string,
): RefObject<T | null> {
  const scope = useRef<T>(null)
  const reduceMotion = useReducedMotion()

  useGSAP(
    () => {
      const targets = gsap.utils.toArray<HTMLElement>(selector)
      if (targets.length === 0) return

      if (reduceMotion) {
        gsap.set(targets, { opacity: 1, y: 0 })
        return
      }

      gsap.set(targets, { opacity: 0, y: REVEAL_Y })

      ScrollTrigger.batch(targets, {
        start: 'top 85%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: REVEAL_DURATION,
            ease: REVEAL_EASE,
            stagger: REVEAL_STAGGER,
            overwrite: true,
          }),
      })
    },
    { scope, dependencies: [reduceMotion] },
  )

  return scope
}
