import { useStore } from '@/common/store'

export default function ResetPopup() {
  const triggerResetPopup = useStore((state) => state.triggerResetPopup)
  const resetData = useStore((state) => state.resetData)

  const handleConfirmOnClick = () => {
    resetData()
    triggerResetPopup()
  }

  return (
    <div className="fixed left-0 top-0 z-50 flex h-dvh w-full items-center justify-center bg-black/25">
      <div className="rounded-lg bg-white p-4 drop-shadow-md">
        <div className="text-center text-xl font-bold">Reset All?</div>
        <div className="mt-4 flex justify-center gap-2">
          <button
            className="w-24 rounded-md bg-gray-200 px-4 py-2"
            onClick={handleConfirmOnClick}
          >
            Yes
          </button>
          <button
            className="w-24 rounded-md bg-gray-200 px-4 py-2"
            onClick={triggerResetPopup}
          >
            No
          </button>
        </div>
      </div>
    </div>
  )
}
