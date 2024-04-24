'use client'
import { useState, useMemo } from 'react'
import CostPage from '@/components/CostPage'
import PricePage from '@/components/PricePage'
import MarginPage from '@/components/MarginPage'
import TabBar from '@/components/TabBar'
import { type Tab } from '@/types/Tabs'

export default function Home() {
  const [page, setPage] = useState<Tab>('cost')
  const [costTotal, setCostTotal] = useState(0)
  const [priceTotal, setPriceTotal] = useState(0)
  const marginTotal = useMemo(
    () => priceTotal - costTotal,
    [priceTotal, costTotal],
  )
  const onTabClick = (tab: Tab) => setPage(tab)
  return (
    <main className="flex h-dvh flex-col justify-between">
      <CostPage setCostTotal={setCostTotal} hidden={page !== 'cost'} />
      <PricePage setPriceTotal={setPriceTotal} hidden={page !== 'price'} />
      <MarginPage hidden={page !== 'margin'} />
      <TabBar
        onTabClick={onTabClick}
        costTotal={costTotal}
        priceTotal={priceTotal}
        marginTotal={marginTotal}
      />
    </main>
  )
}
