import { InjectedConnector } from "@web3-react/injected-connector";
import { ChainIds } from "./networks";

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    ChainIds.THETA, // 361
    ChainIds.KAVA, // 2222
  ],
});

export function activateInjectedProvider(providerName) {
  const { ethereum } = window;

  if (!ethereum?.providers) {
    return undefined;
  }

  let provider;
  switch (providerName) {
    case "CoinBase":
      provider = ethereum.providers.find(
        ({ isCoinbaseWallet }) => isCoinbaseWallet
      );
      break;
    case "MetaMask":
      provider = ethereum.providers.find(({ isMetaMask }) => isMetaMask);
      break;
    default:
      break;
  }

  if (provider) {
    ethereum.setSelectedProvider(provider);
  }
}
