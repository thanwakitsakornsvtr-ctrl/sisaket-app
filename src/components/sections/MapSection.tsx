import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

import { attractions, type Attraction } from '../../data/attractions'
import AttractionMap from '../AttractionMap'
import useSectionReveal from '../../hooks/useSectionReveal'

interface MapSectionProps {
  onSelect: (attraction: Attraction) => void
}

function MapSection({ onSelect }: MapSectionProps) {
  const scope = useSectionReveal('[data-reveal]')

  return (
    <Box ref={scope} sx={{ py: { xs: 8, md: 10 } }} id="map">
      <Container maxWidth="lg">
        <Stack spacing={1} sx={{ alignItems: 'center', textAlign: 'center', mb: 6 }}>
          <Typography variant="overline" color="primary">
            แผนที่รวม
          </Typography>
          <Typography variant="h3">ตำแหน่งสถานที่ท่องเที่ยวทั้งหมด</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600 }}>
            คลิกที่หมุดบนแผนที่เพื่อดูรายละเอียดของแต่ละสถานที่
          </Typography>
        </Stack>
        {/* Wrapper Box carries the reveal animation — never animate the Leaflet
            container itself, since its transform is layout-sensitive.
            data-lenis-prevent keeps Lenis from intercepting scroll/drag gestures
            meant for the map. */}
        <Box data-reveal data-lenis-prevent>
          <AttractionMap attractions={attractions} onSelect={onSelect} />
        </Box>
      </Container>
    </Box>
  )
}

export default MapSection
