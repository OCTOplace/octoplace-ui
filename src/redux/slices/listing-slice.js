import { createSlice } from "@reduxjs/toolkit";
import { getActiveListingsFromLoggingAPI } from "../thunk/get-active-listings";
import { getSelectedListing } from "../thunk/getSelectedListing";

const initialState = {
  allListings: [],
  activeListings: [],
  newActiveListings:[],
  selectedListing: undefined,
  completedListings: [],
  offers: [],
  selectedTab: 0,
  isLoading: false
};

export const listingSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    setAllListings: (state, action) => {
      const searchRes = state.allListings.filter(
        (item) =>
          item.listingDetails.tokenAddress.toLowerCase() ===
            action.payload.listingDetails.tokenAddress.toLowerCase() &&
          item.listingDetails.tokenId ===
            action.payload.listingDetails.tokenId &&
          item.listingDetails.listingid ===
            action.payload.listingDetails.listingid
      );
      if (searchRes.length === 0) {
        state.allListings = [...state.allListings, action.payload];
      }
    },
    setActiveListings: (state, action) => {
      state.activeListings = action.payload;
    },
    
    setCompletedListings: (state, action) => {
      state.completedListings = action.payload;
    },
    setOffers: (state, action) => {
      state.offers = action.payload;
    },
    resetListings: (state) => {
      state.activeListings = [];
      state.allListings = [];
      state.completedListings = [];
    },
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
    setSelectedListing: (state) => {
      state.selectedListing = undefined
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getActiveListingsFromLoggingAPI.fulfilled, (state, action) => {
      console.log("fulfilled")
      state.newActiveListings = action.payload
      state.isLoading = false
    })
    builder.addCase(getActiveListingsFromLoggingAPI.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getSelectedListing.fulfilled, (state, action) => {
      state.selectedListing = action.payload
      state.isLoading = false
    })
    builder.addCase(getSelectedListing.pending, (state) =>{
      state.isLoading = true
    })
    builder.addCase(getSelectedListing.rejected, (state) =>{
      state.selectedListing = undefined
      state.isLoading = false
    })
  }
});

// Action creators are generated for each case reducer function
export const {
  setAllListings,
  setActiveListings,
  setCompletedListings,
  setOffers,
  resetListings,
  setSelectedTab,
  setSelectedListing
} = listingSlice.actions;

export default listingSlice.reducer;
