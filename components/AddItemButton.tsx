import { Plus } from 'lucide-react'
import { useStore } from '@/common/store'

interface AddItemButtonProps {
  type: 'cost' | 'product'
}
export default function AddItemButton({ type }: AddItemButtonProps) {
  const addNewItem = useStore((state) => state.addNewItem)
  const activeTab = useStore((state) => state.activeTab)

  return (
    <div className="flex h-16 items-center justify-center text-sm">
      <span
        className="flex cursor-pointer items-center gap-2 rounded-full border border-stone-500/15 px-6 py-2 capitalize contrast-125"
        style={{
          backgroundColor:
            activeTab === 'cost' ? 'var(--costBg)' : 'var(--priceBg)',
        }}
        onClick={() => addNewItem(type)}
      >
        <Plus className="w-4" /> Add New {type}
      </span>
    </div>
  )
}
