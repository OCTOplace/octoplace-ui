import { Contract } from "@ethersproject/contracts";
import { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
import { createAction } from "@reduxjs/toolkit";
import {
  takeLatest,
  takeLeading,
  takeEvery,
  take,
  put,
  call,
  all,
} from "redux-saga/effects";
import { rpc } from "../../connectors/address";
import abi from "../../abi/erc721.json";
import { setLoading } from "../slices/app-slice";
import { formatUnits } from "@ethersproject/units";
import axios from "axios";
import { metadataUrl } from "../../utils/format-listings";
import { addNFT, addNFTCollection } from "../slices/my-nft-slice";
function* LoadMyNFTSagaWatcher() {
  yield takeLeading("LOAD_MY_NFTS", LoadMyNFTWorker);
}

function* LoadMyNFTWorker(action) {
  try {
    yield put(setLoading(true));
    yield console.log(action.payload);
    const data = yield call(
      loadNFT,
      action.payload.nftAddrList,
      action.payload.account
    );
    yield put(addNFTCollection(data.collections));
    yield put(addNFT(data.nfts));
    yield put(setLoading(false));
    yield console.log(data);
  } catch (e) {
    yield;
    yield put(createAction("LOAD_FAILED")(e));
  }
}
async function loadNFT(addresses, owner) {
  const nfts = [];
  const collections = [];
  const provider = new JsonRpcProvider(rpc);

  for (const item of addresses) {
    const contract = new Contract(item.address, abi, provider);
    const collectionName = await contract.name();
    const colSymbol = await contract.symbol();
    const balance = await contract.balanceOf(owner);
    collections.push({
      contract,
      name: collectionName,
      symbol: colSymbol,
      balance: Number(formatUnits(balance, 0)),
    });
  }
  for (const collection of collections) {
    if (collection.balance > 0) {
      for (let i = 0; i < collection.balance; i++) {
        const tokenId = await collection.contract.tokenOfOwnerByIndex(owner, i);
        const uri = await collection.contract.tokenURI(
          Number(formatUnits(tokenId, 0))
        );
        let tokenData;
        try {
          const result = await axios.get(metadataUrl(uri));
          tokenData = result.data;
        } catch {
          tokenData = null;
        }

        nfts.push({
          collectionName: collection.name,
          collectionSymbol: collection.symbol,
          contractAddress: collection.contract.address,
          tokenId: Number(formatUnits(tokenId, 0)),
          url: uri,
          metadata: tokenData,
        });
      }
    }
  }
  return { collections, nfts };
}

export default LoadMyNFTSagaWatcher;
