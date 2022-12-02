import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const initialState = {
  allListings: [],
  activeListings: [],
  completedListings: [],
  offers: []
};

export const listingSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    setAllListings: (state, action) => {
      const searchRes = state.allListings.filter(
        (item) =>
          item.listingDetails.tokenAddress ===
            action.payload.listingDetails.tokenAddress &&
          item.listingDetails.tokenId ===
            action.payload.listingDetails.tokenId
      );
      if(searchRes.length === 0){
        state.allListings = [...state.allListings, action.payload]
      }
      
    },
    setActiveListings: (state, action) => {
      state.activeListings = action.payload;
    },
    setCompletedListings: (state, action) => {
      state.completedListings = action.payload;
    },
    setOffers: (state, action) => {
      state.offers = action.payload
    },
    resetListings: (state) => {
      state.activeListings = [];
      state.allListings = [];
      state.completedListings = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setAllListings,
  setActiveListings,
  setCompletedListings,
  setOffers,
  resetListings,
} = listingSlice.actions;

export default listingSlice.reducer;
