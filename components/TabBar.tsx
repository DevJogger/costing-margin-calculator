import { useMemo } from 'react'
import { useStore } from '@/common/store'
import { showAsMoney } from '@/common/helperFunctions'
import type { Tab } from '@/common/types'

const TABS: { name: Tab; background: string; textColor: string }[] = [
  { name: 'cost', background: '--costBg', textColor: '--costText' },
  { name: 'price', background: '--priceBg', textColor: '--priceText' },
  { name: 'margin', background: '--marginBg', textColor: '--marginText' },
]

export default function TabBar() {
  const activeTab = useStore((state) => state.activeTab)
  const setTab = useStore((state) => state.setTab)

  const costData = useStore((state) => state.costData)
  const productData = useStore((state) => state.productData)

  const costTotal = useMemo(() => {
    return (
      costData.reduce((pre, cur) => pre + cur?.unitCost * cur?.qty, 0) +
      productData.reduce((pre, cur) => pre + cur?.unitCost * cur?.qty, 0)
    )
  }, [costData, productData])
  const priceTotal = useMemo(() => {
    return productData.reduce((pre, cur) => pre + cur?.unitPrice * cur?.qty, 0)
  }, [productData])

  const marginTotal = useMemo(
    () => priceTotal - costTotal,
    [priceTotal, costTotal],
  )

  return (
    <header className="sticky top-0 z-10 flex w-full flex-none flex-shrink-0 flex-grow-0 flex-col overflow-hidden bg-gradient-to-bl from-slate-100 to-amber-50 pt-safe-top dark:from-slate-900 dark:to-neutral-950">
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
            onClick={() => setTab(tab.name)}
          >
            {/* invert border radius - left */}
            <div
              className="absolute -left-4 bottom-0 h-4 w-4"
              style={{
                background: `radial-gradient(circle at 0 0, transparent 1rem, var(${tab.background}) 1rem)`,
              }}
            ></div>
            {/* invert border radius - right */}
            <div
              className="absolute -right-4 bottom-0 h-4 w-4"
              style={{
                background: `radial-gradient(circle at 100% 0, transparent 1rem, var(${tab.background}) 1rem)`,
              }}
            ></div>
            <span className="font-medium capitalize">{tab.name}</span>
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
