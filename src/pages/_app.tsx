import type { AppProps } from 'next/app'
import { ChakraBaseProvider } from '@chakra-ui/react'

import { fonts } from '../lib/fonts'
import { theme } from '@/styles/theme'
import Head from 'next/head'
import Script from 'next/script'

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
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-11353857450"
      ></Script>

      <Script
        id="google-tag-manager"
        // strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'AW-11353857450');
         `,
        }}
      ></Script>
      <ChakraBaseProvider theme={theme}>
        <Head>
          <title>Natasha Macedo</title>
        </Head>
        <Component {...pageProps} />
      </ChakraBaseProvider>
    </>
  )
}
