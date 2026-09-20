import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import { Crosshair, BookCheck, Camera, Map as MapIcon } from 'lucide-react'

import { trustHighlights, type TrustHighlight } from '../../data/trustHighlights'
import useSectionReveal from '../../hooks/useSectionReveal'

const highlightIcon: Record<TrustHighlight['icon'], typeof Crosshair> = {
  gps: Crosshair,
  source: BookCheck,
  photo: Camera,
  map: MapIcon,
}

function TrustSection() {
  const scope = useSectionReveal('[data-reveal]')

  return (
    <Box ref={scope} sx={{ bgcolor: 'background.paper', py: { xs: 8, md: 10 } }} id="trust">
      <Container maxWidth="lg">
        <Stack spacing={1} sx={{ alignItems: 'center', textAlign: 'center', mb: 6 }}>
          <Typography variant="overline" color="primary">
            ความน่าเชื่อถือของข้อมูล
          </Typography>
          <Typography variant="h3">ข้อมูลทุกจุดตรวจสอบย้อนกลับได้</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 640 }}>
            เว็บไซต์นี้ไม่มีรีวิวหรือคำบอกเล่าที่แต่งขึ้น ทุกข้อมูลอ้างอิงจากแหล่งเปิดเผยสาธารณะที่ตรวจสอบได้จริง
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {trustHighlights.map((item) => {
            const Icon = highlightIcon[item.icon]
            return (
              <Grid key={item.id} data-reveal size={{ xs: 12, sm: 6, md: 3 }}>
                <Stack spacing={1.5} sx={{ alignItems: 'center', textAlign: 'center', height: '100%' }}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      display: 'grid',
                      placeItems: 'center',
                      bgcolor: 'primary.light',
                      color: 'primary.dark',
                    }}
                  >
                    <Icon size={26} strokeWidth={1.5} />
                  </Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </Stack>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </Box>
  )
}

export default TrustSection
