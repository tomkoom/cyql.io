import { Actor, HttpAgent } from "@dfinity/agent"
import type { Identity } from "@dfinity/agent"
import { HOST } from "@/constants/constants.js"

export const createActor = async (identity: Identity, canisterId: string, idlFactory: any) => {
  const agent = new HttpAgent({ host: HOST, identity })

  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
  })
}
