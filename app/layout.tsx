import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Costing/Margin Calculator',
  description: '',
  appleWebApp: {
    statusBarStyle: 'black-translucent',
    title: 'Margin Calculator',
  },
}

export const viewport: Viewport = {
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F1F5F9' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="standalone:h-lvh flex h-dvh flex-col">{children}</body>
    </html>
  )
}
