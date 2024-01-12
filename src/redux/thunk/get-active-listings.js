import { formatUnits } from "@ethersproject/units";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_LOGGING_API_URL;
const nftApiUrl = process.env.REACT_APP_API_URL;

export const getActiveListingsFromLoggingAPI = createAsyncThunk(
  "swap/getAllListings",
  async (address, thunkAPI) => {
    const result = await axios.get(
      `${apiUrl}/api/swap-data/get-all-active-listings`
    );
    
    const listings = result.data;
    const finalListings = [];
    for (let listing of listings) {
      const nftResult = await axios.get(
        `${nftApiUrl}/items/${listing.tokenAddress}/${listing.tokenId}`
      );
      const obj = {
        listingDetails: listing,
        listingNFT: {
          ...nftResult.data.nft,
          contractAddress: nftResult.data.nft.contract_address,
          tokenId: formatUnits(nftResult.data.nft.token_id, 0),
          walletAddress: nftResult.data.nft.wallet_address
        },
      };
      finalListings.push(obj);
    }
    return finalListings;
  }
);
