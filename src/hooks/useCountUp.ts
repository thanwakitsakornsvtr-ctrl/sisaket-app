import { useRef, type RefObject } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import useReducedMotion from './useReducedMotion'

/**
 * Animates every `[data-count-to]` element inside the returned scope from 0 to
 * its target once, when the scope enters the viewport. The target and the
 * optional thousands separator / decimal formatting come from data attributes
 * so the JSX can keep rendering the real final number for no-JS/SEO purposes.
 */
export default function useCountUp<T extends HTMLElement = HTMLDivElement>(): RefObject<T | null> {
  const scope = useRef<T>(null)
  const reduceMotion = useReducedMotion()

  useGSAP(
    () => {
      const targets = gsap.utils.toArray<HTMLElement>('[data-count-to]')
      if (targets.length === 0) return

      targets.forEach((el) => {
        const to = Number(el.dataset.countTo)
        const decimals = Number(el.dataset.countDecimals ?? 0)
        const suffix = el.dataset.countSuffix ?? ''
        if (Number.isNaN(to)) return

        if (reduceMotion) {
          el.textContent = `${to.toLocaleString('th-TH', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`
          return
        }

        const counter = { value: 0 }
        ScrollTrigger.create({
          trigger: el,
          start: 'top 90%',
          once: true,
          onEnter: () =>
            gsap.to(counter, {
              value: to,
              duration: 1.4,
              ease: 'power2.out',
              onUpdate: () => {
                el.textContent = `${counter.value.toLocaleString('th-TH', {
                  minimumFractionDigits: decimals,
                  maximumFractionDigits: decimals,
                })}${suffix}`
              },
            }),
        })
      })
    },
    { scope, dependencies: [reduceMotion] },
  )

  return scope
}
