import { showAsMoney } from '@/common/helperFunctions'

interface TabBarProps {
  onTabClick: (tab: 'cost' | 'price' | 'margin') => void
  costSum: number
  priceSum: number
  marginSum: number
}

export default function TabBar({
  onTabClick,
  costSum,
  priceSum,
  marginSum,
}: TabBarProps) {
  const TABS: { name: 'cost' | 'price' | 'margin'; background: string }[] = [
    { name: 'cost', background: 'bg-purple-800' },
    { name: 'price', background: 'bg-cyan-700' },
    { name: 'margin', background: 'bg-pink-800' },
  ]

  return (
    <footer className="flex h-16 gap-1 bg-white pb-2 dark:bg-stone-900">
      {TABS.map((tab, i) => (
        <div
          key={i}
          className={`flex flex-1 flex-col justify-center truncate rounded-b-xl px-2 leading-tight text-white ${tab.background}`}
          onClick={() => onTabClick(tab.name)}
        >
          <span className="capitalize">{tab.name}</span>
          <span>
            {showAsMoney(
              tab.name === 'cost'
                ? costSum
                : tab.name === 'price'
                  ? priceSum
                  : marginSum,
            )}
          </span>
        </div>
      ))}
    </footer>
  )
}
