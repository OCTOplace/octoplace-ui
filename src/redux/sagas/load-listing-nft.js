import { Contract } from "@ethersproject/contracts";
import { JsonRpcProvider } from "@ethersproject/providers";
import { createAction } from "@reduxjs/toolkit";
import { takeLeading, put, all, call, takeEvery } from "redux-saga/effects";
import {rpc, swapContract} from "../../connectors/address";
import ercAbi from "../../abi/erc721.json";
import { formatListings, metadataUrl } from "../../utils/format-listings";
import { setLoading} from "../slices/app-slice";
import axios from "axios";
import { setAllListings } from "../slices/listing-slice";

function* LoadListingNFtWatcher() {
  yield takeEvery("LOAD_LISTING_NFT", LoadListingNFtWorker);
}

function* LoadListingNFtWorker(action) {
  try {
    const listing = yield action.payload;
    yield put(setLoading(true));
    const details = yield call(loadListingNft, listing);
    yield put(setAllListings(details));
    yield put(setLoading(false));
  } catch (e) {
    yield 
    yield put(createAction("LOAD_FAILED")(e));
  }
}

const loadListingNft = async(listing) => {
    const {tokenAddress, tokenId} = listing;
    const provider = new JsonRpcProvider(rpc);
    const contract = new Contract(tokenAddress, ercAbi, provider);
    const name  = await contract.name();
    const uri = await contract.tokenURI(tokenId);
    let metadata;
    try{
      const result = await axios.get(metadataUrl(uri));
     metadata = result.data;
    }catch{
      metadata = undefined;
    }
    return {
        listingDetails: listing,
        listingNFT: {
            contractAddress: tokenAddress,
            tokenId: tokenId,
            metadataUri: uri,
            name: name,
            metadata: metadata
        }
    }

}

export default LoadListingNFtWatcher;