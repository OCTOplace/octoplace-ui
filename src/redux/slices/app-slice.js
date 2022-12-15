import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  nftAddressList: [],
  isLoading: false,
  isLoadingOffers: false,
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
    }
  },
  
})

// Action creators are generated for each case reducer function
export const { setAddressList , setLoading, setOffersLoading} = appSlice.actions

export default appSlice.reducer