import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* <!-- HTML Meta Tags --> */}
        <meta
          name="description"
          content="App C2DI"
        />
        <meta
          name="keywords"
          content="empreendimento, investimento, imoveis, imobiliario"
        />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://c2di.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="C2DI" />
        <meta
          property="og:description"
          content="App C2DI"
        />
        <meta
          property="og:image"
          content="https://c2di.vercel.app/assets/og_image.png"
        />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:domain" content="https://c2di.vercel.app/" />

        <link rel="icon" type="image/x-icon" href="/assets/favicon.png" />
        <link rel="canonical" href="https://c2di.vercel.app/" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
