import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'

import { X, MapPin, Navigation, Crosshair, Route } from 'lucide-react'

import { type Attraction, getGoogleMapsUrl } from '../data/attractions'

interface AttractionDialogProps {
  attraction: Attraction | null
  onClose: () => void
}

function AttractionDialog({ attraction, onClose }: AttractionDialogProps) {
  const theme = useTheme()
  const scrim = theme.palette.secondary.dark

  return (
    <Dialog
      open={attraction !== null}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{ paper: { sx: { borderRadius: 4, overflow: 'hidden' } } }}
    >
      {attraction && (
        <>
          <Box sx={{ position: 'relative' }}>
            <Box
              component="img"
              src={attraction.image}
              alt={attraction.name}
              sx={{ width: '100%', height: 280, objectFit: 'cover', display: 'block' }}
            />
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(to top, ${scrim}f2 0%, ${scrim}99 40%, transparent 75%)`,
              }}
            />
            <IconButton
              onClick={onClose}
              aria-label="ปิด"
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: 'common.white',
                bgcolor: 'rgba(36,28,21,0.45)',
                backdropFilter: 'blur(4px)',
                '&:hover': { bgcolor: 'rgba(36,28,21,0.7)' },
              }}
            >
              <X strokeWidth={1.5} />
            </IconButton>
            <Box sx={{ position: 'absolute', left: 0, right: 0, bottom: 0, p: 3 }}>
              <Chip
                icon={<MapPin size={16} strokeWidth={1.5} />}
                label={attraction.district}
                size="small"
                sx={{
                  mb: 1,
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  '& .MuiChip-icon': { color: 'inherit' },
                }}
              />
              <Typography
                variant="h5"
                sx={{ color: 'common.white', fontWeight: 700, textShadow: '0 2px 12px rgba(0,0,0,0.55)' }}
              >
                {attraction.name}
              </Typography>
            </Box>
          </Box>

          <DialogContent sx={{ p: 3 }}>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {attraction.description}
            </Typography>

            <Stack
              spacing={2}
              sx={{
                p: 2,
                borderRadius: 3,
                bgcolor: 'background.default',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
                <Route color={theme.palette.primary.main} size={20} strokeWidth={1.5} style={{ flexShrink: 0, marginTop: 2 }} />
                <Box>
                  <Typography variant="subtitle2">เส้นทางการเดินทาง</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {attraction.howToGetThere}
                  </Typography>
                </Box>
              </Stack>
              <Divider />
              <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
                <Crosshair color={theme.palette.primary.main} size={20} strokeWidth={1.5} style={{ flexShrink: 0, marginTop: 2 }} />
                <Box>
                  <Typography variant="subtitle2">พิกัด GPS</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {attraction.lat.toFixed(6)}, {attraction.lng.toFixed(6)}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </DialogContent>

          <DialogActions sx={{ display: 'block', px: 3, pb: 3, pt: 0 }}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<Navigation size={18} strokeWidth={1.5} />}
              component="a"
              href={getGoogleMapsUrl(attraction.lat, attraction.lng)}
              target="_blank"
              rel="noopener noreferrer"
            >
              นำทางด้วย Google Maps
            </Button>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2, textAlign: 'center' }}>
              ภาพ: {attraction.imageCredit}
            </Typography>
          </DialogActions>
        </>
      )}
    </Dialog>
  )
}

export default AttractionDialog
