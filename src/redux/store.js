import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import  accountReducer  from './slices/accout-slice'
import appReducer from './slices/app-slice'
import myNftSlice from './slices/my-nft-slice'
import listingSlice from './slices/listing-slice'
import tradeReducer from "./slices/trades-slice";
import marketSlice from "./slices/market-slice";

import createSagaMiddleware from "redux-saga";
import { rootSaga } from './saga'

let sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware(), sagaMiddleware];

export const store = configureStore({
  reducer: {
    account: accountReducer,
    app: appReducer,
    myNFT: myNftSlice,
    listings: listingSlice,
    trades: tradeReducer,
    market: marketSlice
  },
  middleware
});

sagaMiddleware.run(rootSaga);