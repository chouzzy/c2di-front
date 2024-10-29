/* theme.ts */
import { extendBaseTheme, theme as chakraTheme } from '@chakra-ui/react'

const { Button } = chakraTheme.components

export const theme = extendBaseTheme({
  fonts: {
    heading: 'var(--font-montserrat)',
    body: 'var(--font-montserrat)',
  },
  components: {
    Button,
  },
  colors: {
    darkSide:"#0F172A",
    lightSide:"#fbfbfb",
    grayDivisor:"#E5E7EB",
    inputBorder:"#CBD5E1",
    graySide:"#64748B",
    redSide:"#EF3A5D",
    
    santaFe: '#B16E51',
    brass: '#CB8762',
    whiskey: '#D49671',
    olive: '#A29C84',
    bitter: '#89907F',
    siam: '#67705F',
    siamTranslucent: '#67705Fdd',
    eerie: '#202222',
  },
  radii: {
    none: '0',
    sm: '0.25rem',
    base: '0.25rem',
    md: '0.5rem',
    lg: '1.125rem',
    full: '9999px',
  },
  fontSizes: {
    sm: '0.75rem',
    md: '1rem',
    lg: '1.25rem',
  },
  lineHeights: {
    sm: '1.125rem',
    md: '1.5rem',
    lg: '1.875rem',
  },
  styles: {
    global: {
      'html, body': {
        bgColor: 'alabaster',
        fontWeight: 'light',
        color: 'eerie',
        scrollBehavior: 'smooth',
        maxWidth: '100%',
      },
    },
  },
  shadows: {
    default: '15px 15px 50px 0 rgba(0, 0, 0, 0.20)',
  },
})
