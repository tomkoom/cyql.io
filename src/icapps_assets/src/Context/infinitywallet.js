import { canisterId as cyqlCanId } from "../../../declarations/icapps/index";

// host
const host = "https://mainnet.dfinity.network";
// const host = "http://localhost:8080/";
// const host = "https://testnet.infinityswap.one";

const signInWithInfinityWallet = async (
  setPrincipalId,
  setPrincipalIdStr,
  setAccountId,
  setSignInMethod
) => {
  const whitelist = [canisterId];

  try {
    // const publicKey = await window.ic.infinityWallet.requestConnect({
    //   whitelist,
    //   host,
    // });
    await window.ic.infinityWallet.requestConnect({
      whitelist,
      host,
    });
    // createInfinityWalletActor();
    getInfinityWalletUserData(setPrincipalId, setPrincipalIdStr, setAccountId, setSignInMethod);
  } catch (err) {
    console.log(err);
  }
};

// const createInfinityWalletActor = () => {};

const getInfinityWalletUserData = async (
  setPrincipalId,
  setPrincipalIdStr,
  setAccountId,
  setSignInMethod
) => {
  const principalId = await window.ic.infinityWallet.getPrincipal();
  const accountId = await window.ic.infinityWallet.getAccountID();
  setPrincipalId(principalId);
  setPrincipalIdStr(principalId.toText());
  setAccountId(accountId);
  setSignInMethod("InfinityWallet");
};

const disconnectInfinityWallet = () => window.ic?.infinityWallet?.disconnect();

export { signInWithInfinityWallet, getInfinityWalletUserData, disconnectInfinityWallet };
