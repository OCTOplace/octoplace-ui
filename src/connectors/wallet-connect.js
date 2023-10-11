import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { getConfig } from "../config/config";

const config = getConfig();

const RPC_URLS = {
  // 361: "https://eth-rpc-api.thetatoken.org/rpc",
  // 2222: "https://evm.kava.io",
};

RPC_URLS[config.thetaChainId] = config.thetaBlockExplorerUrl;
RPC_URLS[config.kavaChainId] = config.kavaBlockExplorerUrl;

export const walletconnect = new WalletConnectConnector({
  rpc: RPC_URLS,
  chainId: config.thetaChainId, // 361,
  bridge: config.thetaBlockExplorerUrl, // "https://bridge.walletconnect.org",
  qrcode: true,
});
