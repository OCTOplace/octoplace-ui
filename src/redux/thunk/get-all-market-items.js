import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_LOGGING_API_URL;

export const getAllMarketItems = createAsyncThunk(
  "market/getAllMarketItems",
  async ({ symbols, pageNumber }, thunkAPI) => {
    try {
      let items = [];
      // const result = await axios.get(`${apiUrl}/marketplace/get-all`);
      const result = await axios.post(
        `${apiUrl}/api/market-place/get-active-listings-by-page`,
        { symbols: symbols, pageSize: 18, pageNumber, sortBy: "desc" }
      );
      items = result.data;
      return {...items, pageNumber};
    } catch (error) {
      console.log("Error get All market items", error);
    }
    return [];
  }
);

export const getMyMarketItems = createAsyncThunk(
  "market/getMyMarketItems",
  async (address, thunkAPI) => {
    let items = [];
    // const result = await axios.get(`${apiUrl}/marketplace/get-all`);
    const result = await axios.get(
      `${apiUrl}/api/market-place/get-all-market-items/${address}`
    );
    items = result.data;
    return items;
  }
);
