const mainnetConfig = require("./mainnet-config");
const testnetConfig = require("./testnet-config");

const getConfig = () => {
  switch (process.env.REACT_APP_ENV) {
    case "production":
      return mainnetConfig;
    case "development":
      return testnetConfig;
    default:
      throw new Error(`Unknown environment: ${process.env.REACT_APP_ENV}`);
  }
};

const isProduction = () => {
  return process.env.REACT_APP_ENV === "production";
};

export { getConfig, isProduction };
