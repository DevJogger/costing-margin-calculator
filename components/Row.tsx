import { useRef, useMemo } from 'react'
import { useStore } from '@/common/store'
import { showAsMoney } from '@/common/helperFunctions'
import type { Row as RowType } from '@/common/types'
import { Trash2 } from 'lucide-react'
interface RowProps {
  row: RowType
}

export default function Row({ row }: RowProps) {
  const rowRef = useRef<HTMLDivElement>(null)

  const activeTab = useStore((state) => state.activeTab)
  const productData = useStore((state) => state.productData)
  const updateItem = useStore((state) => state.updateItem)
  const deleteItem = useStore((state) => state.deleteItem)

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

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = event.currentTarget.scrollLeft
    if (scrollLeft === window.innerWidth) {
      setTimeout(() => {
        rowRef.current?.scroll({ left: 0 })
        deleteItem(row.type, row.id)
      }, 200)
    }
  }

  return (
    <div
      ref={rowRef}
      className="no-scrollbar flex h-14 w-full snap-x snap-mandatory flex-row items-center overflow-scroll border-t border-stone-50/15"
      onScroll={handleScroll}
    >
      <div className="flex w-full flex-none snap-start snap-always">
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
      {!isMainRow && (
        <>
          <div className="flex h-full w-full flex-none snap-end snap-always items-center bg-red-700 px-8 text-white">
            <Trash2 />
          </div>
        </>
      )}
    </div>
  )
}
