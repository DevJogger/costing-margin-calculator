import { useState } from 'react'
import { showAsMoney } from '@/common/helperFunctions'
import type { Tab } from '@/common/types'

interface TabBarProps {
  onTabClick: (tab: Tab) => void
  costTotal: number
  priceTotal: number
  marginTotal: number
}

const TABS: { name: Tab; background: string; textColor: string }[] = [
  { name: 'cost', background: '--costBg', textColor: '--costText' },
  { name: 'price', background: '--priceBg', textColor: '--priceText' },
  { name: 'margin', background: '--marginBg', textColor: '--marginText' },
]

export default function TabBar({
  onTabClick,
  costTotal,
  priceTotal,
  marginTotal,
}: TabBarProps) {
  const [activeTab, setActiveTab] = useState<Tab>('cost')
  const handleOnClick = (tab: Tab) => {
    setActiveTab(tab)
    onTabClick(tab)
  }
  return (
    <header className="sticky top-0 z-10 flex w-full flex-col overflow-hidden bg-gradient-to-bl from-slate-100 to-amber-50 pt-safe-top dark:from-slate-900 dark:to-neutral-950">
      <div className="pt-2"></div>
      <div className="flex gap-2">
        {TABS.map((tab, i) => (
          <div
            key={i}
            className={`relative flex flex-col justify-center whitespace-nowrap rounded-t-xl p-2 leading-tight transition-all ${activeTab === tab.name ? 'flex-[1.2]' : 'flex-1'}`}
            style={
              {
                background: `var(${tab.background})`,
                color: `var(${tab.textColor})`,
                zIndex: `${activeTab === tab.name ? '10' : 9 - i}`,
              } as React.CSSProperties
            }
            onClick={() => handleOnClick(tab.name)}
          >
            <div
              className="absolute -left-4 bottom-0 h-4 w-4 text-[0]"
              style={{
                background: `radial-gradient(circle at 0 0, transparent 1rem, var(${tab.background}) 1rem)`,
              }}
            >
              invert border radius - left
            </div>
            <div
              className="absolute -right-4 bottom-0 h-4 w-4 text-[0]"
              style={{
                background: `radial-gradient(circle at 100% 0, transparent 1rem, var(${tab.background}) 1rem)`,
              }}
            >
              invert border radius - right
            </div>
            <span className="capitalize font-medium">{tab.name}</span>
            <span
              style={
                tab.name === 'margin' && marginTotal < 0
                  ? { color: 'var(--marginNegativeText)' }
                  : {}
              }
            >
              {showAsMoney(
                tab.name === 'cost'
                  ? costTotal
                  : tab.name === 'price'
                    ? priceTotal
                    : marginTotal,
              )}
            </span>
          </div>
        ))}
      </div>
    </header>
  )
}
