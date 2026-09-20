import { useEffect, useRef, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Drawer from '@mui/material/Drawer'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { Menu, X } from 'lucide-react'
import { useGSAP } from '@gsap/react'

import { navLinks } from '../../data/navigation'
import useActiveSection from '../../hooks/useActiveSection'
import useReducedMotion from '../../hooks/useReducedMotion'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { getLenis } from '../../lib/lenis'
import BrandLogo from '../BrandLogo'

const sectionIds = navLinks.map((link) => link.href.slice(1))

function SiteHeader() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [drawerOpen, setDrawerOpen] = useState(false)
  const activeSection = useActiveSection(sectionIds)
  const reduceMotion = useReducedMotion()

  // Lenis's RAF loop can desync from MUI's scroll-lock while the drawer is open.
  useEffect(() => {
    if (drawerOpen) getLenis()?.stop()
    else getLenis()?.start()
  }, [drawerOpen])
  const appBarRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const inner = appBarRef.current?.querySelector<HTMLElement>('[data-header-inner]')
      const shadow = appBarRef.current?.querySelector<HTMLElement>('[data-header-shadow]')
      if (!inner || !shadow || reduceMotion) return

      gsap.set(inner, { transformOrigin: '0% 50%' })
      ScrollTrigger.create({
        start: 'top -1',
        end: 100000,
        onEnter: () => {
          gsap.to(inner, { scale: 0.94, duration: 0.25, ease: 'power2.out' })
          gsap.to(shadow, { opacity: 1, duration: 0.25 })
        },
        onLeaveBack: () => {
          gsap.to(inner, { scale: 1, duration: 0.25, ease: 'power2.out' })
          gsap.to(shadow, { opacity: 0, duration: 0.25 })
        },
      })
    },
    { scope: appBarRef, dependencies: [reduceMotion] },
  )

  return (
    <>
      <AppBar
        ref={appBarRef}
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{ backdropFilter: 'blur(8px)', bgcolor: 'rgba(251,248,245,0.85)', borderBottom: 1, borderColor: 'divider' }}
      >
        <Box
          data-header-shadow
          aria-hidden
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '100%',
            height: 10,
            opacity: 0,
            pointerEvents: 'none',
            background: 'linear-gradient(to bottom, rgba(36,28,21,0.08), transparent)',
          }}
        />
        <Container maxWidth="lg">
          <Toolbar data-header-inner disableGutters sx={{ py: 1 }}>
            <Box sx={{ flexGrow: 1 }}>
              <BrandLogo />
            </Box>

            {isMobile ? (
              <IconButton onClick={() => setDrawerOpen(true)} aria-label="เปิดเมนู">
                <Menu strokeWidth={1.5} />
              </IconButton>
            ) : (
              <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.slice(1)
                  return (
                    <Button
                      key={link.label}
                      href={link.href}
                      disableRipple
                      sx={{
                        px: 1.5,
                        color: isActive ? 'primary.dark' : 'text.primary',
                        fontWeight: isActive ? 700 : 500,
                        '&:hover': { bgcolor: 'transparent', color: 'primary.dark' },
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          left: 12,
                          right: 12,
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
    </>
  )
}

export default SiteHeader
