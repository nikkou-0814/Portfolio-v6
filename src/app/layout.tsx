import "./globals.css"
import { Inter } from "next/font/google"
import Providers from "./providers"
import Header from "./components/Header"
import Footer from './components/footer';

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "nikkou",
  description: "nikkou's Portfolio",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}