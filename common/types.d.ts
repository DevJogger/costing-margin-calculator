type Tab = 'cost' | 'price' | 'margin'
interface Row {
  name: string
  type: 'cost' | 'product'
  unitCost: number
  unitPrice: number
  qty: number
  id: string
  children?: Row[]
}

export type { Tab, Row }
