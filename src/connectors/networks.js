import { getConfig } from "../config/config";

const config = getConfig();

export const ChainNames = {
  THETA: "theta",
  KAVA: "kava",
  MANTLE: "mantle",
};

export const ChainIds = {
  THETA: Number(config.thetaChainId),
  KAVA: Number(config.kavaChainId),
  MANTLE: Number(config.mantleChainId),
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
  mantle: {
    chainId: config.mantleChainId,
    chainName: config.mantleNetworkName,
    nativeCurrency: {
      name: config.mantleCurrency,
      symbol: config.mantleCurrency,
      decimals: config.mantleDecimals,
    },
    rpcUrls: [config.mantleRpcUrl],
    blockExplorerUrls: [config.mantleBlockExplorerUrl],
    iconUrls: [""],
  },
};

export const NETWORKS = {
  THETA: {
    RPC: config.thetaRpcUrl,
    CHAIN_ID: config.thetaChainId,
    CHAIN_NAME: config.thetaChainName,
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
    NFT_DISCUSSION_CONTRACT: config.kavaNFTDiscussions,
    NFT_DISCUSSION_ABI: config.nftDiscussionAbi,
    COLLECTION_DISCUSSION_CONTRACT: config.kavaCollectionDisscussions,
    COLLECTION_DISCUSSION_ABI: config.collectionDiscussionsAbi,
    FAUCET: config.kavaFaucet,
    FEE_ABI: config.feeAbi,
    FAUCET_ABI: config.faucetAbi,
    MARKETPLACE_CONTRACT: config.kavaMarketPlaceContract,
    MARKET_ABI: config.marketAbi,
  },
  MANTLE: {
    RPC: config.mantleRpcUrl,
    CHAIN_ID: config.mantleChainId,
    CHAIN_NAME: config.mantleChainName,
    DATA_CONTRACT: config.mantleDataContract,
    SWAP_CONTRACT: config.mantleSwapContract,
    SWAP_ABI: config.swapAbi,
    ERC_ABI: config.ercAbi,
    NFT_DISCUSSION_CONTRACT: config.mantleNFTDiscussions,
    NFT_DISCUSSION_ABI: config.nftDiscussionAbi,
    COLLECTION_DISCUSSION_CONTRACT: config.mantleCollectionDisscussions,
    COLLECTION_DISCUSSION_ABI: config.collectionDiscussionsAbi,
    FAUCET: config.mantleFaucet,
    FEE_ABI: config.feeAbi,
    FAUCET_ABI: config.faucetAbi,
    MARKETPLACE_CONTRACT: config.mantleMarketPlaceContract,
    MARKET_ABI: config.marketAbi,
  },
};

export const isThetaChain = (chainId) => {
  return Number(chainId) === Number(config.thetaChainId);
};

export const isKavaChain = (chainId) => {
  return Number(chainId) === Number(config.kavaChainId);
};

export const isMantleChain = (chainId) => {
  return Number(chainId) === Number(config.mantleChainId);
};

export const getChainName = (chainId) => {
  const numChainId = Number(chainId);
  switch (numChainId) {
    case ChainIds.THETA:
      return ChainNames.THETA.toUpperCase();
    case ChainIds.KAVA:
      return ChainNames.KAVA.toUpperCase();
    case ChainIds.MANTLE:
      return ChainNames.MANTLE.toUpperCase();
    default:
      return "Unknown";
  }
};

export const getBlockExplorerUrl = (chainId) => {
  const numChainId = Number(chainId);
  switch (numChainId) {
    case ChainIds.THETA:
      return config.thetaBlockExplorerUrl;
    case ChainIds.KAVA:
      return config.kavaBlockExplorerUrl;
    case ChainIds.MANTLE:
      return config.mantleBlockExplorerUrl;
    default:
      return config.thetaBlockExplorerUrl;
  }
};

export const getCurrency = (chainId) => {
  const numChainId = Number(chainId);
  switch (numChainId) {
    case ChainIds.THETA:
      return config.thetaCurrency;
    case ChainIds.KAVA:
      return config.kavaCurrency;
    case ChainIds.MANTLE:
      return config.mantleCurrency;
    default:
      return "Unknown";
  }
};

export const getAvailableNetworks = () => {
  return [NETWORKS.THETA, NETWORKS.KAVA, NETWORKS.MANTLE];
};

export const getNetworkInfo = (name) => {
  switch (name) {
    case ChainNames.THETA: // "theta"
      return { switch: switchNetworks.theta, dataNetwork: NETWORKS.THETA };
    case ChainNames.KAVA: //"kava":
      return { switch: switchNetworks.kava, dataNetwork: NETWORKS.KAVA };
    case ChainNames.MANTLE: //"mantle":
      return { switch: switchNetworks.mantle, dataNetwork: NETWORKS.MANTLE };
    default:
      return { switch: switchNetworks.theta, dataNetwork: NETWORKS.THETA };
  }
};
