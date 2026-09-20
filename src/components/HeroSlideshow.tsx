import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import { MapPin } from 'lucide-react'
import useReducedMotion from '../hooks/useReducedMotion'

export interface HeroSlide {
  src: string
  alt: string
}

interface HeroSlideshowProps {
  slides: HeroSlide[]
  /** Milliseconds between slides. */
  interval?: number
}

/**
 * Full-bleed crossfading background slideshow. Renders absolutely inside a
 * `position: relative` parent; the parent's content should sit at zIndex 1.
 */
export default function HeroSlideshow({ slides, interval = 5000 }: HeroSlideshowProps) {
  const theme = useTheme()
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (slides.length < 2) return
    let timer: number | undefined

    const start = () => {
      stop()
      timer = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), interval)
    }
    const stop = () => {
      if (timer !== undefined) window.clearInterval(timer)
      timer = undefined
    }
    // Pause the cycle while the tab is hidden so slides don't jump on return.
    const onVisibility = () => (document.visibilityState === 'hidden' ? stop() : start())

    start()
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      stop()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [slides.length, interval])

  const current = slides[index]

  return (
    <>
      <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, bgcolor: 'secondary.dark' }}>
        {slides.map((slide, i) => {
          const active = i === index
          return (
            <Box
              key={slide.src}
              component="img"
              src={slide.src}
              alt=""
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
              sx={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: active ? 1 : 0,
                // Slow Ken Burns zoom on the active slide; reset instantly when inactive.
                transform: active && !reduceMotion ? 'scale(1)' : 'scale(1.08)',
                transition: active
                  ? `opacity 1200ms ease, transform ${interval + 1200}ms linear`
                  : 'opacity 1200ms ease',
                willChange: 'opacity, transform',
              }}
            />
          )
        })}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(135deg, ${theme.palette.secondary.dark}e6 0%, ${theme.palette.secondary.dark}b3 55%, ${theme.palette.secondary.main}99 100%)`,
          }}
        />
      </Box>

      {/* Caption + dot navigation, pinned to the bottom of the hero */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1.5}
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 20,
          px: { xs: 2, md: 3 },
          zIndex: 1,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center', minWidth: 0 }} aria-live="polite">
          <MapPin size={16} strokeWidth={1.75} style={{ flexShrink: 0 }} />
          <Typography variant="body2" noWrap sx={{ opacity: 0.9, fontWeight: 500 }}>
            {current?.alt}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={0.75} role="tablist" aria-label="เลือกภาพพื้นหลัง">
          {slides.map((slide, i) => {
            const active = i === index
            return (
              <Box
                key={slide.src}
                component="button"
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={slide.alt}
                onClick={() => setIndex(i)}
                sx={{
                  width: active ? 28 : 8,
                  height: 8,
                  p: 0,
                  border: 0,
                  borderRadius: 4,
                  cursor: 'pointer',
                  bgcolor: active ? 'primary.main' : 'rgba(255,255,255,0.5)',
                  transition: 'width 300ms ease, background-color 300ms ease',
                  '&:hover': { bgcolor: active ? 'primary.main' : 'rgba(255,255,255,0.85)' },
                  '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.light', outlineOffset: 2 },
                }}
              />
            )
          })}
        </Stack>
      </Stack>
    </>
  )
}
