import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'

import { navLinks } from '../../data/navigation'
import BrandLogo from '../BrandLogo'

const dataSources = [
  { label: 'Wikipedia', href: 'https://th.wikipedia.org/wiki/จังหวัดศรีสะเกษ' },
  { label: 'Wikimedia Commons', href: 'https://commons.wikimedia.org/' },
  { label: 'OpenStreetMap', href: 'https://www.openstreetmap.org/' },
]

function SiteFooter() {
  return (
    <Box sx={{ bgcolor: 'secondary.dark', color: 'rgba(255,255,255,0.75)', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ mb: 2 }}>
              <BrandLogo inverted />
            </Box>
            <Typography variant="body2" sx={{ color: 'inherit' }}>
              คู่มือรวมสถานที่ท่องเที่ยว เส้นทาง และพิกัดจริงในจังหวัดศรีสะเกษ ไม่ใช่เว็บไซต์ทางการของหน่วยงานราชการ
            </Typography>
          </Grid>
          <Grid size={{ xs: 6, md: 4 }}>
            <Typography variant="subtitle2" sx={{ color: 'common.white', mb: 2 }}>
              เมนู
            </Typography>
            <Stack spacing={1}>
              {navLinks.map((link) => (
                <Typography
                  key={link.label}
                  component="a"
                  href={link.href}
                  variant="body2"
                  sx={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}
                >
                  {link.label}
                </Typography>
              ))}
            </Stack>
          </Grid>
          <Grid size={{ xs: 6, md: 4 }}>
            <Typography variant="subtitle2" sx={{ color: 'common.white', mb: 2 }}>
              แหล่งข้อมูล
            </Typography>
            <Stack spacing={1}>
              {dataSources.map((source) => (
                <Typography
                  key={source.label}
                  component="a"
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="body2"
                  sx={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}
                >
                  {source.label}
                </Typography>
              ))}
            </Stack>
          </Grid>
        </Grid>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.15)', my: 4 }} />
        <Typography variant="body2" sx={{ textAlign: 'center', color: 'inherit' }}>
          © {new Date().getFullYear()} เที่ยวศรีสะเกษ · ข้อมูลอ้างอิงจาก Wikipedia · ภาพถ่ายจาก Wikimedia Commons
        </Typography>
      </Container>
    </Box>
  )
}

export default SiteFooter
