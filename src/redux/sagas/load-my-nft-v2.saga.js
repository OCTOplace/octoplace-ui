import { call, put, takeLatest } from "redux-saga/effects";
import {
  addNFT,
  resetCollections,
  setMyNftLoading,
  setOwner,
} from "../slices/my-nft-slice";
import { createAction } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

function* LoadMyNFTFromAPIWatcher() {
  yield takeLatest("LOAD_MY_NFTS_API", LoadMyNFTFromAPIWorker);
}

function* LoadMyNFTFromAPIWorker(action) {
  try {
    yield put(setMyNftLoading(true));
    yield put(resetCollections());
    yield put(setOwner(action.payload.account));
    const data = yield call(loadNFT, action.payload.account);

    yield put(addNFT(data));
    yield put(setMyNftLoading(false));
  } catch (e) {
    yield put(createAction("LOAD_FAILED")(e));
  }
}

async function loadNFT(account) {
  const result = await axios.get(`${apiUrl}/users/${account}`);
  if (result.data.success) {
    return transformData(result.data.nfts);
  } else {
    throw result.data.message;
  }
}

function transformData(nfts){
    return nfts.map(nft => {
        const item = {
            collectionName: "",
            collectionSymbol: "",
            contractAddress: nft.contract_address,
            tokenId: Number(nft.token_id),
            url: "",
            metadata: nft.metadata
        }
        return item;
    })
}
export default LoadMyNFTFromAPIWatcher;
