import { v4 as uuidv4 } from 'uuid'
import type { Row } from '@/common/types'

const defaultProductData: Row[] = [
  {
    name: 'Item 1',
    unitCost: 0,
    unitPrice: 0,
    qty: 1,
    type: 'product',
    id: uuidv4(),
  },
  {
    name: 'Item 2',
    unitCost: 0,
    unitPrice: 0,
    qty: 1,
    type: 'product',
    id: uuidv4(),
  },
]

const defaultCostData: Row[] = [
  {
    name: 'Cost of Product',
    unitCost: 0,
    unitPrice: 0,
    qty: 1,
    type: 'cost',
    id: uuidv4(),
    children: [],
  },
  {
    name: 'Custom Clearance',
    unitCost: 0,
    unitPrice: 0,
    qty: 1,
    type: 'cost',
    id: uuidv4(),
  },
  {
    name: 'Fuel Surcharge',
    unitCost: 0,
    unitPrice: 0,
    qty: 1,
    type: 'cost',
    id: uuidv4(),
  },
  {
    name: 'Trucking',
    unitCost: 0,
    unitPrice: 0,
    qty: 1,
    type: 'cost',
    id: uuidv4(),
  },
]

export { defaultProductData, defaultCostData }
