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

// styles/theme.ts
import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light', // ou 'dark', se preferir dark como padrão
  useSystemColorMode: false, // Comece com false, depois você pode mudar
};

export const theme = extendTheme({
  config, // Adicione a configuração aqui
  fonts: {
    heading: 'var(--font-montserrat)',
    body: 'var(--font-montserrat)',
  },
  colors: {
    // ... suas cores existentes ...
    darkSide: "#0F172A",
    lightSide: "#fbfbfb",
    graySide: "#64748B",
    darkSideTransparent: "#0F172Aaa",
    grayCardSide: "#475569",
    grayDivisor: "#E5E7EB",
    grayDivisorTransparent: "#E5E7EBaa",
    inputBorder: "#CBD5E1",
    grayHoverSide: "#e4e4e7",
    grayMenuSide: "#e4e4e7",
    grayBox: "#E2E8F0",
    redSide: "#EF3A5D",
    yellowSide: "#efca1d",
    beigeSide: "#f1f1f1",
    borderMediaSide: "#E2E8F0cc",

    facebook: "#3B5998",
    whatsapp: "#25D366",
    appleBlack: "#000000",

    // GRAFICOS
    blueGraph: '#1591ea',
    greenGraph: '#51c25d',
    greenProfit: '#46cb18',

    santaFe: '#B16E51',
    brass: '#CB8762',
    whiskey: '#D49671',
    olive: '#A29C84',
    bitter: '#89907F',
    siam: '#67705F',
    siamTranslucent: '#67705Fdd',
    eerie: '#202222',

    // Cores para dark mode (ADICIONE ISSO)
    dark: {
      bg: "#1A202C", // Exemplo de cor de fundo escura
      text: "#F7FAFC", // Exemplo de cor de texto clara
      darkSide: '#fbfbfb',
      beigeSide: "#2c3e50",
      grayHoverSide:"#414f63",
      grayDivisor:"#425066",
      graySide:"#F5F5F5",
      lightSide:'#2c3e50'
      // Adicione outras cores para o dark mode aqui
    },
    light: {
      bg: "#fbfbfb", // Substitui pela sua cor de fundo atual
      text: '#202222',  // Substitui pela sua cor de texto clara
      beigeSide: "#f0f0f0",
    }
  },
  radii: {
    // ... seus radii existentes ...
  },
  fontSizes: {
    // ... seus fontSizes existentes ...
  },
  lineHeights: {
    // ... seus lineHeights existentes ...
  },
  components: {
    //Button, // Não é necessário importar assim, a não ser que vc queira sobrescrever algo
    //Radio, // Não é necessário importar assim, a não ser que vc queira sobrescrever algo
  },
  styles: {
    global: (props: any) => ({ // Use props para acessar o colorMode
      'html, body': {
        // Aplica as cores de fundo e texto baseadas no modo de cor.
        bg: props.colorMode === 'dark' ? 'dark.bg' : 'light.bg',
        color: props.colorMode === 'dark' ? 'dark.text' : 'light.text',
        fontWeight: 'light',
        scrollBehavior: 'smooth',
        maxWidth: '100%',
        padding: 0,
        margin: 0
      },
    }),
  },
  shadows: {
    // ... seus shadows existentes ...
  },
});
