import swapabi from "../abi/swap.json";
import ercabi from "../abi/erc721.json";
import feeAbi from "../abi/feeAbi.json";
import discussionAbi from "../abi/discussionAbi.json";
import faucetAbi from "../abi/faucet.json";
 const thetaRpc = "https://eth-rpc-api.thetatoken.org/rpc";
 const thetaChainId = "0x169";
 const thetaDataContract = "0xdfB00e816bC17f46f90aeD507f9e36C3C1db1f53";
 const thetaSwapContract = "0x6e4c614da85DD861e08f84706742239dBA892Df1";
 const thetaDiscussions = "0x70b6ebf21cb6cbbaaf695725e610f0914e48845c";
 const thetaFaucet = "0xf693b83d35b336ffe54dd22845ee7516218ba3fb";
 const swapAbi = swapabi;
 const ercAbi = ercabi;
 const kavaRpc = "https://evm.kava.io";
 const kavaChainId = "0x8ae";
 const kavaDataContract = "0xd676051dAC65E1a96ab738e94F6a5a91905dC582";
 const kavaSwapContract="0x61F91266F6abEA61447E00EB781A3c38a3D1b925";

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
    THETA:{
        RPC: thetaRpc,
        CHAIN_ID: thetaChainId,
        DATA_CONTRACT: thetaDataContract,
        SWAP_CONTRACT: thetaSwapContract,
        SWAP_ABI: swapAbi,
        ERC_ABI: ercAbi,
        DISCUSSION_CONTRACT:thetaDiscussions, 
        DISCUSSION_ABI:discussionAbi,
        FAUCET: thetaFaucet,
        FEE_ABI:feeAbi,
        FAUCET_ABI: faucetAbi
    },
    KAVA:{
        RPC: kavaRpc,
        CHAIN_ID: kavaChainId,
        DATA_CONTRACT: kavaDataContract,
        SWAP_CONTRACT: kavaSwapContract,
        SWAP_ABI: swapAbi,
        ERC_ABI: ercAbi,
        DISCUSSION_CONTRACT:thetaDiscussions, 
        DISCUSSION_ABI:discussionAbi,
        FAUCET: thetaFaucet,
        FEE_ABI:feeAbi,
        FAUCET_ABI: faucetAbi
    }
 }


 export const getNetworkInfo = (name) => {
  switch(name){
    case "theta": return {switch: switchNetworks.theta, dataNetwork: NETWORKS.THETA}
    case "kava": return {switch: switchNetworks.kava, dataNetwork: NETWORKS.KAVA}
    default: return {switch: switchNetworks.theta, dataNetwork: NETWORKS.THETA}
  }
 }