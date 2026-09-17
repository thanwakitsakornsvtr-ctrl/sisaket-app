import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

import { MapPin, Navigation } from 'lucide-react'

import { type Attraction, getGoogleMapsUrl } from '../data/attractions'

interface AttractionCardProps {
  attraction: Attraction
  onViewDetails: (attraction: Attraction) => void
}

function AttractionCard({ attraction, onViewDetails }: AttractionCardProps) {
  return (
    <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        image={attraction.image}
        alt={attraction.name}
        sx={{ height: 200, objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Chip
          icon={<MapPin size={16} strokeWidth={1.5} />}
          label={attraction.district}
          size="small"
          color="primary"
          variant="outlined"
          sx={{ mb: 1.5 }}
        />
        <Typography variant="h6" gutterBottom>
          {attraction.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {attraction.shortDescription}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
          <Button fullWidth variant="contained" onClick={() => onViewDetails(attraction)}>
            ดูรายละเอียด
          </Button>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Navigation size={18} strokeWidth={1.5} />}
            component="a"
            href={getGoogleMapsUrl(attraction.lat, attraction.lng)}
            target="_blank"
            rel="noopener noreferrer"
          >
            นำทาง
          </Button>
        </Stack>
      </CardActions>
    </Card>
  )
}

export default AttractionCard
