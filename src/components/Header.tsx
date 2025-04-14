'use client'

import Link from 'next/link'
import { Menu, X, Globe } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LinkNavTabs } from './link-nav-tabs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { motion, AnimatePresence } from 'framer-motion'

const NAVIGATION_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/favorites', label: 'Favorites' },
]

const LANGUAGES = [
  { code: 'ja', label: '日本語' },
  { code: 'en', label: 'English' },
]

const menuContentVariants = {
  hidden: { 
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
      ease: [0.19, 1, 0.22, 1]
    }
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: [0.19, 1, 0.22, 1]
    }
  }
}

const containerVariants = {
  open: {
    height: "auto",
    transition: {
      duration: 0.2,
      ease: [0.19, 1, 0.22, 1],
      staggerChildren: 0.05,
      when: "beforeChildren"
    }
  },
  closed: {
    height: 49,
    transition: {
      duration: 0.2,
      ease: [0.19, 1, 0.22, 1],
      when: "afterChildren"
    }
  }
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const navTabs = NAVIGATION_ITEMS.map(item => ({
    label: <Link href={item.href}>{item.label}</Link>,
    path: item.href
  }))

  const switchLocale = (locale: string) => {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`
    router.refresh()
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <motion.div 
        className="backdrop-blur-md border-b border-gray-200 dark:border-gray-800 overflow-hidden"
        animate={isMenuOpen ? "open" : "closed"}
        variants={containerVariants}
        initial="closed"
      >
        <div className="flex justify-between items-center mx-auto max-w-7xl px-4 sm:px-6 h-12">
          <div className="hidden md:flex">
            <LinkNavTabs tabs={navTabs} springy />
          </div>

          <div className="flex items-center">
            <div className="hidden md:flex">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                  <Globe className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {LANGUAGES.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => switchLocale(lang.code)}
                    >
                      {lang.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex md:hidden">
              <button
                className="rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={menuContentVariants}
            >
              <nav className="flex flex-col py-4 px-4">
                {NAVIGATION_ITEMS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="py-3 px-4 font-medium text-gray-600 transition-colors hover:text-purple-600 hover:bg-black/10 dark:text-gray-300 dark:hover:text-purple-400 dark:hover:bg-gray-800/50 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                
                <div className="mt-4 px-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                      <Globe className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {LANGUAGES.map((lang) => (
                        <DropdownMenuItem
                          key={lang.code}
                          onClick={() => switchLocale(lang.code)}
                        >
                          {lang.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  )
}