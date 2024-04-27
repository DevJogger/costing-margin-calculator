import { useState, useCallback, useEffect, useMemo } from 'react'
import TableHead from '@/components/TableHead'
import Row from '@/components/Row'

interface CostPageProps {
  setCostTotal: (value: number) => void
  hidden: boolean
}

const ROWS = [
  { defaultName: 'Cost of Product', sum: 0 },
  { defaultName: 'Custom Clearance', sum: 0 },
  { defaultName: 'Fuel Surcharge', sum: 0 },
  { defaultName: 'Trucking', sum: 0 },
]

export default function CostPage({ setCostTotal, hidden }: CostPageProps) {
  const [rows, setRows] = useState(ROWS)
  const costSumList = useMemo(() => rows.map((el) => el.sum), [rows])
  const updateCostSum = useCallback((index: number, value: number) => {
    setRows((prev) => {
      const next = [...prev]
      next[index].sum = value
      return next
    })
  }, [])
  useEffect(() => {
    setCostTotal(costSumList.reduce((pre, cur) => pre + cur))
  }, [costSumList, setCostTotal])
  const addNewItem = () => {
    setRows((prev) => [...prev, { defaultName: `Other Cost`, sum: 0 }])
  }
  return (
    <div
      className={`flex-1 flex-col justify-between ${hidden ? 'hidden' : 'flex'}`}
      style={{ backgroundColor: 'var(--costBg)', color: 'var(--costText)' }}
    >
      <TableHead title={['', 'Unit Cost', 'Qty', 'TTL Cost']} />
      <section className="flex-1">
        {rows.map((el, i) => (
          <Row
            key={i}
            index={i}
            defaultName={el.defaultName}
            updateSum={updateCostSum}
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
