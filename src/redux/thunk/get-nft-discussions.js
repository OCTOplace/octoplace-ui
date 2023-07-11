import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = process.env.REACT_APP_API_URL;

export const getNftDiscussions = createAsyncThunk(
  "discussion/getNftDiscussions",
  async (nft, thunkAPI) => {
    const result = await axios.post(`${apiUrl}/discussions/nft-discussions`, {
      contract: nft.address,
      network: nft.network,
      tokenId: nft.tokenId,
    });
    return result.data;
  }
);

export const getCollectionDiscussions = createAsyncThunk(
  "discussion/getCollectionDiscussions",
  async (nft, thunkAPI) => {
    const result = await axios.post(
      `${apiUrl}/discussions/collection-discussions`,
      { contract: nft.address, network: nft.network }
    );
    return result.data;
  }
);



export const createNFTDiscussion = createAsyncThunk(
    "discussion/createNFTDiscussion",
    async (nft, thunkAPI) => {
      const result = await axios.post(
        `${apiUrl}/discussions/create-nft-discussion`,
        { contract: nft.address, network: nft.network,tokenId: nft.tokenId, sender: nft.sender, message:nft.message  }
      );
      thunkAPI.dispatch(getNftDiscussions({address:nft.address, tokenId: nft.tokenId, network:nft.network}))
      return result.data;
    }
  );
  

  export const createCollectionDiscussion = createAsyncThunk(
    "discussion/createCollectionDiscussion",
    async (nft, thunkAPI) => {
      const result = await axios.post(
        `${apiUrl}/discussions/create-collection-discussion`,
        { contract: nft.address, network: nft.network, sender: nft.sender, message:nft.message  }
      );
      thunkAPI.dispatch(getCollectionDiscussions({address:nft.address, network:nft.network}))
      return result.data;
    }
  );