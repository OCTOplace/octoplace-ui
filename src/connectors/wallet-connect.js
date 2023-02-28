import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
const RPC_URLS= {
    361: "https://eth-rpc-api.thetatoken.org/rpc",
    2221:"https://evm.testnet.kava.io"
  }
export const walletconnect = new WalletConnectConnector({
    rpc: RPC_URLS,
    chainId: 361,
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true
  })