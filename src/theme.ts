import { createTheme, responsiveFontSizes } from '@mui/material/styles'

// Modular type scale — ratio 1.25 (Major Third) from a 16px base.
const BASE = 16
const RATIO = 1.25
const scale = (steps: number) => `${(BASE * RATIO ** steps).toFixed(2)}px`

let theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      // Official Sisaket province color ("สีแสด" flame orange), verified
      // against the province flag SVG (Wikimedia Commons: Flag_of_Sisaket.svg).
      main: '#FF5722',
      light: '#FF8A65',
      dark: '#D84315',
      contrastText: '#241C15',
    },
    secondary: {
      main: '#5C4B3D',
      light: '#8A7A6C',
      dark: '#241C15',
      contrastText: '#FBF8F5',
    },
    background: {
      default: '#FBF8F5',
      paper: '#FFFFFF',
    },
    divider: '#E7DED4',
    text: {
      primary: '#241C15',
      secondary: '#5C4B3D',
    },
  },
  typography: {
    fontFamily: ['Inter', '"IBM Plex Sans Thai"', 'system-ui', 'sans-serif'].join(','),
    h1: { fontWeight: 700, letterSpacing: '-0.02em', fontSize: scale(6) },
    h2: { fontWeight: 700, letterSpacing: '-0.02em', fontSize: scale(5) },
    h3: { fontWeight: 700, fontSize: scale(4) },
    h4: { fontWeight: 700, fontSize: scale(3) },
    h5: { fontWeight: 600, fontSize: scale(2) },
    h6: { fontWeight: 600, fontSize: scale(1) },
    body1: { fontSize: scale(0) },
    body2: { fontSize: '14px' },
    caption: { fontSize: scale(-1) },
    overline: { fontSize: scale(-1), fontWeight: 700 },
    button: { fontWeight: 600, textTransform: 'none' },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 8, paddingInline: 24, paddingBlock: 8 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 12 },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600, borderRadius: 8 },
      },
    },
  },
})

theme = responsiveFontSizes(theme)

export default theme
