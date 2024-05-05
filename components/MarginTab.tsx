import { useMemo } from 'react'
import { useStore } from '@/common/store'
import { showAsMoney } from '@/common/helperFunctions'

export default function MarginTab() {
  const costData = useStore((state) => state.costData)
  const productData = useStore((state) => state.productData)

  const costTotal = useMemo(() => {
    return (
      costData.reduce((pre, cur) => pre + cur?.unitCost * cur?.qty, 0) +
      productData.reduce((pre, cur) => pre + cur?.unitCost * cur?.qty, 0)
    )
  }, [costData, productData])
  const priceTotal = useMemo(() => {
    return productData.reduce((pre, cur) => pre + cur?.unitPrice * cur?.qty, 0)
  }, [productData])
  const marginTotal = useMemo(
    () => priceTotal - costTotal,
    [priceTotal, costTotal],
  )

  return (
    <div
      className="flex flex-1 p-8 text-2xl"
      style={{ backgroundColor: 'var(--marginBg)', color: 'var(--marginText)' }}
    >
      <div className="flex w-full flex-col">
        <span className="">Gross Margin $</span>
        <span className="flex justify-center text-5xl font-semibold leading-loose">
          {showAsMoney(marginTotal)}
        </span>
        <span className="">Gross Margin %</span>
        <span className="flex justify-center text-5xl font-semibold leading-loose">
          {priceTotal === 0 ? 0 : ((marginTotal / priceTotal) * 100).toFixed(2)}
          %
        </span>
      </div>
    </div>
  )
}
