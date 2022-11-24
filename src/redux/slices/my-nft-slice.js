import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  nftCollections: [],
  nfts: []
}

export const myNFTSlice = createSlice({
  name: 'myNFT',
  initialState,
  reducers: {
    addNFTCollection: (state, action) => {
      state.nftCollections = [...state.nftCollections, action.payload];
    },
    addNFT: (state, action) => {
        state.nfts = [...state.nfts, action.payload]
    },
    resetCollections: (state) => {
        state.nftCollections = [];
        state.nfts = [];
    }
  },
})

// Action creators are generated for each case reducer function
export const { addNFTCollection,resetCollections, addNFT } = myNFTSlice.actions

export default myNFTSlice.reducer