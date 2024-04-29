import { useStore } from '@/common/store'

export default function TableHeader() {
  const activeTab = useStore((state) => state.activeTab)
  const header = [
    activeTab === 'cost' ? 'Unit Cost' : 'Unit Price',
    'Qty',
    'Sum',
  ]

  return (
    <div className="sticky top-[calc(env(safe-area-inset-top)+4rem)] z-10 flex h-16 items-center bg-inherit">
      <div className="mx-1 w-32"></div>
      {header.map((column, i) => (
        <div key={i} className="flex-1 text-center font-medium">
          {column}
        </div>
      ))}
    </div>
  )
}
