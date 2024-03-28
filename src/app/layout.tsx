import { Inter } from 'next/font/google'
import ThemeProvider from '@/components/theme-provider'
import ThemeSwitch from '@/components/theme/switch'
import { cn } from '@/lib/utils'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans'
})

export default function RootLayout ({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      suppressHydrationWarning
      lang='en'
    >
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable
        )}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ThemeSwitch />
        </ThemeProvider>
      </body>
    </html>
  )
}
