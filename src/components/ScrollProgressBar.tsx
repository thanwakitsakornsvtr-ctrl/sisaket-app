import { useRef } from 'react'
import Box from '@mui/material/Box'
import { useGSAP } from '@gsap/react'
import { gsap } from '../lib/gsap'
import useReducedMotion from '../hooks/useReducedMotion'

/** Thin fixed bar under the header that fills left-to-right with page scroll progress. */
function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  useGSAP(
    () => {
      if (!barRef.current || reduceMotion) return
      gsap.set(barRef.current, { scaleX: 0 })
      gsap.to(barRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
      })
    },
    { dependencies: [reduceMotion] },
  )

  if (reduceMotion) return null

  return (
    <Box
      ref={barRef}
      aria-hidden
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        transformOrigin: '0% 50%',
        bgcolor: 'primary.main',
        zIndex: (theme) => theme.zIndex.appBar + 1,
        pointerEvents: 'none',
      }}
    />
  )
}

export default ScrollProgressBar
