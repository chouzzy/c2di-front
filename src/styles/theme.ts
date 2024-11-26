/* theme.ts */



// Com isso, temos o email, nickname e vários outros atributos do user, que está logado pelo auth0. também podemos pegar o Token fornecido pelo auth0 e seguir para a página de criação de usuario, ou, autenticação no banco de dados

// Logar o usuario
// Receber o user do auth0
// Fazer um UseEffect do usuário para o backend e checar se o puto existe (user.sub é o id) PASSANDO O TOKEN, algo assim:
// const response = await fetch('/backend/users/list', {
//   headers: {
//     Authorization: `Bearer ${token}`, passando o accessToken pego em: const { accessToken } = await getAccessToken(req, res), em: import { getAccessToken } from '@auth0/nextjs-auth0'; não pode ser 'use client'
//   },
// });
// 
// Redirecionar pra criação do usuário (se for necessário)
// Criar o usuario no banco (sempre passando token)
// Redirecionar para "seu perfil" por enquanto

// Refresh token é lidado sozinho com o proprio auth0



import { extendTheme, theme as chakraTheme } from '@chakra-ui/react'

const { Button, Radio  } = chakraTheme.components

export const theme = extendTheme({
  fonts: {
    heading: 'var(--font-montserrat)',
    body: 'var(--font-montserrat)',
  },
  components: {
    Button,
  },
  colors: {
    darkSide: "#0F172A",
    lightSide: "#fbfbfb",
    grayDivisor: "#E5E7EB",
    grayDivisorTransparent: "#E5E7EBaa",
    inputBorder: "#CBD5E1",
    graySide: "#64748B",
    grayHoverSide: "#e4e4e7",
    grayMenuSide: "#e4e4e7",
    grayBox: "#E2E8F0",
    redSide: "#EF3A5D",
    yellowSide: "#efca1d",
    beigeSide: "#f6f6f6",
    borderMediaSide: "#E2E8F0cc",

    facebook: "#3B5998",
    whatsapp: "#25D366",
    appleBlack: "#000000",

    // GRAFICOS
    blueGraph: '#1591ea',
    greenGraph: '#51c25d',



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
