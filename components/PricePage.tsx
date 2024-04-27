import { useState, useCallback, useEffect, useMemo } from 'react'
import TableHead from '@/components/TableHead'
import Row from '@/components/Row'

interface PricePageProps {
  setPriceTotal: (value: number) => void
  hidden: boolean
}

const ROWS = [
  { defaultName: 'Item 1', sum: 0 },
  { defaultName: 'Item 2', sum: 0 },
]

export default function PricePage({ setPriceTotal, hidden }: PricePageProps) {
  const [rows, setRows] = useState(ROWS)
  const priceSumList = useMemo(() => rows.map((el) => el.sum), [rows])
  const updatePriceSum = useCallback((index: number, value: number) => {
    setRows((prev) => {
      const next = [...prev]
      next[index].sum = value
      return next
    })
  }, [])
  useEffect(() => {
    setPriceTotal(priceSumList.reduce((pre, cur) => pre + cur))
  }, [priceSumList, setPriceTotal])
  const addNewItem = () => {
    setRows((prev) => [
      ...prev,
      { defaultName: `Item ${prev.length + 1}`, sum: 0 },
    ])
  }
  return (
    <div
      className={`flex-1 flex-col justify-between ${hidden ? 'hidden' : 'flex'}`}
      style={{ backgroundColor: 'var(--priceBg)', color: 'var(--priceText)' }}
    >
      <TableHead title={['', 'Unit Price', 'Qty', 'TTL Revenue']} />
      <section className="flex-1 overflow-scroll">
        {rows.map((el, i) => (
          <Row
            key={i}
            index={i}
            defaultName={el.defaultName}
            updateSum={updatePriceSum}
          />
        ))}
        <div
          className="flex h-16 items-center justify-center text-sm"
          onClick={addNewItem}
        >
          <span className="rounded-full border px-6 py-2 backdrop-saturate-150">
            + Add New Item
          </span>
        </div>
      </section>
    </div>
  )
}
