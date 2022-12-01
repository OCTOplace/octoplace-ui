import { spawn} from "redux-saga/effects"
import LoadListingNFtWatcher from "./sagas/load-listing-nft";
import LoadAllListingsWatcher from "./sagas/load-listings";
import loadMyFT from "./sagas/load-my-nft.saga"
export function* rootSaga() {
   // yield spawn(GetMyNFTSagaWatcher);
    yield spawn(loadMyFT);
    yield spawn(LoadAllListingsWatcher);
    yield spawn(LoadListingNFtWatcher);
}