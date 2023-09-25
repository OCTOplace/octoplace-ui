import swapabi from "../abi/swap.json";
import ercabi from "../abi/erc721.json";
import feeAbi from "../abi/feeAbi.json";
import nftDiscussionAbi from "../abi/discussionAbi.json";
import faucetAbi from "../abi/faucet.json";
import marketAbi from "../abi/marketplace.json";
import collectionDiscussionsAbi from "../abi/collection-discussions.json";

// main net
const thetaRpc = "https://eth-rpc-api.thetatoken.org/rpc";
const thetaChainId = "0x169";
const thetaDataContract = "0xdfB00e816bC17f46f90aeD507f9e36C3C1db1f53";
const thetaSwapContract = "0x6e4c614da85DD861e08f84706742239dBA892Df1";
const thetaNFTDiscussions = "0x70b6ebf21cb6cbbaaf695725e610f0914e48845c";
const thetaCollectionDisscussions =
  "0x25Ffe4FCd767411aa1Acc0ef127d07D8F7D1ff8e";
const thetaFaucet = "0xf693b83d35b336ffe54dd22845ee7516218ba3fb";
const thetaMarketplaceContract = "0x465a8f1a0bd542f1ea9ae10165e6eeb5ec51f4c3";
const swapAbi = swapabi;
const ercAbi = ercabi;
const kavaRpc = "https://evm.kava.io";
const kavaChainId = "0x8ae";
const kavaDataContract = "0xd676051dAC65E1a96ab738e94F6a5a91905dC582";
const kavaSwapContract = "0x61F91266F6abEA61447E00EB781A3c38a3D1b925";
const kavaMarketPlaceContract = "";

// test net
const thetaTestRpc = "https://eth-rpc-api-testnet.thetatoken.org/rpc";
const thetaTestChainId = "0x16d";
const kavaTestRpc = "wss://wevm.testnet.kava.io";
const kavaTestChainId = "0x8ad";

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
  theta_test: {
    chainId: "0x16d",
    chainName: "Theta Testnet",
    nativeCurrency: {
      name: "TFUEL",
      symbol: "TFUEL",
      decimals: 18,
    },
    rpcUrls: ["https://eth-rpc-api-testnet.thetatoken.org/rpc"],
    blockExplorerUrls: ["https://testnet-explorer.thetatoken.org/"],
    iconUrls: [""],
  },
  kava: {
    chainId: "0x8ae",
    chainName: "Kava Mainnet",
    nativeCurrency: {
      name: "TKAVA",
      symbol: "TKAVA",
      decimals: 18,
    },
    rpcUrls: ["https://evm.kava.io"],
    blockExplorerUrls: ["https://explorer.kava.io"],
    iconUrls: [""],
  },
  kava_test: {
    chainId: "0x8ad",
    chainName: "Kava Testnet",
    nativeCurrency: {
      name: "TKAVA",
      symbol: "TKAVA",
      decimals: 18,
    },
    rpcUrls: ["https://evm.testnet.kava.io"],
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
  THETA_TEST: {
    RPC: thetaTestRpc,
    CHAIN_ID: thetaTestChainId,
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
  KAVA_TEST: {
    RPC: kavaTestRpc,
    CHAIN_ID: kavaTestChainId,
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
  console.log("////////////////////////// getNetworkInfo", name);
  switch (name) {
    case "theta":
      const thetaNet = {
        switch:
          process.env.NODE_ENV === "production"
            ? switchNetworks.theta
            : switchNetworks.theta_test,
        dataNetwork:
          process.env.NODE_ENV === "production"
            ? NETWORKS.THETA
            : NETWORKS.THETA_TEST,
      };
      console.table(thetaNet);
      return thetaNet;
    case "kava":
      const kavaNet = {
        switch:
          process.env.NODE_ENV === "production"
            ? switchNetworks.kava
            : switchNetworks.kava_test,
        dataNetwork:
          process.env.NODE_ENV === "production"
            ? NETWORKS.KAVA
            : NETWORKS.KAVA_TEST,
      };
      console.table(kavaNet);
      return kavaNet;
    // return { switch: switchNetworks.kava, dataNetwork: NETWORKS.KAVA };
    default:
      return {
        switch:
          process.env.NODE_ENV === "production"
            ? switchNetworks.theta
            : switchNetworks.theta_test,
        dataNetwork:
          process.env.NODE_ENV === "production"
            ? NETWORKS.THETA
            : NETWORKS.THETA_TEST,
      };
  }
};
