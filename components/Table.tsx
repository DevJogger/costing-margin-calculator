import { useMemo } from 'react'
import TableHeader from '@/components/TableHeader'
import Row from '@/components/Row'
import { useStore } from '@/common/store'

export default function Table() {
  const activeTab = useStore((state) => state.activeTab)
  const costData = useStore((state) => state.costData)
  const productData = useStore((state) => state.productData)
  const addNewItem = useStore((state) => state.addNewItem)

  const costTabData = useMemo(() => {
    return costData.map((row) => {
      if (!row.children) {
        return row
      }
      return {
        ...row,
        children: productData,
      }
    })
  }, [costData, productData])
  return (
    <div
      className={`flex-1 flex-col justify-between ${activeTab === 'margin' ? 'hidden' : 'flex'}`}
      style={{
        backgroundColor:
          activeTab === 'cost' ? 'var(--costBg)' : 'var(--priceBg)',
        color: activeTab === 'cost' ? 'var(--costText)' : 'var(--priceText)',
      }}
    >
      <TableHeader />
      <div className={`flex-1 ${activeTab !== 'cost' ? 'hidden' : ''}`}>
        {costTabData.map((row, i) => {
          return (
            <div key={i} className="flex flex-col">
              <Row row={row} />
              {row.children?.map((child, j) => <Row key={j} row={child} />)}
            </div>
          )
        })}
        <div className="flex h-16 items-center justify-center text-sm">
          <span
            className="cursor-pointer rounded-full border border-stone-500/15 px-6 py-2 backdrop-brightness-105"
            onClick={() => addNewItem('cost')}
          >
            + Add New Cost
          </span>
        </div>
      </div>
      <div className={`flex-1 ${activeTab !== 'price' ? 'hidden' : ''}`}>
        {productData.map((row, i) => (
          <Row key={i} row={row} />
        ))}
        <div className="flex h-16 items-center justify-center text-sm">
          <span
            className="cursor-pointer rounded-full border border-stone-500/15 px-6 py-2 backdrop-brightness-105"
            onClick={() => addNewItem('product')}
          >
            + Add New Product
          </span>
        </div>
      </div>
    </div>
  )
}
