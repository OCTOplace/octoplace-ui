import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  nftAddressList: []
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAddressList: (state, action) => {
      state.nftAddressList = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAddressList } = appSlice.actions

export default appSlice.reducer