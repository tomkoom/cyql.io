// https://github.com/Psychedelic/nft-marketplace-fe/blob/develop/src/integrations/plug/plug.utils.ts

// import { formatICNSName } from "../../utils/icns";

export const requestConnectToPlug = (args) => window.ic?.plug?.requestConnect(args);

export const createPlugAgent = async (args) => {
  await window.ic?.plug?.createAgent(args);

  if (process.env.NODE_ENV !== "production") {
    await window.ic?.plug?.agent?.fetchRootKey();
  }

  return window.ic?.plug?.agent;
};

export const isPlugInstalled = (global = window) =>
  (global?.ic && typeof global.ic?.plug === "object") || false;

export const checkIsConnected = () => window.ic?.plug?.isConnected();

export const getPrincipal = () => window.ic?.plug?.getPrincipal();

export const formatAddress = (address) => {
  if (!address) {
    return "";
  }
  return `${address.substring(0, 5)}...${address.substring(address.length - 3, address.length)}`;
};

export const hasPlugAgent = () => window.ic?.plug?.agent;

export const disconnectPlug = () => window.ic?.plug?.disconnect();

export const getPlugWalletBalance = () => window.ic?.plug?.requestBalance();

export const getICNSInfo = () => window.ic?.plug?.getICNSInfo();

export const getPlugButtonText = (params) => {
  const { icnsName, principalId, loadingText } = params;

  if (!principalId) return loadingText;

  // if (icnsName) return formatICNSName(icnsName);

  return formatAddress(principalId);
};

// https://docs.plugwallet.ooo/getting-started/connect-to-plug/#accessing-session-data

// const principalIdStr = window.ic.plug.sessionManager.sessionData.principalId;
// const accountId = window.ic.plug.sessionManager.sessionData.accountId;
// const agent = window.ic.plug.sessionManager.sessionData.agent;
// console.log(window.ic.plug.sessionManager.sessionData);
