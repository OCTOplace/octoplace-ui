import { createSlice } from "@reduxjs/toolkit";
import { getAllMarketSettings } from "../thunk/getMarketSettings";
const initialState = {
  marketplaces: [],
  symbols:[],
  loading: false,
};

export const marketSettingsSlice = createSlice({
  name: "market-settings",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setMarketplaces: (state, action) => {
      state.marketplaces = action.payload;
    },
    setSymbols: (state, action) =>{
        state.symbols = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(getAllMarketSettings.pending, state => {
        state.loading = true;
    });

    builder.addCase(getAllMarketSettings.rejected, state => {
        state.loading = false;
    });
    builder.addCase(getAllMarketSettings.fulfilled, (state, action) => {
        state.marketplaces = action.payload;
        state.loading = false;
    })
  }
});

export const { setLoading, setMarketplaces, setSymbols } = marketSettingsSlice.actions;
export default marketSettingsSlice.reducer;