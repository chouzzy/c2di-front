'use client'

import { UserProvider } from '@auth0/nextjs-auth0/client';
import { fonts } from '../../src/lib/fonts';
import { Global } from '@emotion/react';
import { theme } from '@/styles/theme'
import { Providers } from './providers'
import '../styles/global.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <UserProvider>
          <Global
            styles={`
                :root {
                  --font-montserrat: ${fonts.montserrat.style.fontFamily};
                  }
                  `}
          />
            <Providers>
              {children}
            </Providers>
        </UserProvider>
      </body>
    </html>
  );
}