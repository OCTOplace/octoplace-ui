import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_LOGGING_API_URL;
export const updateSelectedMarketItem = createAsyncThunk(
  "market/updateSelectedMarketItem", async ({network, marketId, symbol}, thunkAPI) => {
    try{
      // const result = await axios.get(`${apiUrl}/marketplace/get-all`);
      const result = await axios.get(
        `${apiUrl}/api/market-place/get-market-item/${marketId}/${network}/${symbol}`
      );
        return result.data;
    }catch (error) {
      console.log("Error in getting item", error);
    }
    return [];
  }
)
export const getSelectedMarketItem = createAsyncThunk(
  "market/getSelectedMarketItem",
  async ({ network, tokenId, address }, thunkAPI) => {
    try {
      let items = [];
      // const result = await axios.get(`${apiUrl}/marketplace/get-all`);
      const result = await axios.get(
        `${apiUrl}/api/market-place/get-selected-market-item/${address}/${network}/${tokenId}`
      );
      items = result.data;
      if (items) {
        return items;
      }else {
        return thunkAPI.rejectWithValue(false);
      }
    } catch (error) {
      console.log("Error get All market items", error);
    }
    return [];
  }
);
