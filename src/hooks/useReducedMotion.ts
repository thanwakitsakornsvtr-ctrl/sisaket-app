import useMediaQuery from '@mui/material/useMediaQuery'

/** Shared source of truth for `prefers-reduced-motion` — used by both the
 * CSS-transition hero slideshow and every GSAP-driven section. */
export default function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
