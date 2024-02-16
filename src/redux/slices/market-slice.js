import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllMarketItems } from "../thunk/get-all-market-items";
import { getMyMarketItems } from "../thunk/get-all-market-items";
import { getMarketNFTDetail } from "../thunk/getNftDetail";
import {
  getSelectedMarketItem,
  updateSelectedMarketItem,
} from "../thunk/getSelectedMarketItem";

const initialState = {
  isLoading: false,
  markets: [],
  myMarketItems: [],
  selectedMarketItem: undefined,
  totalCount: 0,
  currentPage: 1,
  nextPage: 1,
  hasMore: false,
};

function updateMarket(marketItems, item) {
  // Iterate over the array
  marketItems.forEach((obj, index) => {
    // Check if the object matches the criteria for update
    if (
      obj.marketId === item.marketId &&
      obj.network === item.network &&
      obj.marketplace_Symbol === item.marketplace_Symbol
    ) {
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
    setAddToMarkets: (state, action) => {
      for (let item of action.payload) {
        const found = state.markets.find(
          (x) =>
            x.marketId === item.marketId &&
            x.nftContract === item.nftContract &&
            x.tokenId === item.tokenId &&
            x.network === item.network && 
            x.marketplace_Symbol === item.marketplace_Symbol
        );

        if(!found){
          state.markets.push(item);
        }else{
          console.log("skipping as its found", found)
        }
      }
    },
    setMyMarketItems: (state, action) => {
      state.myMarketItems = action.payload;
    },
    resetSelectedMarket: (state) => {
      state.selectedMarketItem = undefined;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setNextPage: (state, action) => {
      state.nextPage = action.payload;
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
    setTotalCount: (state, action) => {
      state.hasMore = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllMarketItems.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllMarketItems.fulfilled, (state, { payload }) => {
      state.markets = payload.marketItems;
      state.totalCount = payload.total;
      if (state.totalCount > state.markets.length) {
        state.hasMore = true;
        state.nextPage = payload.pageNumber + 1;
      } else {
        state.hasMore = false;
      }
      state.currentPage = payload.pageNumber;
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
    builder.addCase(getSelectedMarketItem.rejected, (state, action) => {
      state.isLoading = false;
      state.selectedMarketItem = undefined;
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
    builder.addCase(getMarketNFTDetail.rejected, (state, { payload }) => {
      state.markets = state.markets.filter(
        (obj) =>
          obj.nftContract !== payload.nftDetails.contractAddress ||
          obj.tokenId !== payload.nftDetails.tokenId
      );
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  setLoading,
  setMarkets,
  resetSelectedMarket,
  setCurrentPage,
  setNextPage,
  setHasMore,
  setTotalCount,
  setAddToMarkets,
} = marketSlice.actions;

export default marketSlice.reducer;
