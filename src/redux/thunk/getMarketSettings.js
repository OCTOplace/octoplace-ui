import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setSymbols } from "../slices/market-settings-slice";

const apiUrl = process.env.REACT_APP_API_URL;

export const getAllMarketSettings = createAsyncThunk(
  "marketplace-settings/get-all",
  async (params, thunkAPI) => {
    const result = await axios.get(`${apiUrl}/marketplace-settings/get-all`);
    let symbols = result.data.map((x) => {
        return x.symbol
    });

    thunkAPI.dispatch(setSymbols(symbols))
    return result.data;
  }
);
