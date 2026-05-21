import type { Metadata } from 'next'
import { Sora } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const soraFont = Sora({ subsets: ["latin"], variable: '--font-sora' });

export const metadata: Metadata = {
  title: 'Hotel Management System',
  description: 'Professional hotel management dashboard',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/logo.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/logo.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/logo.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning style={{fontFamily: 'Sora, sans-serif'}} className={soraFont.variable}>
      <body className="antialiased" style={{fontFamily: 'Sora, sans-serif'}}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  )
}
