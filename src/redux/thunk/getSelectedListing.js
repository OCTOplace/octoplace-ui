import { formatUnits } from "@ethersproject/units";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_LOGGING_API_URL;
const nftApiUrl = process.env.REACT_APP_API_URL;

export const getSelectedListing = createAsyncThunk(
  "swap/getSelectedListings",
  async ({network, address, tokenId}, thunkAPI) => {
    const result = await axios.get(
      `${apiUrl}/api/swap-data/get-listing-detail/${network}/${address}/${tokenId}`
    );
    const listing = result.data;
    const offersResult = await axios.get(`${apiUrl}/api/swap-data/get-offers-from-listing/${listing.network}/${listing.tokenId}/${listing.tokenAddress}`)
    const finalOffers = [];
    for(let offer of offersResult.data){
        if(offer.listingId===listing.listingId){
          const nftResult = await axios.get(
            `${nftApiUrl}/items/${offer.offerTokenAddress}/${offer.offerTokenId}`
          );
          const obj = {
            offerDetails: offer,
            offerNFT: {
              ...nftResult.data.nft,
              contractAddress: nftResult.data.nft.contract_address,
              tokenId: formatUnits(nftResult.data.nft.token_id, 0),
              walletAddress: nftResult.data.nft.wallet_address
            },
          };
          finalOffers.push(obj)
        }
    }
    return {...listing, offers: finalOffers};
  }
);
