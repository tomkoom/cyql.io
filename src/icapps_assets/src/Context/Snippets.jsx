// ii
import { AuthClient } from "@dfinity/auth-client";
import { Actor, HttpAgent } from "@dfinity/agent";

const signInWithInternetIdentity = async () => {
  const authClient = await AuthClient.create();
  await new Promise((resolve, reject) => {
    authClient.login({
      onSuccess: resolve,
      onError: reject,
    });
  });
  const identity = authClient.getIdentity();
  const agent = new HttpAgent({ identity });
  const actor = Actor.createActor(idlFactory, {
    agent: agent,
    canisterId: canisterId,
  });
  const principal = await actor.whoami();
  setUserId(principal);
  dispatch(setSignInModal(false));
};

// plug

const signInWithPlug = async () => {
  try {
    await window.ic.plug.requestConnect({
      whitelist: [canisterId],
      host,
    });
    createActor();
    dispatch(setSignInModal(false));
  } catch (err) {
    console.log(err);
  }
};

const createActor = async () => {
  const actor = await window.ic.plug.createActor({
    canisterId: canisterId,
    interfaceFactory: idlFactory,
  });
  setPlugActor(actor);
  console.log(actor);
};
