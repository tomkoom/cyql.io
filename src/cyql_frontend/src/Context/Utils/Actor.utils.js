// https://github.com/Psychedelic/nft-marketplace-fe/blob/develop/src/integrations/actor/actor.utils.ts

import { Actor, ActorSubclass, HttpAgent } from "@dfinity/agent";
import { IDL } from "@dfinity/candid";
import crownsIdlFactory from "../../declarations/nft.did";
import wicpIdlFactory from "../../declarations/wicp.did";
import marketplaceIdlFactory from "../../declarations/marketplace.did";
import capIdlFactory from "../../declarations/cap.did";
import config from "../../config/env";
import { AppLog } from "../../utils/log";

export const createActor = async ({
  serviceName = "marketplace",
  plugIsConnected = false,
  asPlugInstance = true,
}) => {
  let canisterId;
  let interfaceFactory;

  switch (serviceName) {
    case "crowns":
      canisterId = config.nftCollectionId;
      interfaceFactory = crownsIdlFactory;
      break;
    case "wicp":
      canisterId = config.wICPCanisterId;
      interfaceFactory = wicpIdlFactory;
      break;
    case "cap":
      canisterId = config.capRouterId;
      interfaceFactory = capIdlFactory;
      break;
    default:
      canisterId = config.marketplaceCanisterId;
      interfaceFactory = marketplaceIdlFactory;
      break;
  }

  if (plugIsConnected && asPlugInstance) {
    return window.ic?.plug?.createActor({
      canisterId,
      interfaceFactory,
      host: config.host,
    });
  }

  const agent = new HttpAgent({
    host: config.host,
  });

  if (process.env.NODE_ENV !== "production") {
    try {
      await agent.fetchRootKey();
    } catch (err) {
      console.warn("Oops! Unable to fetch root key, is the local replica running?");
      console.error(err);
    }
  }

  return Actor.createActor(interfaceFactory, {
    agent,
    canisterId,
  });
};

// Checks if an actor instance exists already
// otherwise creates a new instance
export const actorInstanceHandler = async ({ thunkAPI, serviceName, slice }) => {
  const {
    [serviceName]: { actor },
    plug: { isConnected: plugIsConnected },
  } = thunkAPI.getState();

  const currentAgent = actor && Actor.agentOf(actor);
  const currentAgentPrincipal = currentAgent && (await currentAgent.getPrincipal());

  const plugAgent = plugIsConnected && window.ic?.plug?.agent;
  const plugAgentPrincipal = plugAgent && (await plugAgent.getPrincipal());

  const isAnotherAgent =
    !currentAgentPrincipal || (plugAgentPrincipal && currentAgentPrincipal !== plugAgentPrincipal);

  if (!actor || isAnotherAgent) {
    AppLog.warn(`Creating new actor instance for ${serviceName}`);

    const asPlugInstance = serviceName !== "cap";

    const newActor = await createActor({
      serviceName,
      plugIsConnected,
      asPlugInstance,
    });

    // Set actor state
    thunkAPI.dispatch(slice.actions.setActor(newActor));

    return newActor;
  }

  return actor;
};
