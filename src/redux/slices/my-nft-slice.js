import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  nftCollections: [],
  nfts: [],
  nftListings: [],
  offers: [],
  ownerAddress: "noowner"
}

export const myNFTSlice = createSlice({
  name: 'myNFT',
  initialState,
  reducers: {
    addNFTCollection: (state, action) => {
      state.nftCollections = action.payload;
    },
    addNFT: (state, action) => {
        state.nfts = action.payload
    },
    addMyListings: (state, action) => {
      state.nftListings = action.payload
    },
    resetCollections: (state) => {
        state.nftCollections = [];
        state.nfts = [];
        state.nftListings = [];
        state.ownerAddress = "noower";
    },
    setMyNftLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setOwner: (state, action) => {
      state.ownerAddress = action.payload
    },
    setMyOffers: (state, action) => {
      state.offers = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { addNFTCollection,resetCollections, addNFT, addMyListings,setMyNftLoading, setMyOffers,setOwner} = myNFTSlice.actions

export default myNFTSlice.reducer