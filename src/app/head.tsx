// app/head.tsx
import Head from 'next/head'
import Script from 'next/script'

export default function HeadComponent() {
  return (
    <Head>
      <title>C2DI app</title>
      {/* ... outras meta tags ... */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-11353857450"
      />
      <Script
        id="google-tag-manager"
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'AW-11353857450');
            `,
        }}
      />
    </Head>
  );
}