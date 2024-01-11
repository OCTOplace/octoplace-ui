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
      console.log("This is unfiltered:", items, address)
      if (items.length > 0) {
        const index = items.findIndex(
          (obj) =>
            !obj.isSold &&
            obj.tokenId === Number(tokenId) &&
            obj.nftContract.toLowerCase() === address.toLowerCase() &&
            obj.network === network
        );

        if (index > 0) {
            console.log("This is from Action",items[index] )
          return items[index];
        } else {
            console.log("This is from Action","No data" )
          return undefined;
        }
      }
    } catch (error) {
      console.log("Error get All market items", error);
    }
    return [];
  }
);
