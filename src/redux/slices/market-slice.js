import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllMarketItems } from "../thunk/get-all-market-items";
import { getMyMarketItems } from "../thunk/get-all-market-items";
import { getMarketNFTDetail } from "../thunk/getNftDetail";
import { getSelectedMarketItem, updateSelectedMarketItem } from "../thunk/getSelectedMarketItem";

const initialState = {
  isLoading: false,
  markets: [],
  myMarketItems: [],
  selectedMarketItem: undefined
};

function updateMarket(marketItems, item) {
  // Iterate over the array
  marketItems.forEach((obj, index) => {
      // Check if the object matches the criteria for update
      if (obj.marketId === item.marketId && obj.network === item.network && obj.marketplace_Symbol === item.marketplace_Symbol) {
          // Update the object in the array
          marketItems[index] = item;
      }
  });

  return marketItems;
}

export const marketSlice = createSlice({
  name: "markets",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setMarkets: (state, action) => {
      state.markets = action.payload;
    },
    setMyMarketItems: (state, action) => {
      state.myMarketItems = action.payload;
    },
    resetSelectedMarket: (state) => {
      state.selectedMarketItem = undefined;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllMarketItems.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllMarketItems.fulfilled, (state, { payload }) => {
      state.markets = payload;
      state.isLoading = false;
    });
    builder.addCase(getAllMarketItems.rejected, (state) => {
      state.isLoading = false;
      toast.error("Error occured while loading markets.");
    });

    builder.addCase(getSelectedMarketItem.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSelectedMarketItem.fulfilled, (state, { payload }) => {
      state.selectedMarketItem = payload;
      state.isLoading = false;
    });
    builder.addCase(getSelectedMarketItem.rejected, (state) => {
      state.isLoading = false;
      state.selectedMarketItem = undefined;
      toast.error("Error occured while loading markets.");
    });

    builder.addCase(updateSelectedMarketItem.fulfilled, (state, action) => {
      let marketItems = state.markets;
      marketItems = updateMarket(marketItems, action.payload);
      state.markets = marketItems;
    });

    builder.addCase(getMyMarketItems.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMyMarketItems.fulfilled, (state, { payload }) => {
      state.myMarketItems = payload;
      state.isLoading = false;
    });
    builder.addCase(getMyMarketItems.rejected, (state) => {
      state.isLoading = false;
      toast.error("Error occured while loading my markets.");
    });

    builder.addCase(getMarketNFTDetail.fulfilled, (state, { payload }) => {
      const listingId = payload.listingId;
      const objIndex = state.markets.findIndex((obj) => obj.id === listingId);
      let items = state.markets;
      let item = items[objIndex];
      item = {
        ...item,
        nftDetails: payload.nft,
      };

      items[objIndex] = item;
      state.markets = items;
    });
    builder.addCase(getMarketNFTDetail.rejected, (state) => {
      toast.error("Error occured while loading NFT Details.");
    });
  },
});

// Action creators are generated for each case reducer function
export const { setLoading, setMarkets, resetSelectedMarket } = marketSlice.actions;

export default marketSlice.reducer;
