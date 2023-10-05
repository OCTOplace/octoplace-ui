import { getConfig } from "../config/config";

const config = getConfig();

export const ChainNames = {
  THETA: "theta",
  KAVA: "kava",
};

export const ChainIds = {
  THETA: Number(config.thetaChainId),
  KAVA: Number(config.kavaChainId),
};

export const switchNetworks = {
  theta: {
    chainId: config.thetaChainId,
    chainName: config.thetaNetworkName,
    nativeCurrency: {
      name: config.thetaCurrency,
      symbol: config.thetaCurrency,
      decimals: config.thetaDecimals,
    },
    rpcUrls: [config.thetaRpcUrl],
    blockExplorerUrls: [config.thetaBlockExplorerUrl],
    iconUrls: [""],
  },
  kava: {
    chainId: config.kavaChainId,
    chainName: config.kavaNetworkName,
    nativeCurrency: {
      name: config.kavaCurrency,
      symbol: config.kavaCurrency,
      decimals: config.kavaDecimals,
    },
    rpcUrls: [config.kavaRpcUrl],
    blockExplorerUrls: [config.kavaBlockExplorerUrl],
    iconUrls: [""],
  },
};

export const NETWORKS = {
  THETA: {
    RPC: config.thetaRpcUrl,
    CHAIN_ID: config.thetaChainId,
    CHAIN_NAME: config.kavaChainName,
    DATA_CONTRACT: config.thetaDataContract,
    SWAP_CONTRACT: config.thetaSwapContract,
    SWAP_ABI: config.swapAbi,
    ERC_ABI: config.ercAbi,
    NFT_DISCUSSION_CONTRACT: config.thetaNFTDiscussions,
    NFT_DISCUSSION_ABI: config.nftDiscussionAbi,
    COLLECTION_DISCUSSION_CONTRACT: config.thetaCollectionDisscussions,
    COLLECTION_DISCUSSION_ABI: config.collectionDiscussionsAbi,
    FAUCET: config.thetaFaucet,
    FEE_ABI: config.feeAbi,
    FAUCET_ABI: config.faucetAbi,
    MARKETPLACE_CONTRACT: config.thetaMarketplaceContract,
    MARKET_ABI: config.marketAbi,
  },
  KAVA: {
    RPC: config.kavaRpcUrl,
    CHAIN_ID: config.kavaChainId,
    CHAIN_NAME: config.kavaChainName,
    DATA_CONTRACT: config.kavaDataContract,
    SWAP_CONTRACT: config.kavaSwapContract,
    SWAP_ABI: config.swapAbi,
    ERC_ABI: config.ercAbi,
    NFT_DISCUSSION_CONTRACT: config.thetaNFTDiscussions,
    NFT_DISCUSSION_ABI: config.nftDiscussionAbi,
    COLLECTION_DISCUSSION_CONTRACT: config.thetaCollectionDisscussions,
    COLLECTION_DISCUSSION_ABI: config.collectionDiscussionsAbi,
    FAUCET: config.thetaFaucet,
    FEE_ABI: config.feeAbi,
    FAUCET_ABI: config.faucetAbi,
    MARKETPLACE_CONTRACT: config.kavaMarketPlaceContract,
    MARKET_ABI: config.marketAbi,
  },
};

export const isThetaChain = (chainId) => {
  return Number(chainId) === Number(config.thetaChainId);
};

export const getBlockExplorerUrl = (chainId) => {
  if (isThetaChain(chainId)) {
    return config.thetaBlockExplorerUrl;
  }
  return config.kavaBlockExplorerUrl;
};

export const getAvailableNetworks = () => {
  return [NETWORKS.THETA]; // [NETWORKS.THETA, NETWORKS.KAVA];
};

export const getNetworkInfo = (name) => {
  switch (name) {
    case ChainNames.THETA: // "theta"
      return { switch: switchNetworks.theta, dataNetwork: NETWORKS.THETA };
    case ChainNames.KAVA: //"kava":
      return { switch: switchNetworks.kava, dataNetwork: NETWORKS.KAVA };
    default:
      return { switch: switchNetworks.theta, dataNetwork: NETWORKS.THETA };
  }
};
