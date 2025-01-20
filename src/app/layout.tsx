import "./globals.css"
import { Inter } from "next/font/google"
import Providers from "./providers"
import Header from "./components/Header"
import Footer from './components/footer';
import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "nikkou",
  description: "nikkou's Portfolio",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Header />
          <NextIntlClientProvider messages={messages}>
            <main>{children}</main>
          </NextIntlClientProvider>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}