import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* <!-- HTML Meta Tags --> */}
        <meta
          name="description"
          content="Psicóloga Clínica e Especialista em Desenvolvimento de Carreira,
            formada há 23 anos."
        />
        <meta
          name="keywords"
          content="psicóloga, psicologia, terapia, clínica, especialista, carreira, trabalho, vocacional, desenvolvimento, crescer, médico, médica, psicólogo, coach, natasha, macedo, natashapsi, psicoterapia, autoconhecimento, profissional, orientação, currículo"
        />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://natashapsi.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Natasha Macedo" />
        <meta
          property="og:description"
          content="Psicóloga Clínica e Especialista em Desenvolvimento de Carreira,
            formada há 23 anos."
        />
        <meta
          property="og:image"
          content="https://natashapsi.vercel.app/assets/logo.png"
        />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:domain"
          content="https://natashapsi.vercel.app/"
        />
        <meta property="twitter:url" content="https://natashapsi.vercel.app/" />
        <meta name="twitter:title" content="Natasha Macedo" />
        <meta
          name="twitter:description"
          content="Psicóloga Clínica e Especialista em Desenvolvimento de Carreira,
            formada há 23 anos."
        />
        <meta
          name="twitter:image"
          content="https://natashapsi.vercel.app/assets/logo.png"
        />

        <link rel="icon" type="image/x-icon" href="/assets/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
