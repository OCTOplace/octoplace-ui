import { InjectedConnector } from "@web3-react/injected-connector";

const chainIds = {
  THETA: 0x169,
  THETA_TEST: 0x16d,
  KAVA: 0x8ae,
  KAVA_TEST: 0x8ad,
};

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    process.env.NODE_ENV === "production"
      ? chainIds.THETA
      : chainIds.THETA_TEST,
    process.env.NODE_ENV === "production" ? chainIds.KAVA : chainIds.KAVA_TEST,
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
