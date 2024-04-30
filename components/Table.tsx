import { useMemo } from 'react'
import TableHeader from '@/components/TableHeader'
import Row from '@/components/Row'
import AddItemButtonProps from '@/components/AddItemButton'
import Bottom from '@/components/Bottom'
import { useStore } from '@/common/store'

export default function Table() {
  const activeTab = useStore((state) => state.activeTab)
  const costData = useStore((state) => state.costData)
  const productData = useStore((state) => state.productData)

  const costDataToShow = useMemo(() => {
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
        {costDataToShow.map((row, i) => {
          return (
            <div key={i} className="flex flex-col">
              <Row row={row} />
              {row.children?.map((child, j) => <Row key={j} row={child} />)}
              {!!row.children && <AddItemButtonProps type="product" />}
            </div>
          )
        })}
        <AddItemButtonProps type="cost" />
      </div>
      <div className={`flex-1 ${activeTab !== 'price' ? 'hidden' : ''}`}>
        {productData.map((row, i) => (
          <Row key={i} row={row} />
        ))}
        <AddItemButtonProps type="product" />
      </div>
      <Bottom />
    </div>
  )
}
