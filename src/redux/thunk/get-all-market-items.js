import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const getAllMarketItems = createAsyncThunk(
  "market/getAllMarketItems",
  async (network, thunkAPI) => {
    let items = [];
    const result = await axios.get(`${apiUrl}/marketplace/get-all`);
    items = result.data;
    return items;
  }
);
