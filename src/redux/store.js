import { configureStore } from '@reduxjs/toolkit'
import  accountReducer  from './slices/accout-slice'
import appReducer from './slices/app-slice'
import myNftSlice from './slices/my-nft-slice'
export const store = configureStore({
  reducer: {
    account: accountReducer,
    app: appReducer,
    myNFT: myNftSlice
  },
})