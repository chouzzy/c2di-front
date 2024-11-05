'use client'

import { UserProvider } from '@auth0/nextjs-auth0/client';
import { fonts } from '../../src/lib/fonts';
// import { theme } from '@/styles/theme';
import { Global } from '@emotion/react';
import { Providers } from './providers'


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <UserProvider>
            <Global
              styles={`
                :root {
                  --font-montserrat: ${fonts.montserrat.style.fontFamily};
                }
              `}
            />
            {children}
          </UserProvider>
        </Providers>
      </body>
    </html>
  );
}