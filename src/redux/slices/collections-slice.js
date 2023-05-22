import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllCollections } from "../thunk/getAllCollections";

const initialState = {
  isLoading: false,
  collections: [],
  selectedCollection: {},
  selectedCollectionSetting: {}
};

export const collectionsSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setCollections: (state, action) => {
      state.collections = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCollections.pending, (state) => {
        state.isLoading = true;
    })
    builder.addCase(getAllCollections.fulfilled, (state, {payload}) => {
        state.collections = payload;
        state.isLoading = false;
    })
    builder.addCase(getAllCollections.rejected, (state) => {
        state.isLoading = false;
        toast.error("Error occured while loading markets.")
    })
//     builder.addCase(getMarketNFTDetail.fulfilled, (state, {payload}) => {
        
//         const listingId = payload.listingId;
//         const objIndex = state.markets.findIndex((obj => obj.Id === listingId));
//         let items = state.markets;
//         let item = items[objIndex];
//         item = {
//             ...item,
//             nftDetails: payload.nft
//         }
//         console.log("item", item)
//         items[objIndex] = item;
//         state.markets = items;
//     });
//     builder.addCase(getMarketNFTDetail.rejected, (state) => {
        
//         toast.error("Error occured while loading NFT Details.")
//     })
    }
});

// Action creators are generated for each case reducer function
export const { setLoading, setCollections } = collectionsSlice.actions;

export default collectionsSlice.reducer;
