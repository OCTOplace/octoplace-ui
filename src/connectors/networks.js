import swapabi from "../abi/swap.json";
import ercabi from "../abi/erc721.json";


 const thetaRpc = "https://eth-rpc-api.thetatoken.org/rpc";
 const thetaChainId = "0x169";
 const thetaDataContract = "0xdfB00e816bC17f46f90aeD507f9e36C3C1db1f53";
 const thetaSwapContract = "0x6e4c614da85DD861e08f84706742239dBA892Df1";
 const swapAbi = swapabi;
 const ercAbi = ercabi;
 const kavaRpc = "https://evm.testnet.kava.io";
 const kavaChainId = "0x8ad";
 const kavaDataContract = "0xdfB00e816bC17f46f90aeD507f9e36C3C1db1f53";
 const kavaSwapContract="0x6e4c614da85DD861e08f84706742239dBA892Df1";

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
      chainId: "0x8ad",
      chainName: "Kava Testnet",
      nativeCurrency: {
        name: "KAVA",
        symbol: "KAVA", 
        decimals: 18,
      },
      rpcUrls: ["https://evm.testnet.kava.io"],
      blockExplorerUrls: ["https://explorer.testnet.kava.io"],
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
        ERC_ABI: ercAbi
    },
    KAVA:{
        RPC: kavaRpc,
        CHAIN_ID: kavaChainId,
        DATA_CONTRACT: kavaDataContract,
        SWAP_CONTRACT: kavaSwapContract,
        SWAP_ABI: swapAbi,
        ERC_ABI: ercAbi
    }
 }


 export const getNetworkInfo = (name) => {
  switch(name){
    case "theta": return {switch: switchNetworks.theta, dataNetwork: NETWORKS.THETA}
    case "kava": return {switch: switchNetworks.kava, dataNetwork: NETWORKS.KAVA}
    default: return {switch: switchNetworks.theta, dataNetwork: NETWORKS.THETA}
  }
 }