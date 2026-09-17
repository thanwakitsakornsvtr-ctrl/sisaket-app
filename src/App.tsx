import { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Drawer from '@mui/material/Drawer'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import { Menu, Map as MapIconLucide, CheckCircle2, House, MapPinned, Info, X } from 'lucide-react'
// Lucide has no brand/logo icons by design — keep MUI icons for these 3 only.
import GitHubIcon from '@mui/icons-material/GitHub'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'

import { attractions, type Attraction } from './data/attractions'
import AttractionCard from './components/AttractionCard'
import AttractionMap from './components/AttractionMap'
import AttractionDialog from './components/AttractionDialog'
import BrandLogo from './components/BrandLogo'
import HeroSlideshow from './components/HeroSlideshow'

const navLinks = [
  { label: 'หน้าแรก', href: '#home', icon: House },
  { label: 'สถานที่ท่องเที่ยว', href: '#attractions', icon: MapPinned },
  { label: 'แผนที่', href: '#map', icon: MapIconLucide },
  { label: 'เกี่ยวกับ', href: '#about', icon: Info },
]

const provinceStats = [
  { value: '6', label: 'สถานที่แนะนำ' },
  { value: '22', label: 'อำเภอ' },
  { value: '1.45 ล้าน', label: 'ประชากร (คน)' },
  { value: '8,840', label: 'ตร.กม.' },
]

const travelTips = [
  'แต่งกายสุภาพเมื่อเข้าชมปราสาทหินและวัด ควรสวมเสื้อผ้าปกปิดไหล่และเข่า',
  'ผามออีแดงมีแดดจัดช่วงกลางวัน แนะนำไปช่วงเช้าหรือเย็นเพื่อชมทัศนียภาพและอากาศที่สบายกว่า',
  'เตรียมน้ำดื่มและครีมกันแดด เนื่องจากหลายสถานที่เป็นพื้นที่กลางแจ้งไม่มีร่มเงามากนัก',
  'ตรวจสอบเวลาทำการและสภาพอากาศก่อนเดินทาง โดยเฉพาะเส้นทางขึ้นเขาพระวิหารที่อาจปิดตามฤดูกาล',
]

const heroSlides = attractions.map((a) => ({ src: a.image, alt: a.name }))

function App() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.2, 0.5, 1] },
    )
    navLinks.forEach((link) => {
      const section = document.getElementById(link.href.slice(1))
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <Box>
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{ backdropFilter: 'blur(8px)', bgcolor: 'rgba(251,248,245,0.85)', borderBottom: 1, borderColor: 'divider' }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ py: 1 }}>
            <Box sx={{ flexGrow: 1 }}>
              <BrandLogo />
            </Box>

            {isMobile ? (
              <IconButton onClick={() => setDrawerOpen(true)} aria-label="เปิดเมนู">
                <Menu strokeWidth={1.5} />
              </IconButton>
            ) : (
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.slice(1)
                  return (
                    <Button
                      key={link.label}
                      href={link.href}
                      disableRipple
                      sx={{
                        px: 2,
                        color: isActive ? 'primary.dark' : 'text.primary',
                        fontWeight: isActive ? 700 : 500,
                        '&:hover': { bgcolor: 'transparent', color: 'primary.dark' },
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          left: 16,
                          right: 16,
                          bottom: 4,
                          height: 2,
                          borderRadius: 1,
                          bgcolor: 'primary.main',
                          transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                          transition: 'transform 200ms ease',
                        },
                        '&:hover::after': { transform: 'scaleX(1)' },
                      }}
                    >
                      {link.label}
                    </Button>
                  )
                })}
              </Stack>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 280, p: 2 }} role="presentation">
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <BrandLogo size="small" tagline={false} />
            <IconButton onClick={() => setDrawerOpen(false)} aria-label="ปิดเมนู">
              <X strokeWidth={1.5} />
            </IconButton>
          </Stack>
          <Divider sx={{ mb: 1 }} />
          <List>
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1)
              const Icon = link.icon
              return (
                <ListItem key={link.label} disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton
                    component="a"
                    href={link.href}
                    selected={isActive}
                    onClick={() => setDrawerOpen(false)}
                    sx={{ borderRadius: 2 }}
                  >
                    <ListItemIcon sx={{ minWidth: 36, color: isActive ? 'primary.main' : 'text.secondary' }}>
                      <Icon size={20} strokeWidth={1.5} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography sx={{ fontWeight: isActive ? 700 : 500, color: isActive ? 'primary.dark' : 'text.primary' }}>
                          {link.label}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
        </Box>
      </Drawer>

      <Box
        id="home"
        sx={{
          position: 'relative',
          color: 'common.white',
          pt: { xs: 10, md: 14 },
          pb: { xs: 14, md: 18 },
          overflow: 'hidden',
        }}
      >
        <HeroSlideshow slides={heroSlides} interval={5000} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Stack spacing={3} sx={{ alignItems: 'center', textAlign: 'center' }}>
            <Chip
              label="คู่มือท่องเที่ยวจังหวัดศรีสะเกษ"
              sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', fontWeight: 700 }}
            />
            <Typography variant="h2" sx={{ maxWidth: 800 }}>
              สัมผัสมนตร์เสน่ห์ศรีสะเกษ
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 400, opacity: 0.9, maxWidth: 640 }}>
              "หลวงพ่อโตคู่บ้าน ถิ่นฐานปราสาทขอม ข้าวหอมกระเทียมดี มีสวนสมเด็จ เขตดงลำดวน หลากล้วนวัฒนธรรม เลิศล้ำสามัคคี"
              รวมสถานที่ท่องเที่ยวห้ามพลาด พร้อมเส้นทางและพิกัดจริง
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 2 }}>
              <Button
                variant="contained"
                size="large"
                href="#attractions"
                sx={{ bgcolor: 'common.white', color: 'text.primary', '&:hover': { bgcolor: 'grey.100' } }}
              >
                ดูสถานที่ท่องเที่ยว
              </Button>
              <Button
                variant="outlined"
                size="large"
                href="#map"
                startIcon={<MapIconLucide strokeWidth={1.5} size={20} />}
                sx={{ borderColor: 'common.white', color: 'common.white' }}
              >
                เปิดแผนที่
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Grid container spacing={4}>
          {provinceStats.map((stat) => (
            <Grid key={stat.label} size={{ xs: 6, md: 3 }}>
              <Stack spacing={0.5} sx={{ alignItems: 'center' }}>
                <Typography variant="h3" color="primary" sx={{ fontWeight: 700 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                  {stat.label}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ bgcolor: 'background.paper', py: { xs: 8, md: 10 } }} id="attractions">
        <Container maxWidth="lg">
          <Stack spacing={1} sx={{ alignItems: 'center', textAlign: 'center', mb: 6 }}>
            <Typography variant="overline" color="primary">
              สถานที่แนะนำ
            </Typography>
            <Typography variant="h3">
              6 สถานที่ท่องเที่ยวห้ามพลาดในศรีสะเกษ
            </Typography>
          </Stack>
          <Grid container spacing={3}>
            {attractions.map((attraction) => (
              <Grid key={attraction.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <AttractionCard attraction={attraction} onViewDetails={setSelectedAttraction} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 8, md: 10 } }} id="map">
        <Container maxWidth="lg">
          <Stack spacing={1} sx={{ alignItems: 'center', textAlign: 'center', mb: 6 }}>
            <Typography variant="overline" color="primary">
              แผนที่รวม
            </Typography>
            <Typography variant="h3">
              ตำแหน่งสถานที่ท่องเที่ยวทั้งหมด
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600 }}>
              คลิกที่หมุดบนแผนที่เพื่อดูรายละเอียดของแต่ละสถานที่
            </Typography>
          </Stack>
          <AttractionMap attractions={attractions} onSelect={setSelectedAttraction} />
        </Container>
      </Box>

      <Box sx={{ bgcolor: 'background.paper', py: { xs: 8, md: 10 } }} id="about">
        <Container maxWidth="lg">
          <Stack spacing={1} sx={{ alignItems: 'center', textAlign: 'center', mb: 6 }}>
            <Typography variant="overline" color="primary">
              เกร็ดน่ารู้
            </Typography>
            <Typography variant="h3">
              เคล็ดลับก่อนออกเดินทาง
            </Typography>
          </Stack>
          <Card variant="outlined" sx={{ maxWidth: 800, mx: 'auto' }}>
            <CardContent sx={{ p: 4 }}>
              <List>
                {travelTips.map((tip) => (
                  <ListItem key={tip} disablePadding sx={{ py: 1, alignItems: 'flex-start' }}>
                    <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}>
                      <CheckCircle2 color={theme.palette.primary.main} size={20} strokeWidth={1.5} />
                    </ListItemIcon>
                    <ListItemText primary={tip} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
        <Card
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

      <Box sx={{ bgcolor: 'secondary.dark', color: 'rgba(255,255,255,0.75)', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ mb: 2 }}>
                <BrandLogo inverted />
              </Box>
              <Typography variant="body2" sx={{ color: 'inherit' }}>
                คู่มือรวมสถานที่ท่องเที่ยว เส้นทาง และพิกัดจริงในจังหวัดศรีสะเกษ
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
                ติดตามเรา
              </Typography>
              <Stack direction="row" spacing={1}>
                <IconButton sx={{ color: 'inherit' }} aria-label="Facebook">
                  <FacebookIcon />
                </IconButton>
                <IconButton sx={{ color: 'inherit' }} aria-label="Instagram">
                  <InstagramIcon />
                </IconButton>
                <IconButton sx={{ color: 'inherit' }} aria-label="GitHub">
                  <GitHubIcon />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.15)', my: 4 }} />
          <Typography variant="body2" sx={{ textAlign: 'center', color: 'inherit' }}>
            © {new Date().getFullYear()} เที่ยวศรีสะเกษ · ข้อมูลอ้างอิงจาก Wikipedia · ภาพถ่ายจาก Wikimedia Commons
          </Typography>
        </Container>
      </Box>

      <AttractionDialog attraction={selectedAttraction} onClose={() => setSelectedAttraction(null)} />
    </Box>
  )
}

export default App
