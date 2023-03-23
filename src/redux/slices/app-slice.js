import { createSlice } from '@reduxjs/toolkit'
import { getTxCharge } from '../thunk/get-txcharge'

const initialState = {
  nftAddressList: [],
  isLoading: false,
  isLoadingOffers: false,
  txCharge: 0,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAddressList: (state, action) => {
      state.nftAddressList = action.payload
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setOffersLoading: (state, action) => {
      state.isLoadingOffers = action.payload
    },
    setTxCharge: (state, action) => {
      state.txCharge = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getTxCharge.fulfilled, (state,{payload}) => {
      state.txCharge = payload;
    })
  }
})

// Action creators are generated for each case reducer function
export const { setAddressList , setLoading, setOffersLoading, setTxCharge} = appSlice.actions

export default appSlice.reducer