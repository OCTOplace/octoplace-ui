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
      state.allListings = action.payload;
    },
    setActiveListings: (state, action) => {
      state.activeListings = [...state.activeListings, action.payload];
    },
    setCompletedListings: (state, action) => {
      state.completedListings = [...state.completedListings, action.payload];
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
