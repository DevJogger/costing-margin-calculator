import { useMemo } from 'react'
import { useStore } from '@/common/store'
import { showAsMoney } from '@/common/helperFunctions'
import type { Row as RowType } from '@/common/types'
interface RowProps {
  row: RowType
}

export default function Row({ row }: RowProps) {
  const activeTab = useStore((state) => state.activeTab)
  const productData = useStore((state) => state.productData)
  const updateItem = useStore((state) => state.updateItem)

  const total = useMemo(() => {
    const unit = activeTab === 'cost' ? row.unitCost : row.unitPrice
    if (!unit || !row.qty) return 0
    return unit * row.qty
  }, [activeTab, row.unitCost, row.unitPrice, row.qty])

  const productTotalCost = useMemo(() => {
    return productData.reduce(
      (pre, cur) => pre + (cur?.unitCost ?? 0) * (cur?.qty ?? 0),
      0,
    )
  }, [productData])

  const isMainRow = !!('children' in row)

  const handleNameInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateItem('name', e.target.value, row.type, row.id)
  }

  const handleUnitInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateItem(
      activeTab === 'cost' ? 'unitCost' : 'unitPrice',
      e.target.value === '' ? '' : Number(e.target.value),
      row.type,
      row.id,
    )
  }
  const handleUnitInputOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    updateItem(
      activeTab === 'cost' ? 'unitCost' : 'unitPrice',
      e.target.value === '' ? 0 : Number(e.target.value),
      row.type,
      row.id,
    )
  }

  const handleQtyInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateItem(
      'qty',
      e.target.value === '' ? '' : Number(e.target.value),
      row.type,
      row.id,
    )
  }
  const handleQtyInputOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    updateItem(
      'qty',
      e.target.value === '' ? 0 : Number(e.target.value),
      row.type,
      row.id,
    )
  }

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      e.currentTarget.blur()
    }
  }

  return (
    <div className="flex h-14 items-center border-t border-stone-50/15 hover:backdrop-brightness-95">
      <input
        className="mx-1 w-32 truncate bg-transparent text-center"
        type="text"
        inputMode="text"
        value={row.name}
        onFocus={(e) => e.target.select()}
        onChange={handleNameInputOnChange}
        onKeyDown={handleOnKeyDown}
      />
      {isMainRow ? (
        <div className="flex-1 text-center"></div>
      ) : (
        <input
          className="w-0 flex-1 bg-transparent text-center"
          type="number"
          inputMode="decimal"
          value={activeTab === 'cost' ? row.unitCost : row.unitPrice}
          onFocus={(e) => e.target.select()}
          onChange={handleUnitInputOnChange}
          onBlur={handleUnitInputOnBlur}
          onKeyDown={handleOnKeyDown}
        />
      )}
      {isMainRow ? (
        <div className="flex-1 text-center"></div>
      ) : (
        <input
          className="w-0 flex-1 bg-transparent text-center"
          type="number"
          inputMode="decimal"
          value={row.qty}
          onFocus={(e) => e.target.select()}
          onChange={handleQtyInputOnChange}
          onBlur={handleQtyInputOnBlur}
          onKeyDown={handleOnKeyDown}
        />
      )}
      <div className="flex-1 text-center">
        {!isMainRow ? showAsMoney(total) : showAsMoney(productTotalCost)}
      </div>
    </div>
  )
}
