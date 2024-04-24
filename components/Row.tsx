import { useState, useMemo, useEffect } from 'react'
import { showAsMoney } from '@/common/helperFunctions'

interface RowProps {
  defaultName: string
  updateSum: (index: number, value: number) => void
  index: number
}

export default function Row({ defaultName, updateSum, index }: RowProps) {
  const [rowName, setRowName] = useState(defaultName)
  const [unit, setUnit] = useState(0)
  const [qty, setQty] = useState(0)
  const total = useMemo(() => {
    return unit * qty
  }, [unit, qty])

  useEffect(() => {
    updateSum(index, total)
  }, [total, updateSum, index])

  return (
    <div className="flex h-16 items-center odd:backdrop-contrast-75 even:backdrop-contrast-125">
      <input
        className="mx-1 w-32 bg-transparent text-center focus:outline-purple-600 truncate"
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
        onChange={(e) => setUnit(Number(e.target.value))}
      />
      <input
        className="w-0 flex-1 bg-transparent text-center focus:outline-purple-600"
        type="number"
        inputMode="decimal"
        value={qty}
        onFocus={(e) => e.target.select()}
        onChange={(e) => setQty(Number(e.target.value))}
      />
      <div className="flex-1 text-center">{showAsMoney(total)}</div>
    </div>
  )
}
