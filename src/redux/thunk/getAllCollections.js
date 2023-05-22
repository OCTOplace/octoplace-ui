import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const getAllCollections = createAsyncThunk(
  "collections/getAllCollections",
  async (network, thunkAPI) => {
    let items = [];
    const result = await axios.get(`${apiUrl}/nft/get-collections`);
    items = result.data.collections;
    return items;
  }
);
