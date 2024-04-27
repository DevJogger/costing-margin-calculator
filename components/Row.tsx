import { useState, useMemo, useEffect } from 'react'
import { showAsMoney } from '@/common/helperFunctions'

interface RowProps {
  defaultName: string
  updateSum: (index: number, value: number) => void
  index: number
}

export default function Row({ defaultName, updateSum, index }: RowProps) {
  const [rowName, setRowName] = useState(defaultName)
  const [unit, setUnit] = useState<number | undefined>(0)
  const [qty, setQty] = useState<number | undefined>(0)
  const total = useMemo(() => {
    if (!unit || !qty) return 0
    return unit * qty
  }, [unit, qty])

  useEffect(() => {
    updateSum(index, total)
  }, [total, updateSum, index])

  return (
    <div className="flex h-16 items-center hover:backdrop-brightness-95 border-t border-stone-50/15">
      <input
        className="mx-1 w-32 truncate bg-transparent text-center focus:outline-purple-600"
        type="text"
        inputMode="text"
        value={rowName}
        onFocus={(e) => e.target.select()}
        onChange={(e) => setRowName(e.target.value)}
      />
      <input
        className="w-0 flex-1 bg-transparent text-center focus:outline-purple-600"
        type="number"
        inputMode="decimal"
        value={unit}
        onFocus={(e) => e.target.select()}
        onChange={(e) =>
          setUnit(e.target.value === '' ? undefined : Number(e.target.value))
        }
        onBlur={(e) => (e.target.value === '' ? setUnit(0) : null)}
      />
      <input
        className="w-0 flex-1 bg-transparent text-center focus:outline-purple-600"
        type="number"
        inputMode="decimal"
        value={qty}
        onFocus={(e) => e.target.select()}
        onChange={(e) =>
          setQty(e.target.value === '' ? undefined : Number(e.target.value))
        }
        onBlur={(e) => (e.target.value === '' ? setUnit(0) : null)}
      />
      <div className="flex-1 text-center">{showAsMoney(total)}</div>
    </div>
  )
}
