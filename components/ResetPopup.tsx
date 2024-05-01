import { useStore } from '@/common/store'

export default function ResetPopup() {
  const triggerResetPopup = useStore((state) => state.triggerResetPopup)
  const resetData = useStore((state) => state.resetData)

  const handleConfirmOnClick = () => {
    resetData()
    triggerResetPopup()
  }

  return (
    <div className="fixed left-0 top-0 z-50 flex h-dvh w-full items-center justify-center bg-black/15 backdrop-blur-sm">
      <div
        className="rounded-lg p-4 drop-shadow-md"
        style={{
          backgroundColor: 'var(--marginBg)',
          color: 'var(--marginText)',
        }}
      >
        <div className="text-center text-xl font-bold">Reset All?</div>
        <div className="mt-4 flex justify-center gap-2">
          <button
            className="w-24 rounded-md px-4 py-2 backdrop-brightness-110"
            style={{color: 'var(--marginNegativeText)',}}
            onClick={handleConfirmOnClick}
          >
            Reset
          </button>
          <button
            className="w-24 rounded-md px-4 py-2 backdrop-brightness-110"
            onClick={triggerResetPopup}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
