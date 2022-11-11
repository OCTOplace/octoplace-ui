import { configureStore } from '@reduxjs/toolkit'
import  accountReducer  from './slices/accout-slice'

export const store = configureStore({
  reducer: {
    account: accountReducer
  },
})