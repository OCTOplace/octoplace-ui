import {fork, spawn} from "redux-saga/effects"
import GetMyNFTSagaWatcher from "./sagas/get-nft";
import loadMyFT from "./sagas/load-my-nft.saga"
export function* rootSaga() {
   // yield spawn(GetMyNFTSagaWatcher);
    yield spawn(loadMyFT);
}