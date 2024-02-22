import React, { createContext, useContext, useState, useEffect } from "react"
import { AuthClient } from "@dfinity/auth-client"
import { HttpAgent, Actor } from "@dfinity/agent"
import { Principal } from "@dfinity/principal"
import { createActor } from "../../declarations/backend/index"
import { _SERVICE } from "../../declarations/backend/backend.did"
import {
  APP_DERIVATION_ORIGIN,
  BACKEND_CANISTER_ID_IC,
  NFT_CANISTER_ID_IC,
  ICP_LEDGER_CANISTER_ID_IC,
  HOST,
} from "@/constants/constants"
import { isCustomDomain } from "@/utils/isCustomDomain"
import { getAccountIdHex } from "@/utils/getAccountIdHex"

// nft
import { idlFactory } from "@/idl/nft_idl"
import { _SERVICE as NFT_SERVICE } from "@/idl/nft_idl_interface"

// ledger
import { LedgerCanister } from "@dfinity/ledger-icp"

interface AuthContextValue {
  signInLoading: boolean
  isAuthenticated: boolean
  userPrincipal: Principal
  accounntIdHex: string
  userId: string
  actor: _SERVICE
  nft: NFT_SERVICE
  icp: LedgerCanister
  login: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue>(null)
const useAuth = () => {
  return useContext(AuthContext)
}

// note: .env variables change after deploy

function AuthProvider({ children }) {
  const [signInLoading, setSignInLoading] = useState<boolean>(false)
  const [authClient, setAuthClient] = useState<AuthClient | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [userPrincipal, setUserPrincipal] = useState<Principal | null>(null)
  const [accounntIdHex, setAccounntIdHex] = useState<string>("")
  const [userId, setUserId] = useState<string>("")
  const [actor, setActor] = useState<_SERVICE>(null)
  const [nft, setNft] = useState<NFT_SERVICE>(null)
  const [icp, setIcp] = useState<LedgerCanister>(null)

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
    let nft: NFT_SERVICE = null
    let icp: LedgerCanister = null

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

    // nft
    nft = Actor.createActor(idlFactory, {
      agent,
      canisterId: NFT_CANISTER_ID_IC,
    })

    // ledger
    icp = LedgerCanister.create({
      agent,
      canisterId: Principal.fromText(ICP_LEDGER_CANISTER_ID_IC),
    })

    setAuthClient(authClient)
    setIsAuthenticated(isAuthenticated)
    setUserPrincipal(userPrincipal)
    setAccounntIdHex(accounntIdHex)
    setUserId(userId)
    setActor(actor)
    setNft(nft)
    setIcp(icp)
  }

  const login = async (): Promise<void> => {
    if (isAuthenticated) throw new Error("already authed")

    setSignInLoading(true)
    authClient.login({
      // identityProvider: IDENTITY_PROVIDER,
      maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
      ...(isCustomDomain() && {
        derivationOrigin: APP_DERIVATION_ORIGIN,
      }),
      onSuccess: async () => {
        await resetii()
      },
    })
    setSignInLoading(false)
  }

  const logout = async (): Promise<void> => {
    if (!isAuthenticated) throw new Error("not authed")
    await authClient.logout()
    return resetii()
  }

  const value: AuthContextValue = {
    signInLoading,
    isAuthenticated,
    userPrincipal,
    accounntIdHex,
    userId,
    actor,
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
