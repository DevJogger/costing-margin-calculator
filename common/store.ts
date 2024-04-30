import { create } from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { v4 as uuidv4 } from 'uuid'
import { defaultCostData, defaultProductData } from '@/common/defaultData'
import type { Row, Tab } from '@/common/types'

interface State {
  costData: Row[]
  productData: Row[]
  activeTab: Tab
  resetPopupSwitch: boolean
}

interface Actions {
  setTab: (activeTab: Tab) => void
  addNewItem: (type: 'cost' | 'product') => void
  updateItem: (
    target: 'name' | 'unitCost' | 'unitPrice' | 'qty',
    value: string | number,
    type: 'cost' | 'product',
    id: string,
  ) => void
  triggerResetPopup: () => void
  resetData: () => void
}

export const useStore = create<State & Actions>()((set) => ({
  costData: defaultCostData,
  productData: defaultProductData,
  activeTab: 'cost',
  resetPopupSwitch: false,
  setTab: (activeTab) => set({ activeTab }),
  addNewItem: (type) => {
    if (type === 'cost') {
      set((state) => ({
        costData: [
          ...state.costData,
          {
            name: `Other Cost`,
            unitCost: 0,
            unitPrice: 0,
            qty: 1,
            type: 'cost',
            id: uuidv4(),
          },
        ],
      }))
      return
    }
    set((state) => ({
      productData: [
        ...state.productData,
        {
          name: `Item ${state.productData.length + 1}`,
          unitCost: 0,
          unitPrice: 0,
          qty: 1,
          type: 'product',
          id: uuidv4(),
        },
      ],
    }))
  },
  updateItem: (target, value, type, id) => {
    set((state) => {
      if (type === 'cost') {
        const costData = state.costData.map((row) => {
          if (row.id === id) {
            return {
              ...row,
              [target]: value,
            }
          }
          return row
        })
        return { costData }
      }
      const productData = state.productData.map((row) => {
        if (row.id === id) {
          return {
            ...row,
            [target]: value,
          }
        }
        return row
      })
      return { productData }
    })
  },
  triggerResetPopup: () => set((state) => ({ resetPopupSwitch: !state.resetPopupSwitch })),
  resetData: () => set({ costData: defaultCostData, productData: defaultProductData }),
}))

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Store', useStore)
}
