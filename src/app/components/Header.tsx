'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { LinkNavTabs } from './link-nav-tabs'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navTabs = [
    { label: <Link href="/">Home</Link>, path: '/' },
    { label: <Link href="/about">About</Link>, path: '/about' },
    { label: <Link href="/projects">Projects</Link>, path: '/projects' },
    { label: <Link href="/favorites">Favorites</Link>, path: '/favorites' },
  ]
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/favorites', label: 'Favorites' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md">
      <div className="flex justify-between items-center mx-auto max-w-7xl px-4 sm:px-6 py-4">
        <div className="hidden md:flex">
          <LinkNavTabs tabs={navTabs} springy />
        </div>

        <div className="flex md:hidden">
          <button
            className="rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
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
        <div className="md:hidden fixed top-16 left-0 right-0 z-40">
          <nav className="flex flex-col space-y-4 py-4 px-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-medium text-gray-600 transition-colors hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}