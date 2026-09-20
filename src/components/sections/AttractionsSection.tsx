import { useMemo, useState } from 'react'
import { flushSync } from 'react-dom'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'

import { attractions, attractionCategories, type Attraction, type AttractionCategory } from '../../data/attractions'
import AttractionCard from '../AttractionCard'
import useSectionReveal from '../../hooks/useSectionReveal'
import useReducedMotion from '../../hooks/useReducedMotion'
import { gsap, Flip } from '../../lib/gsap'

const ALL = 'ทั้งหมด' as const

interface AttractionsSectionProps {
  onViewDetails: (attraction: Attraction) => void
}

function AttractionsSection({ onViewDetails }: AttractionsSectionProps) {
  const [filter, setFilter] = useState<AttractionCategory | typeof ALL>(ALL)
  const scope = useSectionReveal('[data-reveal]')
  const reduceMotion = useReducedMotion()

  const visible = useMemo(
    () => (filter === ALL ? attractions : attractions.filter((a) => a.category === filter)),
    [filter],
  )

  const handleFilterChange = (category: AttractionCategory | typeof ALL) => {
    if (category === filter) return
    if (reduceMotion || !scope.current) {
      setFilter(category)
      return
    }

    const cards = scope.current.querySelectorAll<HTMLElement>('[data-reveal]')
    const state = Flip.getState(cards)
    flushSync(() => setFilter(category))
    if (!scope.current) return

    Flip.from(state, {
      duration: 0.5,
      ease: 'power2.inOut',
      stagger: 0.03,
      absolute: true,
      onEnter: (elements) => gsap.fromTo(elements, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.05 }),
      onLeave: (elements) => gsap.to(elements, { opacity: 0, scale: 0.9, duration: 0.25 }),
    })
  }

  return (
    <Box ref={scope} sx={{ bgcolor: 'background.paper', py: { xs: 8, md: 10 } }} id="attractions">
      <Container maxWidth="lg">
        <Stack spacing={1} sx={{ alignItems: 'center', textAlign: 'center', mb: 4 }}>
          <Typography variant="overline" color="primary">
            สถานที่แนะนำ
          </Typography>
          <Typography variant="h3">6 สถานที่ท่องเที่ยวห้ามพลาดในศรีสะเกษ</Typography>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', justifyContent: 'center', mb: 5, gap: 1 }}>
          {[ALL, ...attractionCategories].map((category) => (
            <Chip
              key={category}
              label={category}
              clickable
              onClick={() => handleFilterChange(category)}
              color={filter === category ? 'primary' : 'default'}
              variant={filter === category ? 'filled' : 'outlined'}
              sx={{ fontWeight: 600 }}
            />
          ))}
        </Stack>

        <Grid container spacing={3}>
          {visible.map((attraction) => (
            <Grid key={attraction.id} data-reveal size={{ xs: 12, sm: 6, md: 4 }}>
              <AttractionCard attraction={attraction} onViewDetails={onViewDetails} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default AttractionsSection
