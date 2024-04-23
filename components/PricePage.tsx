import { useState, useCallback, useEffect } from 'react'
import HeadBar from '@/components/HeadBar'
import Row from '@/components/Row'

interface PricePageProps {
  setPriceSum: (value: number) => void
  hidden: boolean
}

const ROW = ['Item 1']

export default function PricePage({ setPriceSum, hidden }: PricePageProps) {
  const [priceList, setPriceList] = useState([0])
  const updatePriceSum = useCallback(
    (index: number, value: number) => {
      setPriceList((prev) => {
        const next = [...prev]
        next[index] = value
        return next
      })
    },
    [setPriceList],
  )
  useEffect(() => {
    setPriceSum(priceList.reduce((pre, cur) => pre + cur))
  }, [priceList, setPriceSum])
  return (
    <div
      className={`flex-1 flex-col justify-between bg-cyan-700 text-white ${hidden ? 'hidden' : 'flex'}`}
    >
      <HeadBar title={['', 'Unit Price', 'Qty', 'TTL Revenue']} />
      <section className="flex-1 overflow-scroll">
        {ROW.map((title, i) => (
          <Row key={i} id={i} title={title} updateSum={updatePriceSum} />
        ))}
      </section>
    </div>
  )
}
