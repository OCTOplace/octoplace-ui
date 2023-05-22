import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const getMarketNFTDetail = createAsyncThunk(
  "market/getMarketNFTDetails",
  async (nftDetails, thunkAPI) => {
    let items = [];
    const result = await axios.get(`${apiUrl}/nft/get-nft-details/${nftDetails.contractAddress}/${nftDetails.tokenId}`);
    items = result.data;
    items = {...items, listingId: nftDetails.listingId}
    return items;
  }
);
