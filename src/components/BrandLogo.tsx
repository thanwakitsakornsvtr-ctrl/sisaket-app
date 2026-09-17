import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Landmark } from 'lucide-react'

interface BrandLogoProps {
  /** White-on-dark variant for the footer. */
  inverted?: boolean
  /** Show the small English tagline under the name (hidden on xs). */
  tagline?: boolean
  size?: 'small' | 'medium'
}

export default function BrandLogo({ inverted = false, tagline = true, size = 'medium' }: BrandLogoProps) {
  const box = size === 'medium' ? 40 : 34
  const icon = size === 'medium' ? 22 : 19

  return (
    <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
      <Box
        aria-hidden
        sx={{
          width: box,
          height: box,
          borderRadius: 2.5,
          display: 'grid',
          placeItems: 'center',
          color: 'common.white',
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 55%, ${theme.palette.primary.dark} 100%)`,
          boxShadow: (theme) => `0 4px 12px ${theme.palette.primary.main}55`,
          flexShrink: 0,
        }}
      >
        <Landmark size={icon} strokeWidth={1.75} />
      </Box>
      <Box sx={{ lineHeight: 1.1 }}>
        <Typography
          variant={size === 'medium' ? 'h6' : 'subtitle1'}
          component="div"
          sx={{ fontWeight: 700, lineHeight: 1.15, color: inverted ? 'common.white' : 'text.primary' }}
        >
          เที่ยวศรีสะเกษ
        </Typography>
        {tagline && (
          <Typography
            variant="caption"
            component="div"
            sx={{
              display: { xs: 'none', sm: 'block' },
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: 500,
              color: inverted ? 'rgba(255,255,255,0.6)' : 'text.secondary',
            }}
          >
            Sisaket Travel Guide
          </Typography>
        )}
      </Box>
    </Stack>
  )
}
