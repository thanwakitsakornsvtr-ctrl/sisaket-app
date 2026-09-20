import { useRef } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { Map as MapIconLucide } from 'lucide-react'
import { useGSAP } from '@gsap/react'

import { attractions } from '../../data/attractions'
import HeroSlideshow from '../HeroSlideshow'
import useReducedMotion from '../../hooks/useReducedMotion'
import { gsap } from '../../lib/gsap'

const heroSlides = attractions.map((a) => ({ src: a.image, alt: a.name }))

function HeroSection() {
  const ctaScope = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  // Subtle magnetic pull on the hero CTAs, desktop pointer devices only.
  useGSAP(
    () => {
      if (reduceMotion || !window.matchMedia('(hover: hover)').matches) return
      const buttons = gsap.utils.toArray<HTMLElement>('[data-magnetic]')

      const cleanups = buttons.map((btn) => {
        const moveX = gsap.quickTo(btn, 'x', { duration: 0.3, ease: 'power3.out' })
        const moveY = gsap.quickTo(btn, 'y', { duration: 0.3, ease: 'power3.out' })

        const onMove = (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect()
          moveX((e.clientX - rect.left - rect.width / 2) * 0.3)
          moveY((e.clientY - rect.top - rect.height / 2) * 0.3)
        }
        const onLeave = () => {
          moveX(0)
          moveY(0)
        }

        btn.addEventListener('mousemove', onMove)
        btn.addEventListener('mouseleave', onLeave)
        return () => {
          btn.removeEventListener('mousemove', onMove)
          btn.removeEventListener('mouseleave', onLeave)
        }
      })

      return () => cleanups.forEach((cleanup) => cleanup())
    },
    { scope: ctaScope, dependencies: [reduceMotion] },
  )

  return (
    <Box
      id="home"
      sx={{
        position: 'relative',
        color: 'common.white',
        pt: { xs: 10, md: 14 },
        pb: { xs: 14, md: 18 },
        overflow: 'hidden',
      }}
    >
      <HeroSlideshow slides={heroSlides} interval={5000} />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Stack spacing={3} sx={{ alignItems: 'center', textAlign: 'center' }}>
          <Chip
            label="คู่มือท่องเที่ยวจังหวัดศรีสะเกษ"
            sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', fontWeight: 700 }}
          />
          <Typography variant="h2" sx={{ maxWidth: 800 }}>
            สัมผัสมนตร์เสน่ห์ศรีสะเกษ
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 400, opacity: 0.9, maxWidth: 640 }}>
            "หลวงพ่อโตคู่บ้าน ถิ่นฐานปราสาทขอม ข้าวหอมกระเทียมดี มีสวนสมเด็จ เขตดงลำดวน หลากล้วนวัฒนธรรม เลิศล้ำสามัคคี"
            รวมสถานที่ท่องเที่ยวห้ามพลาด พร้อมเส้นทางและพิกัดจริง
          </Typography>
          <Stack ref={ctaScope} direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 2 }}>
            <Button
              data-magnetic
              variant="contained"
              size="large"
              href="#attractions"
              sx={{ bgcolor: 'common.white', color: 'text.primary', '&:hover': { bgcolor: 'grey.100' } }}
            >
              ดูสถานที่ท่องเที่ยว
            </Button>
            <Button
              data-magnetic
              variant="outlined"
              size="large"
              href="#map"
              startIcon={<MapIconLucide strokeWidth={1.5} size={20} />}
              sx={{ borderColor: 'common.white', color: 'common.white' }}
            >
              เปิดแผนที่
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

export default HeroSection
