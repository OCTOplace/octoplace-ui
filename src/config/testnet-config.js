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
const thetaDataContract = "0xb817D4112bF6Db1002aFA177ad4E9Afc58Cc7402";
const thetaSwapContract = "0x51d457024D7ff9579A5d57bA2d31267654b77f4A";
const thetaNFTDiscussions = "0xB9Ab53Feb60a774dd28e98DaD69A78629373D0Fd";
const thetaCollectionDisscussions =
  "0x9b87a377f200f5e62E1949d4521173b1C561D8d0";
const thetaFaucet = "0x365f5Bee61f78cc57fa74780022d78A61A4acB02";
const thetaMarketplaceContract = "0x984965bf79627e299CF03d91f868f8aEFabd29F1";

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
