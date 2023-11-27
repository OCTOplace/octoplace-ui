import swapabi from "../abi/swap.json";
import ercabi from "../abi/erc721.json";
import feeAbi from "../abi/feeAbi.json";
import nftDiscussionAbi from "../abi/discussionAbi.json";
import faucetAbi from "../abi/faucet.json";
import marketAbi from "../abi/marketplace.json";
import collectionDiscussionsAbi from "../abi/collection-discussions.json";
const thetaRpc = "https://thetanode.octoplace.io/rpc";
//const thetaRpc = "https://eth-rpc-api.thetatoken.org/rpc";
//const thetaRpc = "https://172.190.238.225:80/rpc";
const thetaChainId = "0x169";
let thetaDataContract = ""; // DataFlat.sol
let thetaSwapContract = ""; // SwapFlat.sol
let thetaNFTDiscussions = ""; // Discussions.sol
let thetaCollectionDisscussions = ""; // CollectionDiscussions.sol
let thetaFaucet = ""; // Faucet.sol
let thetaMarketplaceContract = ""; // Octoplace_FLAT.sol
const swapAbi = swapabi;
const ercAbi = ercabi;
//const kavaRpc = "https://evm.kava.io";
const kavaRpc = "https://kava.publicnode.com/";
const kavaChainId = "0x8ae";
let kavaDataContract = "";
let kavaSwapContract = "";
const kavaMarketPlaceContract = "";
const env = process.env.REACT_APP_ENV;
if (env === "production") {
  //theta contracts
  thetaDataContract = "0x01070d4a5cef61eaf360846eb7f09a3d90a77312"; // DataFlat.sol
  thetaSwapContract = "0xa53693f5b82dc0174b297c182e294799e99afac7"; // SwapFlat.sol
  thetaNFTDiscussions = "0xd744f31b1be03ef644a63271c354f400a0eb74fb"; // Discussions.sol
  thetaCollectionDisscussions = "0x8f330074a52260a7dac027e2b3cd1af9e0b920c7"; // CollectionDiscussions.sol
  thetaFaucet = "0xf693b83d35b336ffe54dd22845ee7516218ba3fb"; // Faucet.sol
  thetaMarketplaceContract = "0x8d7f6ee4a621ec75736a70106a6b5fbdd95d2817"; // Octoplace_FLAT.sol

  //kava contracts
  kavaDataContract = "0x73E67498dd6743606DDD210cD14b2A97C7b8726f";
  kavaSwapContract = "0xBfb7Dde29C049836e99979c1FAdA1FA53a9C4842";
} else if (env === "development") {
  //theta contracts
  thetaDataContract = "0x309a468b573b4cb168813a9a28db6Ab5e008B787"; // DataFlat.sol
  thetaSwapContract = "0x14459D6C7b398e64E4eC2Edf41d858B83505781b"; // SwapFlat.sol
  thetaNFTDiscussions = "0xfEfB9d1f61433c7BF04E667CfAFCf7A8eEe3cD8B"; // Discussions.sol
  thetaCollectionDisscussions = "0x63C290716F5A80baB5F2cc4D09678bAC71D28801"; // CollectionDiscussions.sol
  thetaFaucet = "0xf693b83d35b336ffe54dd22845ee7516218ba3fb"; // Faucet.sol
  thetaMarketplaceContract = "0x8Bb2718bEA1382348046F671C003C02c27aD9cbD"; // Octoplace_FLAT.sol

  //kava contracts
  kavaDataContract = "0xd676051dAC65E1a96ab738e94F6a5a91905dC582";
  kavaSwapContract = "0x61F91266F6abEA61447E00EB781A3c38a3D1b925";
}
export const switchNetworks = {
  theta: {
    chainId: "0x169",
    chainName: "Theta Mainnet",
    nativeCurrency: {
      name: "TFUEL",
      symbol: "TFUEL",
      decimals: 18,
    },
    rpcUrls: ["https://eth-rpc-api.thetatoken.org/rpc"],
    blockExplorerUrls: ["https://explorer.thetatoken.org/"],
    iconUrls: [""],
  },
  kava: {
    chainId: "0x8ae",
    chainName: "Kava Mainnet",
    nativeCurrency: {
      name: "KAVA",
      symbol: "KAVA",
      decimals: 18,
    },
    rpcUrls: ["https://evm.kava.io"],
    blockExplorerUrls: ["https://explorer.kava.io"],
    iconUrls: [""],
  },
};
export const NETWORKS = {
  THETA: {
    RPC: thetaRpc,
    CHAIN_ID: thetaChainId,
    DATA_CONTRACT: thetaDataContract,
    SWAP_CONTRACT: thetaSwapContract,
    SWAP_ABI: swapAbi,
    ERC_ABI: ercAbi,
    NFT_DISCUSSION_CONTRACT: thetaNFTDiscussions,
    NFT_DISCUSSION_ABI: nftDiscussionAbi,
    COLLECTION_DISCUSSION_CONTRACT: thetaCollectionDisscussions,
    COLLECTION_DISCUSSION_ABI: collectionDiscussionsAbi,
    FAUCET: thetaFaucet,
    FEE_ABI: feeAbi,
    FAUCET_ABI: faucetAbi,
    MARKETPLACE_CONTRACT: thetaMarketplaceContract,
    MARKET_ABI: marketAbi,
  },
  KAVA: {
    RPC: kavaRpc,
    CHAIN_ID: kavaChainId,
    DATA_CONTRACT: kavaDataContract,
    SWAP_CONTRACT: kavaSwapContract,
    SWAP_ABI: swapAbi,
    ERC_ABI: ercAbi,
    NFT_DISCUSSION_CONTRACT: thetaNFTDiscussions,
    NFT_DISCUSSION_ABI: nftDiscussionAbi,
    COLLECTION_DISCUSSION_CONTRACT: thetaCollectionDisscussions,
    COLLECTION_DISCUSSION_ABI: collectionDiscussionsAbi,
    FAUCET: thetaFaucet,
    FEE_ABI: feeAbi,
    FAUCET_ABI: faucetAbi,
    MARKETPLACE_CONTRACT: kavaMarketPlaceContract,
    MARKET_ABI: marketAbi,
  },
};

export const getNetworkInfo = (name) => {
  switch (name) {
    case "theta":
      return { switch: switchNetworks.theta, dataNetwork: NETWORKS.THETA };
    case "kava":
      return { switch: switchNetworks.kava, dataNetwork: NETWORKS.KAVA };
    default:
      return { switch: switchNetworks.theta, dataNetwork: NETWORKS.THETA };
  }
};
