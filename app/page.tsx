'use client'
import { useStore } from '@/common/store'
import Table from '@/components/Table'
import MarginTab from '@/components/MarginTab'
import TabBar from '@/components/TabBar'

export default function Home() {
  const activeTab = useStore((state) => state.activeTab)

  return (
    <>
      <TabBar />
      <main className="flex flex-1 flex-col justify-between">
        <Table />
        <MarginTab hidden={activeTab !== 'margin'} />
      </main>
    </>
  )
}
