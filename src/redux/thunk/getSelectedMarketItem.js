import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_LOGGING_API_URL;

export const getSelectedMarketItem = createAsyncThunk(
  "market/getSelectedMarketItem",
  async ({ network, tokenId, address }, thunkAPI) => {
    try {
      let items = [];
      // const result = await axios.get(`${apiUrl}/marketplace/get-all`);
      const result = await axios.get(
        `${apiUrl}/api/market-place/get-all-market-items`
      );
      items = result.data;
      if (items.length > 0) {
        const index = items.findIndex(
          (obj) =>
            !obj.isSold &&
            obj.tokenId === Number(tokenId) &&
            obj.nftContract === address &&
            obj.network === network
        );
        if (index > 0) {
          return items[index];
        } else {
          return undefined;
        }
      }
    } catch (error) {
      console.log("Error get All market items", error);
    }
    return [];
  }
);
