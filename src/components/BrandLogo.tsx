import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

interface BrandLogoProps {
  /** White-on-dark variant for the footer. */
  inverted?: boolean
  /** Show the small English tagline under the name (hidden on xs). */
  tagline?: boolean
  size?: 'small' | 'medium'
}

/** The province's Khmer-prasat silhouette — same mark as public/favicon.svg,
 * so the on-page logo and browser-tab icon read as the same brand. */
function PrasatMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden focusable="false">
      <g fill="currentColor">
        <rect x="10" y="48" width="44" height="5" rx="1.5" />
        <rect x="14" y="43" width="36" height="5" rx="1.5" />
        <path d="M17 43V32l2-3 1.5-4 1.5 4 2 3v11z" />
        <path d="M40 43V32l2-3 1.5-4 1.5 4 2 3v11z" />
        <path d="M26 43V27l2.5-3.5L30 17l2-6 2 6 1.5 6.5L38 27v16z" />
      </g>
      <path d="M29.5 43v-8a2.5 2.5 0 0 1 5 0v8z" fill="#D84315" />
    </svg>
  )
}

export default function BrandLogo({ inverted = false, tagline = true, size = 'medium' }: BrandLogoProps) {
  const box = size === 'medium' ? 40 : 34
  const icon = size === 'medium' ? 25 : 21

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
        <PrasatMark size={icon} />
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
