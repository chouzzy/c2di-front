import type { AppProps } from 'next/app'
import { ChakraBaseProvider } from '@chakra-ui/react'

import { fonts } from '../lib/fonts'
import { theme } from '@/styles/theme'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-montserrat: ${fonts.montserrat.style.fontFamily};
          }
        `}
      </style>
      <ChakraBaseProvider theme={theme}>
        <Head>
          <title>Natasha Macedo</title>
        </Head>
        <Component {...pageProps} />
      </ChakraBaseProvider>
    </>
  )
}
