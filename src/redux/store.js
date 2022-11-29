import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import  accountReducer  from './slices/accout-slice'
import appReducer from './slices/app-slice'
import myNftSlice from './slices/my-nft-slice'
import listingSlice from './slices/listing-slice'
import createSagaMiddleware from "redux-saga";
import { rootSaga } from './saga'

let sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

export const store = configureStore({
  reducer: {
    account: accountReducer,
    app: appReducer,
    myNFT: myNftSlice,
    listings: listingSlice
  },
  middleware
});

sagaMiddleware.run(rootSaga);