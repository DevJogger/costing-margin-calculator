'use client'
import { useState, useMemo } from 'react'
import CostPage from '@/components/CostPage'
import PricePage from '@/components/PricePage'
import MarginPage from '@/components/MarginPage'
import TabBar from '@/components/TabBar'
import type { Tab } from '@/common/types'

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
    <main
      className="flex h-dvh flex-col justify-between"
      style={
        {
          '--costBg': '#FFB000',
          '--priceBg': '#1F5937',
          '--marginBg': '#F7EED2',
          '--costText': '#1F5937',
          '--priceText': '#F7EED2',
          '--marginText': '#1F5937',
        } as React.CSSProperties
      }
    >
      <TabBar
        onTabClick={onTabClick}
        costTotal={costTotal}
        priceTotal={priceTotal}
        marginTotal={marginTotal}
      />
      <CostPage setCostTotal={setCostTotal} hidden={page !== 'cost'} />
      <PricePage setPriceTotal={setPriceTotal} hidden={page !== 'price'} />
      <MarginPage hidden={page !== 'margin'} />
    </main>
  )
}
