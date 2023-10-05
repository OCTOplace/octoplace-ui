import swapAbi from "../abi/swap.json";
import ercAbi from "../abi/erc721.json";
import feeAbi from "../abi/feeAbi.json";
import collectionDiscussionsAbi from "../abi/collection-discussions.json";
import nftDiscussionAbi from "../abi/discussionAbi.json";
import faucetAbi from "../abi/faucet.json";
import marketAbi from "../abi/marketplace.json";

const thetaChainId = "0x169"; // 361
const thetaChainName = "THETA";
const thetaNetworkName = "Theta Mainnet";
const thetaCurrency = "TFUEL";
const thetaDecimals = 18;
const thetaRpcUrl = "https://eth-rpc-api.thetatoken.org/rpc";
const thetaBlockExplorerUrl = "https://explorer.thetatoken.org/";
const thetaDataContract = "0xdfB00e816bC17f46f90aeD507f9e36C3C1db1f53";
const thetaSwapContract = "0x6e4c614da85DD861e08f84706742239dBA892Df1";
const thetaNFTDiscussions = "0x70b6ebf21cb6cbbaaf695725e610f0914e48845c";
const thetaCollectionDisscussions =
  "0x25Ffe4FCd767411aa1Acc0ef127d07D8F7D1ff8e";
const thetaFaucet = "0xf693b83d35b336ffe54dd22845ee7516218ba3fb";
const thetaMarketplaceContract = "0x465a8f1a0bd542f1ea9ae10165e6eeb5ec51f4c3";

const kavaChainId = "0x8ae"; // 2222
const kavaChainName = "KAVA";
const kavaNetworkName = "KAVA Mainnet";
const kavaCurrency = "KAVA";
const kavaDecimals = 18;
const kavaRpcUrl = "https://evm.kava.io";
const kavaBlockExplorerUrl = "https://kavascan.com/";
const kavaDataContract = "0xd676051dAC65E1a96ab738e94F6a5a91905dC582";
const kavaSwapContract = "0x61F91266F6abEA61447E00EB781A3c38a3D1b925";
const kavaMarketPlaceContract = "";

export {
  swapAbi,
  ercAbi,
  feeAbi,
  collectionDiscussionsAbi,
  nftDiscussionAbi,
  faucetAbi,
  marketAbi,
  thetaChainId,
  thetaChainName,
  thetaNetworkName,
  thetaCurrency,
  thetaDecimals,
  thetaRpcUrl,
  thetaBlockExplorerUrl,
  thetaDataContract,
  thetaSwapContract,
  thetaCollectionDisscussions,
  thetaNFTDiscussions,
  thetaFaucet,
  thetaMarketplaceContract,
  kavaChainId,
  kavaChainName,
  kavaNetworkName,
  kavaCurrency,
  kavaDecimals,
  kavaRpcUrl,
  kavaBlockExplorerUrl,
  kavaDataContract,
  kavaSwapContract,
  kavaMarketPlaceContract,
};
