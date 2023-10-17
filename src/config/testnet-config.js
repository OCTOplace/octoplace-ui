import swapAbi from "../abi/swap.json";
import ercAbi from "../abi/erc721.json";
import feeAbi from "../abi/feeAbi.json";
import collectionDiscussionsAbi from "../abi/collection-discussions.json";
import nftDiscussionAbi from "../abi/discussionAbi.json";
import faucetAbi from "../abi/faucet.json";
import marketAbi from "../abi/marketplace.json";

const thetaChainId = "0x16d"; // 365
const thetaChainName = "THETA";
const thetaNetworkName = "Theta Testnet";
const thetaCurrency = "TFUEL";
const thetaDecimals = 18;
const thetaRpcUrl = "https://eth-rpc-api-testnet.thetatoken.org/rpc";
const thetaBlockExplorerUrl = "https://testnet-explorer.thetatoken.org/";
const thetaDataContract = "0x61f91266f6abea61447e00eb781a3c38a3d1b925";
const thetaSwapContract = "0xef90c48c632f6d587d42a27ac7721b655aed0abe";
const thetaNFTDiscussions = "0x481ea6857b0b26ba61f93df9d4bdc5c19b3ca115";
const thetaCollectionDisscussions =
  "0xe385940ffa478e4036eb6baacfbe8ff9a0ea7cd8";
const thetaFaucet = "0x9f20dd6abc33c46f834ec7ec8932cb6453af058e";
const thetaMarketplaceContract = "0xaf843502407a64beb8d4483e51e48a41695382d4";

const kavaChainId = "0x8ad"; // 2221
const kavaChainName = "KAVA";
const kavaNetworkName = "KAVA Testnet";
const kavaCurrency = "TKAVA";
const kavaDecimals = 18;
const kavaRpcUrl = "https://evm.testnet.kava.io";
const kavaBlockExplorerUrl = "https://testnet.kavascan.com/";
const kavaDataContract = "0xd676051dAC65E1a96ab738e94F6a5a91905dC582";
const kavaSwapContract = "0x61F91266F6abEA61447E00EB781A3c38a3D1b925";
const kavaMarketPlaceContract = "";

const mantleChainId = "0x1389"; // 5001
const mantleChainName = "MANTLE";
const mantleNetworkName = "Mantle Testnet";
const mantleCurrency = "MNT";
const mantleDecimals = 18;
const mantleRpcUrl = "https://rpc.testnet.mantle.xyz";
const mantleBlockExplorerUrl = "https://explorer.testnet.mantle.xyz/";
const mantleDataContract = "0xD218272534f4889CA2CdaA4D641709B77cEf534b";
const mantleSwapContract = "0x1cD7763a6F4067A6BE28A02CDb57d40CBb5ABfA7";
const mantleNFTDiscussions = "";
const mantleCollectionDisscussions = "";
const mantleFaucet = "";
const mantleMarketPlaceContract = "0xdfB00e816bC17f46f90aeD507f9e36C3C1db1f53";

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
  mantleChainId,
  mantleChainName,
  mantleNetworkName,
  mantleCurrency,
  mantleDecimals,
  mantleRpcUrl,
  mantleBlockExplorerUrl,
  mantleDataContract,
  mantleSwapContract,
  mantleCollectionDisscussions,
  mantleNFTDiscussions,
  mantleFaucet,
  mantleMarketPlaceContract,
};
