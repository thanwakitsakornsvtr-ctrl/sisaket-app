import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useCountUp from '../../hooks/useCountUp'

const provinceStats = [
  { to: 6, decimals: 0, suffix: '', label: 'สถานที่แนะนำ' },
  { to: 22, decimals: 0, suffix: '', label: 'อำเภอ' },
  { to: 1.45, decimals: 2, suffix: ' ล้าน', label: 'ประชากร (คน)' },
  { to: 8840, decimals: 0, suffix: '', label: 'ตร.กม.' },
]

function StatsStrip() {
  const scope = useCountUp()

  return (
    <Container ref={scope} maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
      <Grid container spacing={4}>
        {provinceStats.map((stat) => (
          <Grid key={stat.label} size={{ xs: 6, md: 3 }}>
            <Stack spacing={0.5} sx={{ alignItems: 'center' }}>
              <Typography
                variant="h3"
                color="primary"
                sx={{ fontWeight: 700 }}
                data-count-to={stat.to}
                data-count-decimals={stat.decimals}
                data-count-suffix={stat.suffix}
              >
                {stat.to.toLocaleString('th-TH', { minimumFractionDigits: stat.decimals, maximumFractionDigits: stat.decimals })}
                {stat.suffix}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                {stat.label}
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default StatsStrip
