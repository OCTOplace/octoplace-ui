import { Contract } from "@ethersproject/contracts";
import { JsonRpcProvider } from "@ethersproject/providers";
import { formatUnits } from "@ethersproject/units";
import { rpc } from "../connectors/address";
import erc721Abi from "../abi/erc721.json";
import axios from "axios";

const listingId = 0;
const tokenAddress = 1;
const tokenId = 2;
const tokenOwner = 3;
const transactionChargeBips = 4;
const isCompleted = 5;
const isCancelled = 6;
const transactionCharge = 7;
export const formatListings = (listings) => {
  const formatted = listings.map((listing) => {
    const obj = {
      listingid: Number(formatUnits(listing[listingId], 0)),
      tokenAddress: listing[tokenAddress],
      tokenId: Number(formatUnits(listing[tokenId], 0)),
      tokenOwner: listing[tokenOwner],
      transactionChargeBips: Number(
        formatUnits(listing[transactionChargeBips], 0)
      ),
      isCompleted: listing[isCompleted],
      isCancelled: listing[isCancelled],
      transactionCharge: Number(formatUnits(listing[transactionCharge], 0)),
    };
    return obj;
  });
  return formatted;
};

export const getActiveListings = (listings) => {
  return listings.filter(
    (x) => x.listingDetails.isCompleted === false && x.listingDetails.isCancelled === false
  );
};

export const getCompletedListings = (listings) => {
  return listings.filter((x) => x.isCompleted === true);
};



export function metadataUrl(uri) {
  let url = "";
  if (uri.includes("ipfs://")) {
    url = uri.replace("ipfs://", "https://ipfs.io/ipfs/");
  } else {
    url = uri;
  }
  return url;
}
