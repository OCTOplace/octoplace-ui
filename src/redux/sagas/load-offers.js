import { Contract } from "@ethersproject/contracts";
import { JsonRpcProvider } from "@ethersproject/providers";
import { createAction } from "@reduxjs/toolkit";
import { takeLeading, put, call } from "redux-saga/effects";
import {rpc, swapContract} from "../../connectors/address";
import swapAbi from "../../abi/swap.json";
import {  formatOffers } from "../../utils/format-listings";
import {  setOffersLoading} from "../slices/app-slice";
import { setOffers } from "../slices/listing-slice";

function* LoadAllOffersWatcher() {
  yield takeLeading("LOAD_ALL_OFFERS", LoadAllOffersWorker);
}

function* LoadAllOffersWorker(action) {
  try {
    yield put(setOffersLoading(true));
    const offers = yield call(loadAllOffers);
    yield put(setOffers(offers));
    yield put(setOffersLoading(false))
  } catch (e) {
    yield 
    yield put(createAction("LOAD_FAILED")(e));
  }
}

const loadAllOffers = async() => {
    const provider = new JsonRpcProvider(rpc);
    const contract = new Contract(swapContract, swapAbi, provider);
    let offers  = await contract.readAllOffers();
    offers = formatOffers(offers);
    return offers;

}

export default LoadAllOffersWatcher;