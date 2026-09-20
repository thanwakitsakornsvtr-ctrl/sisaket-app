import { useEffect } from 'react'
import useReducedMotion from '../hooks/useReducedMotion'
import { initLenis, destroyLenis } from '../lib/lenis'

/**
 * Boots Lenis smooth-scroll (skipped entirely under reduced-motion) and
 * intercepts in-page anchor clicks (`href="#..."`) so they scroll through
 * Lenis, offset by the sticky header's height, instead of jumping natively.
 */
function LenisProvider() {
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return

    const instance = initLenis()

    const handleClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement)?.closest<HTMLAnchorElement>('a[href^="#"]')
      if (!anchor) return
      const id = anchor.getAttribute('href')?.slice(1)
      if (!id) return
      const target = document.getElementById(id)
      if (!target) return

      event.preventDefault()
      const header = document.querySelector('header')
      const offset = header ? -(header.getBoundingClientRect().height + 8) : -16
      instance.scrollTo(target, { offset, duration: 1.2 })
    }

    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
      destroyLenis()
    }
  }, [reduceMotion])

  return null
}

export default LenisProvider
