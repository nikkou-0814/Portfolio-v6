'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { LinkNavTabs } from './link-nav-tabs'

const NAVIGATION_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/favorites', label: 'Favorites' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navTabs = NAVIGATION_ITEMS.map(item => ({
    label: <Link href={item.href}>{item.label}</Link>,
    path: item.href
  }))

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="flex justify-between items-center mx-auto max-w-7xl px-4 sm:px-6 py-1">
          <div className="hidden md:flex">
            <LinkNavTabs tabs={navTabs} springy />
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
        {isMenuOpen && (
        <div className="md:hidden animate-in slide-in-from-top duration-200">
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
          </nav>
        </div>
      )}
      </div>
    </header>
  )
}