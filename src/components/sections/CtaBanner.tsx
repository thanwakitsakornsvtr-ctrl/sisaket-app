import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import useSectionReveal from '../../hooks/useSectionReveal'

function CtaBanner() {
  const theme = useTheme()
  const scope = useSectionReveal('[data-reveal]')

  return (
    <Container ref={scope} maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
      <Card
        data-reveal
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.main} 100%)`,
          color: 'common.white',
          textAlign: 'center',
          py: { xs: 5, md: 7 },
          px: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          พร้อมออกเดินทางแล้วหรือยัง?
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.9, mb: 3 }}>
          วางแผนทริปศรีสะเกษของคุณวันนี้ พร้อมเส้นทางและพิกัดที่แม่นยำ
        </Typography>
        <Button
          variant="contained"
          size="large"
          href="#map"
          sx={{ bgcolor: 'common.white', color: 'text.primary', '&:hover': { bgcolor: 'grey.100' } }}
        >
          เปิดแผนที่นำทาง
        </Button>
      </Card>
    </Container>
  )
}

export default CtaBanner
