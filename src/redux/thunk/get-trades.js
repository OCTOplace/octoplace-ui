import { Contract } from "@ethersproject/contracts";
import { JsonRpcProvider } from "@ethersproject/providers";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { rpc, swapAbi, swapContract } from "../../connectors/address";
import {
  FormatTrades,
  formatListings,
  formatOffers,
} from "../../utils/format-listings";
export const getAllTrades = createAsyncThunk(
  "trades/getAllTrades",
  async (thunkAPI) => {
    const detailedTrades = [];
    const provider = new JsonRpcProvider(rpc);
    const contract = new Contract(swapContract, swapAbi, provider);
    let trades = await contract.readAllTrades();
    trades = FormatTrades(trades);

    for (const trade of trades) {
      let listing = await contract.readListingById(trade.listingId);
      let offer = await contract.readOfferById(trade.offerId);
      listing = formatListings([listing])[0];
      offer = formatOffers([offer])[0];

      detailedTrades.push({
        tradeId: trade.tradeId,
        listing,
        offer,
      });
    }

    return detailedTrades;
  }
);
