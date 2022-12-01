import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allListings: [],
  activeListings: [],
  completedListings: [],
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
  resetListings,
} = listingSlice.actions;

export default listingSlice.reducer;
