import { FileX2 } from 'lucide-react'
import { useStore } from '@/common/store'

export default function Bottom() {
  const activeTab = useStore((state) => state.activeTab)
  const triggerResetPopup = useStore((state) => state.triggerResetPopup)
  return (
    <div
      className="fixed bottom-8 right-4 z-10 grid h-12 w-12 place-items-center rounded-full contrast-150 drop-shadow-[0_-1px_1px_rgba(0,0,0,0.05)]"
      style={{
        backgroundColor:
          activeTab === 'cost' ? 'var(--costBg)' : 'var(--priceBg)',
      }}
    >
      <FileX2 onClick={triggerResetPopup} />
    </div>
  )
}
