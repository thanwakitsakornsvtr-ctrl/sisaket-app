import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import Button from '@mui/material/Button'
import { CalendarDays, Navigation } from 'lucide-react'

import { itineraries } from '../../data/itineraries'
import { attractions, getGoogleMapsUrl } from '../../data/attractions'
import useSectionReveal from '../../hooks/useSectionReveal'

function ItinerarySection() {
  const scope = useSectionReveal('[data-reveal]')

  return (
    <Box ref={scope} sx={{ py: { xs: 8, md: 10 } }} id="itinerary">
      <Container maxWidth="lg">
        <Stack spacing={1} sx={{ alignItems: 'center', textAlign: 'center', mb: 6 }}>
          <Typography variant="overline" color="primary">
            แผนเที่ยวแนะนำ
          </Typography>
          <Typography variant="h3">วางทริปศรีสะเกษได้ในไม่กี่คลิก</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 640 }}>
            เส้นทางแนะนำจากสถานที่ท่องเที่ยวในเว็บนี้ จัดกลุ่มตามอำเภอและระยะทางจริง เลือกตามเวลาที่มี
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {itineraries.map((itinerary) => (
            <Grid key={itinerary.id} data-reveal size={{ xs: 12, md: 6 }}>
              <Card variant="outlined" sx={{ height: '100%', p: { xs: 2, md: 3 } }}>
                <CardContent>
                  <Chip
                    icon={<CalendarDays size={16} strokeWidth={1.5} />}
                    label={`${itinerary.days} วัน${itinerary.days > 1 ? `${itinerary.days - 1} คืน` : ''}`}
                    size="small"
                    color="primary"
                    sx={{ mb: 1.5, fontWeight: 700 }}
                  />
                  <Typography variant="h6" gutterBottom>
                    {itinerary.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    {itinerary.summary}
                  </Typography>

                  <Stepper orientation="vertical" nonLinear>
                    {itinerary.stops.map((stop) => {
                      const attraction = attractions.find((a) => a.id === stop.attractionId)
                      if (!attraction) return null
                      return (
                        <Step key={stop.attractionId} active completed={false}>
                          <StepLabel>
                            <Typography sx={{ fontWeight: 700 }}>{attraction.name.split('(')[0].trim()}</Typography>
                          </StepLabel>
                          <StepContent>
                            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 1.5 }}>
                              <Box
                                component="img"
                                src={attraction.image}
                                alt={attraction.name}
                                sx={{ width: 72, height: 72, borderRadius: 2, objectFit: 'cover', flexShrink: 0 }}
                              />
                              <Typography variant="body2" color="text.secondary">
                                {stop.note}
                              </Typography>
                            </Stack>
                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={<Navigation size={16} strokeWidth={1.5} />}
                              component="a"
                              href={getGoogleMapsUrl(attraction.lat, attraction.lng)}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              นำทาง
                            </Button>
                          </StepContent>
                        </Step>
                      )
                    })}
                  </Stepper>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default ItinerarySection
