import { Contract } from "@ethersproject/contracts";
import { JsonRpcProvider } from "@ethersproject/providers";
import { createAction } from "@reduxjs/toolkit";
import { takeLeading, put, call } from "redux-saga/effects";
import {rpc, swapContract} from "../../connectors/address";
import swapAbi from "../../abi/swap.json";
import { formatListings } from "../../utils/format-listings";
import { setLoading} from "../slices/app-slice";

function* LoadAllListingsWatcher() {
  yield takeLeading("LOAD_ALL_LISTING", LoadAllListingsWorker);
}

function* LoadAllListingsWorker(action) {
  try {
    yield put(setLoading(true));
    const listings = yield call(loadAllListings);
    for(const item of listings){
        yield put(createAction("LOAD_LISTING_NFT")(item));
    }
  } catch (e) {
    yield 
    yield put(createAction("LOAD_FAILED")(e));
  }
}

const loadAllListings = async() => {
    const provider = new JsonRpcProvider(rpc);
    const contract = new Contract(swapContract, swapAbi, provider);
    let listings  = await contract.readAllListings();
    listings = formatListings(listings);
    return listings;

}

export default LoadAllListingsWatcher;