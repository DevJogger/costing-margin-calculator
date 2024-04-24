import { showAsMoney } from '@/common/helperFunctions'
import { type Tab } from '@/types/Tabs'

interface TabBarProps {
  onTabClick: (tab: Tab) => void
  costTotal: number
  priceTotal: number
  marginTotal: number
}

const TABS: { name: Tab; background: string }[] = [
  { name: 'cost', background: 'bg-purple-800' },
  { name: 'price', background: 'bg-cyan-700' },
  { name: 'margin', background: 'bg-pink-800' },
]

export default function TabBar({
  onTabClick,
  costTotal,
  priceTotal,
  marginTotal,
}: TabBarProps) {
  return (
    <footer className="sticky bottom-0 flex h-16 gap-1 bg-white pb-2 dark:bg-stone-900">
      {TABS.map((tab, i) => (
        <div
          key={i}
          className={`flex flex-1 flex-col justify-center truncate rounded-b-xl p-2 leading-tight text-white ${tab.background}`}
          onClick={() => onTabClick(tab.name)}
        >
          <span className="capitalize">{tab.name}</span>
          <span>
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
    </footer>
  )
}
