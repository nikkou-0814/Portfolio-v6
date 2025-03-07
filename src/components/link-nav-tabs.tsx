'use client'

import { Suspense } from 'react'
import { AnimatedNavTabs } from './animated-nav-tabs'
import { usePathname, useSearchParams } from 'next/navigation'

type LinkNavTabsProps = {
  tabs: Array<{ label: React.ReactNode; path: string }>
  springy?: boolean
}

export function LinkNavTabs({ tabs, springy }: LinkNavTabsProps) {
  const pathname = usePathname()

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavTabsContent tabs={tabs} springy={springy} pathname={pathname} />
    </Suspense>
  )
}

function NavTabsContent({ tabs, springy, pathname }: LinkNavTabsProps & { pathname: string }) {
  const searchParams = useSearchParams()
  const searchParamsString = searchParams.toString()
  const fullPath = pathname + (searchParamsString.length > 0 ? '?' : '') + searchParamsString
  const runtimeTabs = tabs.map((tab) => ({
    label: tab.label,
    path: tab.path,
    active: fullPath === tab.path,
  }))

  return <AnimatedNavTabs tabs={runtimeTabs} springy={springy} />
}