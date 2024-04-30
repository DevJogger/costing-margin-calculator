import { Trash2 } from 'lucide-react'
import { useStore } from '@/common/store'
import ResetPopup from '@/components/ResetPopup'

export default function Bottom() {
  const activeTab = useStore((state) => state.activeTab)
  const resetPopupSwitch = useStore((state) => state.resetPopupSwitch)
  const triggerResetPopup = useStore((state) => state.triggerResetPopup)
  return (
    <div
      className="sticky bottom-0 z-10 flex h-14 items-center justify-end px-4 drop-shadow-[0_-1px_1px_rgba(0,0,0,0.05)]"
      style={{
        backgroundColor:
          activeTab === 'cost' ? 'var(--costBg)' : 'var(--priceBg)',
      }}
    >
      <Trash2 onClick={triggerResetPopup} />
      {resetPopupSwitch && <ResetPopup />}
    </div>
  )
}
