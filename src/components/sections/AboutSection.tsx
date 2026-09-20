import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { useTheme } from '@mui/material/styles'
import { CheckCircle2 } from 'lucide-react'
import useSectionReveal from '../../hooks/useSectionReveal'

const travelTips = [
  'แต่งกายสุภาพเมื่อเข้าชมปราสาทหินและวัด ควรสวมเสื้อผ้าปกปิดไหล่และเข่า',
  'ผามออีแดงมีแดดจัดช่วงกลางวัน แนะนำไปช่วงเช้าหรือเย็นเพื่อชมทัศนียภาพและอากาศที่สบายกว่า',
  'เตรียมน้ำดื่มและครีมกันแดด เนื่องจากหลายสถานที่เป็นพื้นที่กลางแจ้งไม่มีร่มเงามากนัก',
  'ตรวจสอบเวลาทำการและสภาพอากาศก่อนเดินทาง โดยเฉพาะเส้นทางขึ้นเขาพระวิหารที่อาจปิดตามฤดูกาล',
]

function AboutSection() {
  const theme = useTheme()
  const scope = useSectionReveal('[data-reveal]')

  return (
    <Box ref={scope} sx={{ bgcolor: 'background.paper', py: { xs: 8, md: 10 } }} id="about">
      <Container maxWidth="lg">
        <Stack spacing={1} sx={{ alignItems: 'center', textAlign: 'center', mb: 6 }}>
          <Typography variant="overline" color="primary">
            เกร็ดน่ารู้
          </Typography>
          <Typography variant="h3">เคล็ดลับก่อนออกเดินทาง</Typography>
        </Stack>
        <Card variant="outlined" sx={{ maxWidth: 800, mx: 'auto' }}>
          <CardContent sx={{ p: 4 }}>
            <List>
              {travelTips.map((tip) => (
                <ListItem key={tip} data-reveal disablePadding sx={{ py: 1, alignItems: 'flex-start' }}>
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
  )
}

export default AboutSection
