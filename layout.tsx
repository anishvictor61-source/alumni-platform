import './globals.css'

export const metadata = {
  title: 'Alumni Platform',
  description: 'A branded community platform for alumni networks',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
