'use client'
import { useState, useCallback } from 'react'
import HeadBar from '@/components/HeadBar'
import Row from '@/components/Row'
import { showAsMoney } from '@/common/helperFunctions'

export default function Home() {
  const [costSum, setCostSum] = useState([0, 0, 0, 0])
  const priceSum = 2000
  const marginSum = 1000

  const ROW = [
    'Cost of Product',
    'Custom Clearance',
    'Fuel Surcharge',
    'Trucking',
  ]
  const updateCostSum = useCallback(
    (index: number, value: number) => {
      setCostSum((prev) => {
        const next = [...prev]
        next[index] = value
        return next
      })
    },
    [setCostSum],
  )
  return (
    <main className="flex h-dvh flex-col justify-between bg-purple-800 text-white">
      <HeadBar title={['', 'Unit Cost', 'Qty', 'TTL Cost']} />
      <section className="flex-1 overflow-scroll">
        {ROW.map((title, i) => (
          <Row key={i} id={i} title={title} updateCostSum={updateCostSum} />
        ))}
      </section>
      <footer className="flex h-16 gap-1 bg-white pb-2 dark:bg-stone-900">
        <div className="flex flex-1 flex-col justify-center truncate rounded-b-xl bg-purple-800 px-2 leading-tight text-white">
          <span>Cost</span>
          <span>{showAsMoney(costSum.reduce((pre, cur) => pre + cur))}</span>
        </div>
        <div className="flex flex-1 flex-col justify-center truncate rounded-b-xl bg-cyan-700 px-2 leading-tight text-white">
          <span>Price</span>
          <span>{showAsMoney(priceSum)}</span>
        </div>
        <div className="flex flex-1 flex-col justify-center truncate rounded-b-xl bg-pink-800 px-2 leading-tight text-white">
          <span>Margin</span>
          <span>{showAsMoney(marginSum)}</span>
        </div>
      </footer>
    </main>
  )
}
