import { useMemo } from 'react'
import { useStore } from '@/common/store'
import TableHeader from '@/components/TableHeader'
import Row from '@/components/Row'
import AddItemButton from '@/components/AddItemButton'
import Bottom from '@/components/Bottom'
import ResetPopup from '@/components/ResetPopup'

export default function Table() {
  const activeTab = useStore((state) => state.activeTab)
  const costData = useStore((state) => state.costData)
  const productData = useStore((state) => state.productData)
  const resetPopupSwitch = useStore((state) => state.resetPopupSwitch)

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
      className="flex flex-1 flex-col justify-between"
      style={{
        backgroundColor:
          activeTab === 'cost' ? 'var(--costBg)' : 'var(--priceBg)',
        color: activeTab === 'cost' ? 'var(--costText)' : 'var(--priceText)',
      }}
    >
      <TableHeader />
      {activeTab === 'cost' && (
        <div className="flex-1">
          {costDataToShow.map((row, i) => {
            return (
              <div key={i} className="flex flex-col">
                <Row row={row} />
                {row.children?.map((child, j) => <Row key={j} row={child} />)}
                {!!row.children && <AddItemButton type="product" />}
              </div>
            )
          })}
          <AddItemButton type="cost" />
        </div>
      )}
      {activeTab === 'price' && (
        <div className="flex-1">
          {productData.map((row, i) => (
            <Row key={i} row={row} />
          ))}
          <AddItemButton type="product" />
        </div>
      )}
      <Bottom />
      {resetPopupSwitch && <ResetPopup />}
    </div>
  )
}
