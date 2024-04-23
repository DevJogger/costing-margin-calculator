import { useState, useCallback, useEffect } from 'react'
import HeadBar from '@/components/HeadBar'
import Row from '@/components/Row'

interface CostPageProps {
  setCostSum: (value: number) => void
  hidden: boolean
}

const ROW = [
  'Cost of Product',
  'Custom Clearance',
  'Fuel Surcharge',
  'Trucking',
]

export default function CostPage({ setCostSum, hidden }: CostPageProps) {
  const [costList, setCostList] = useState([0, 0, 0, 0])
  const updateCostSum = useCallback(
    (index: number, value: number) => {
      setCostList((prev) => {
        const next = [...prev]
        next[index] = value
        return next
      })
    },
    [setCostList],
  )
  useEffect(() => {
    setCostSum(costList.reduce((pre, cur) => pre + cur))
  }, [costList, setCostSum])
  return (
    <div
      className={`flex-1 flex-col justify-between bg-purple-800 text-white ${hidden ? 'hidden' : 'flex'}`}
    >
      <HeadBar title={['', 'Unit Cost', 'Qty', 'TTL Cost']} />
      <section className="flex-1 overflow-scroll">
        {ROW.map((title, i) => (
          <Row key={i} id={i} title={title} updateSum={updateCostSum} />
        ))}
      </section>
    </div>
  )
}
