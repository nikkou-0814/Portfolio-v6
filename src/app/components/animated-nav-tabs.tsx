'use client'

import React, { useEffect, useRef } from 'react'

type TabItem = {
  label: React.ReactNode
  path: string
  active: boolean
}

export function AnimatedNavTabs({
  tabs,
  springy,
}: {
  tabs: TabItem[]
  springy?: boolean
}) {
  const tabContainerRef = useRef<HTMLDivElement | null>(null)
  const tabIndicatorRef = useRef<HTMLDivElement | null>(null)
  const tabRefs = useRef<Array<HTMLDivElement | null>>([])
  const hoverBgRef = useRef<HTMLDivElement | null>(null)
  const activeTab = tabs.find((tab) => tab.active)

  useEffect(() => {
    const activeTabRef = tabRefs.current.find(
      (ref) => ref?.dataset.path === activeTab?.path
    )
    if (activeTabRef && tabIndicatorRef.current) {
      tabIndicatorRef.current.style.width = `${activeTabRef.offsetWidth}px`
      tabIndicatorRef.current.style.left = `${activeTabRef.offsetLeft}px`
    }
  }, [activeTab, tabs])

  useEffect(() => {
    const tabsElements = tabRefs.current
    const tabContainer = tabContainerRef.current

    const handleMouseEnter = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (hoverBgRef.current) {
        hoverBgRef.current.style.width = `${target.offsetWidth}px`
        hoverBgRef.current.style.left = `${target.offsetLeft}px`
        hoverBgRef.current.style.opacity = '1'
      }
    }

    const handleMouseLeave = () => {
      if (hoverBgRef.current) {
        hoverBgRef.current.style.opacity = '0'
      }
    }

    tabsElements.forEach((tab) => {
      tab?.addEventListener('mouseenter', handleMouseEnter)
    })
    tabContainer?.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      tabsElements.forEach((tab) => {
        tab?.removeEventListener('mouseenter', handleMouseEnter)
      })
      tabContainer?.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div className="w-full">
      <div className="relative">
        <div
          ref={tabContainerRef}
          className="inline-flex h-12 w-full items-center justify-start bg-transparent px-2 text-muted-foreground"
          role="tablist"
          tabIndex={0}
        >
          {tabs.map((tab, idx) => (
            <div
              role="tab"
              aria-selected={tab.active}
              tabIndex={0}
              key={tab.path}
              ref={(ref) => {
                tabRefs.current[idx] = ref
              }}
              data-path={tab.path}
              data-state={tab.active ? 'active' : 'inactive'}
              className={
                'relative z-10 inline-flex h-12 items-center justify-center whitespace-nowrap px-3 py-1 text-sm ' +
                'transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ' +
                'focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ' +
                'data-[state=active]:text-foreground'
              }
            >
              {tab.label}
            </div>
          ))}

          <div
            ref={hoverBgRef}
            className={`absolute bottom-0 z-0 h-full py-2 transition-all motion-reduce:transition-none ${
              springy ? 'duration-500 ease-spring-4' : 'duration-150 ease-linear'
            }`}
            style={{ opacity: 0 }}
          >
            <div className="h-full w-full rounded-lg bg-gray-300 bg-opacity-50 dark:bg-gray-200 dark:bg-opacity-20" />
          </div>

          <div
            ref={tabIndicatorRef}
            className={`absolute bottom-0 z-10 transition-all duration-300 motion-reduce:transition-none ${
              springy ? 'ease-spring-4' : 'ease-linear'
            }`}
          >
            <div className="h-1 bg-primary bg-black dark:bg-white rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}