'use client'
import { useState, useMemo, useEffect } from 'react'
import { showAsMoney } from '@/common/helperFunctions'

interface RowProps {
  title: string
  updateCostSum: (index: number, value: number) => void
  id: number
}

export default function Row({ title, updateCostSum, id }: RowProps) {
  const [unit, setUnit] = useState(0)
  const [qty, setQty] = useState(0)
  const total = useMemo(() => {
    return unit * qty
  }, [unit, qty])

  useEffect(() => {
    updateCostSum(id, total)
  }, [total, updateCostSum, id])

  return (
    <div className="flex h-16 items-center odd:backdrop-contrast-75 even:backdrop-contrast-125">
      <div className="flex-1 text-center">{title}</div>
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
