import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import { UtensilsCrossed, PartyPopper, Shirt } from 'lucide-react'

import { localFlavors, type LocalFlavor } from '../../data/localFlavors'
import useSectionReveal from '../../hooks/useSectionReveal'

const categoryIcon: Record<LocalFlavor['category'], typeof UtensilsCrossed> = {
  ของกิน: UtensilsCrossed,
  เทศกาล: PartyPopper,
  งานฝีมือ: Shirt,
}

function LocalFlavorsSection() {
  const scope = useSectionReveal('[data-reveal]')

  return (
    <Box ref={scope} sx={{ py: { xs: 8, md: 10 } }} id="flavors">
      <Container maxWidth="lg">
        <Stack spacing={1} sx={{ alignItems: 'center', textAlign: 'center', mb: 6 }}>
          <Typography variant="overline" color="primary">
            ของดีศรีสะเกษ
          </Typography>
          <Typography variant="h3">อาหาร วัฒนธรรม และงานฝีมือประจำจังหวัด</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 640 }}>
            นอกจากสถานที่ท่องเที่ยว ศรีสะเกษยังมีของดีขึ้นชื่อระดับประเทศ ทั้งพืชเศรษฐกิจที่ได้ขึ้นทะเบียนสิ่งบ่งชี้ทางภูมิศาสตร์ (GI)
            เทศกาลประจำปี และงานหัตถกรรมท้องถิ่น
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {localFlavors.map((flavor) => {
            const Icon = categoryIcon[flavor.category]
            return (
              <Grid key={flavor.id} data-reveal size={{ xs: 12, sm: 6 }}>
                <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    image={flavor.image}
                    alt={flavor.name}
                    sx={{ height: 200, objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Chip
                      icon={<Icon size={16} strokeWidth={1.5} />}
                      label={flavor.category}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ mb: 1.5 }}
                    />
                    <Typography variant="h6" gutterBottom>
                      {flavor.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: flavor.seasonNote ? 1 : 0 }}>
                      {flavor.description}
                    </Typography>
                    {flavor.seasonNote && (
                      <Typography variant="caption" color="primary.dark" sx={{ fontWeight: 600, display: 'block' }}>
                        {flavor.seasonNote}
                      </Typography>
                    )}
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1.5 }}>
                      แหล่งข้อมูล: {flavor.source}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </Box>
  )
}

export default LocalFlavorsSection
