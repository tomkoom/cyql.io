import React, { createContext, useContext, useState, useEffect } from "react"
import { AuthClient } from "@dfinity/auth-client"
import { HttpAgent, Actor } from "@dfinity/agent"
import { Principal } from "@dfinity/principal"
import { createActor } from "../../declarations/backend/index"
import { _SERVICE } from "../../declarations/backend/backend.did"

import {
  APP_DERIVATION_ORIGIN,
  BACKEND_CANISTER_ID_IC,
  PROPOSALS_CANISTER_ID_IC,
  NFT_CANISTER_ID_IC,
  ICP_LEDGER_CANISTER_ID_IC,
  HOST,
} from "@/constants/constants"
import { isCustomDomain } from "@/utils/isCustomDomain"
import { getAccountIdHex } from "@/utils/getAccountIdHex"

// proposals
import { _SERVICE as PROPOSALS_SERVICE } from "../../declarations/proposals/proposals.did"
import { idlFactory as PROPOSALS_IDL } from "@/idl/proposals.did"

// nft
import { idlFactory as NFT_IDL } from "@/idl/nft_idl"
import { _SERVICE as NFT_SERVICE } from "@/idl/nft_idl_service"

// ledger
import { idlFactory as ICP_LEDGER_IDL } from "@/idl/ledger_idl"
import { _SERVICE as ICP_LEDGER_SERVICE } from "@/idl/ledger_idl_service"

interface AuthContextValue {
  isAuthenticated: boolean
  userPrincipal: Principal
  accounntIdHex: string
  userId: string
  actor: _SERVICE
  proposals: PROPOSALS_SERVICE
  nft: NFT_SERVICE
  icp: ICP_LEDGER_SERVICE
  login: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue>(null)
const useAuth = () => {
  return useContext(AuthContext)
}

// note: .env variables change after deploy

function AuthProvider({ children }) {
  const [authClient, setAuthClient] = useState<AuthClient | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [userPrincipal, setUserPrincipal] = useState<Principal | null>(null)
  const [accounntIdHex, setAccounntIdHex] = useState<string>("")
  const [userId, setUserId] = useState<string>("")
  const [actor, setActor] = useState<_SERVICE>(null)
  const [proposals, setProposals] = useState<PROPOSALS_SERVICE>(null)
  const [nft, setNft] = useState<NFT_SERVICE>(null)
  const [icp, setIcp] = useState<ICP_LEDGER_SERVICE>(null)

  const init = (): void => {
    resetii()
  }

  useEffect(() => {
    init()
  }, [])

  const resetii = async (): Promise<void> => {
    let authClient: AuthClient = null
    let isAuthenticated: boolean = false
    let identity = null
    let userPrincipal: Principal = null
    let accounntIdHex: string = ""
    let userId: string = ""
    let actor: _SERVICE = null
    let proposals: PROPOSALS_SERVICE = null
    let nft: NFT_SERVICE = null
    let icp: ICP_LEDGER_SERVICE = null

    // ...
    authClient = await AuthClient.create()
    isAuthenticated = await authClient.isAuthenticated()
    identity = authClient.getIdentity()
    userPrincipal = identity.getPrincipal()
    accounntIdHex = getAccountIdHex(userPrincipal)
    userId = userPrincipal.toString()
    const agent = new HttpAgent({
      host: HOST,
      identity,
    })

    // main
    actor = createActor(BACKEND_CANISTER_ID_IC, {
      agent,
    })

    // proposals
    proposals = Actor.createActor(PROPOSALS_IDL, {
      agent,
      canisterId: PROPOSALS_CANISTER_ID_IC,
    })

    // nft
    nft = Actor.createActor(NFT_IDL, {
      agent,
      canisterId: NFT_CANISTER_ID_IC,
    })

    // ledger
    icp = Actor.createActor(ICP_LEDGER_IDL, {
      agent,
      canisterId: ICP_LEDGER_CANISTER_ID_IC,
    })

    setAuthClient(authClient)
    setIsAuthenticated(isAuthenticated)
    setUserPrincipal(userPrincipal)
    setAccounntIdHex(accounntIdHex)
    setUserId(userId)
    setActor(actor)
    setProposals(proposals)
    setNft(nft)
    setIcp(icp)
  }

  const login = async (): Promise<void> => {
    if (isAuthenticated) throw new Error("already authed")

    await authClient.login({
      // identityProvider: IDENTITY_PROVIDER,
      maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000), // 7 days in nanoseconds
      ...(isCustomDomain() && {
        derivationOrigin: APP_DERIVATION_ORIGIN,
      }),
      onSuccess: async () => {
        await resetii()
      },
    })
  }

  const logout = async (): Promise<void> => {
    if (!isAuthenticated) throw new Error("not authed")
    await authClient.logout()
    return resetii()
  }

  const value: AuthContextValue = {
    isAuthenticated,
    userPrincipal,
    accounntIdHex,
    userId,
    actor,
    proposals,
    nft,
    icp,

    // ...
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { useAuth }
export default AuthProvider
