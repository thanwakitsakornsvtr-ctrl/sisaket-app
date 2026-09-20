import { useRef } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { ArrowUp } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { getLenis } from '../lib/lenis'
import useReducedMotion from '../hooks/useReducedMotion'

/** Fixed bottom-right button that fades in after scrolling past the hero and
 * smooth-scrolls back to the top. */
function BackToTop() {
  const scope = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  useGSAP(
    () => {
      const el = scope.current
      if (!el) return

      if (reduceMotion) {
        gsap.set(el, { opacity: 1, scale: 1, visibility: 'visible' })
        return
      }

      gsap.set(el, { opacity: 0, scale: 0.8 })
      ScrollTrigger.create({
        start: 'top top-=600',
        onEnter: () => gsap.to(el, { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }),
        onLeaveBack: () => gsap.to(el, { opacity: 0, scale: 0.8, duration: 0.3, ease: 'power2.in' }),
      })
    },
    { scope, dependencies: [reduceMotion] },
  )

  const scrollToTop = () => {
    if (reduceMotion) {
      window.scrollTo({ top: 0 })
      return
    }
    // Route through Lenis when it's driving the page so GSAP's tween and
    // Lenis's own RAF loop don't fight over window.scrollTo on the same frame.
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(0, { duration: 0.8 })
      return
    }
    gsap.to(window, { duration: 0.8, ease: 'power2.inOut', scrollTo: { y: 0 } })
  }

  return (
    <Box
      ref={scope}
      sx={{
        position: 'fixed',
        right: { xs: 16, md: 24 },
        bottom: { xs: 16, md: 24 },
        zIndex: (theme) => theme.zIndex.speedDial,
        opacity: reduceMotion ? undefined : 0,
      }}
    >
      <IconButton
        onClick={scrollToTop}
        aria-label="เลื่อนขึ้นด้านบน"
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          boxShadow: 4,
          '&:hover': { bgcolor: 'primary.dark' },
        }}
      >
        <ArrowUp strokeWidth={2} size={20} />
      </IconButton>
    </Box>
  )
}

export default BackToTop
