'use client'
import { useState, useMemo } from 'react'
import CostPage from '@/components/CostPage'
import PricePage from '@/components/PricePage'
import MarginPage from '@/components/MarginPage'
import TabBar from '@/components/TabBar'
import { type Tab } from '@/types/Tabs'

export default function Home() {
  const [page, setPage] = useState<Tab>('cost')
  const [costSum, setCostSum] = useState(0)
  const [priceSum, setPriceSum] = useState(0)
  const marginSum = useMemo(() => priceSum - costSum, [priceSum, costSum])
  const onTabClick = (tab: Tab) => setPage(tab)
  return (
    <main className="flex h-dvh flex-col justify-between">
      <CostPage setCostSum={setCostSum} hidden={page !== 'cost'} />
      <PricePage setPriceSum={setPriceSum} hidden={page !== 'price'} />
      <MarginPage hidden={page !== 'margin'} />
      <TabBar
        onTabClick={onTabClick}
        costSum={costSum}
        priceSum={priceSum}
        marginSum={marginSum}
      />
    </main>
  )
}
