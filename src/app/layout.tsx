import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://inspiredcannes.com'),
  title: 'GET INSPIRED — Cannes Lions 2026',
  description: 'Tell us what moves you. We create something beautiful — and make sure the causes you care about get seen.',
  openGraph: {
    title: 'GET INSPIRED — Cannes Lions 2026',
    description: 'Tell us what moves you.',
    url: '/campaign',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
