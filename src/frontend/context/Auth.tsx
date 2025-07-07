import { getAccountIdHex, isCustomDomain } from "@/utils/index"
import { Actor, HttpAgent } from "@dfinity/agent"
import { AuthClient } from "@dfinity/auth-client"
import { Principal } from "@dfinity/principal"
import { ReactNode, createContext, useContext, useEffect, useState } from "react"

import {
  APP_DERIVATION_ORIGIN,
  BACKEND_CANISTER_ID_IC,
  HOST,
  ICP_LEDGER_CANISTER_ID_IC,
  NFT_CANISTER_ID_IC,
  PROPOSALS_CANISTER_ID_IC,
  USERS_CANISTER_ID_IC,
} from "@/constants/constants"

// canister interfaces
import { _SERVICE as BACKEND_SERVICE } from "../../declarations/backend/backend.did"
import * as CuratedProjects from "../../declarations/backend/index"

import * as Users from "../../declarations/users/index"
import { _SERVICE as USERS_SERVICE } from "../../declarations/users/users.did"

import * as Proposals from "../../declarations/proposals/index"
import { _SERVICE as PROPOSALS_SERVICE } from "../../declarations/proposals/proposals.did"

import { idlFactory as NFT_IDL } from "@/idl/nft_idl"
import { _SERVICE as NFT_SERVICE } from "@/idl/nft_idl_service"

import { idlFactory as ICP_LEDGER_IDL } from "@/idl/ledger_idl"
import { _SERVICE as ICP_LEDGER_SERVICE } from "@/idl/ledger_idl_service"

interface AuthContextValue {
  isAuthenticated: boolean
  userPrincipal: Principal | null
  accounntIdHex: string
  userId: string
  login: () => Promise<void>
  logout: () => Promise<void>
  actor: BACKEND_SERVICE
  users: USERS_SERVICE
  proposals: PROPOSALS_SERVICE
  nft: NFT_SERVICE
  icp: ICP_LEDGER_SERVICE
}

const AuthContext = createContext<AuthContextValue>(null)
const useAuth = () => useContext(AuthContext)

function AuthProvider({ children }: { children: ReactNode }) {
  const [authClient, setAuthClient] = useState<AuthClient | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userPrincipal, setUserPrincipal] = useState<Principal | null>(null)
  const [accounntIdHex, setAccounntIdHex] = useState("")
  const [userId, setUserId] = useState("")

  const [actor, setActor] = useState<BACKEND_SERVICE>(null)
  const [users, setUsers] = useState<USERS_SERVICE>(null)
  const [proposals, setProposals] = useState<PROPOSALS_SERVICE>(null)
  const [nft, setNft] = useState<NFT_SERVICE>(null)
  const [icp, setIcp] = useState<ICP_LEDGER_SERVICE>(null)

  useEffect(() => {
    resetSession()
  }, [])

  // Listen for when user returns from Internet Identity
  useEffect(() => {
    let focusTimeout: NodeJS.Timeout

    const handleWindowFocus = () => {
      // Clear any existing timeout
      if (focusTimeout) clearTimeout(focusTimeout)

      // Check if we just returned from Internet Identity
      const urlParams = new URLSearchParams(window.location.search)
      const hasIICallback = urlParams.has("sessionkey") || window.location.hash.includes("sessionkey")

      if (hasIICallback) {
        console.log("🔄 Detected return from Internet Identity, refreshing auth state...")
        resetSession()
      } else if (!isAuthenticated) {
        // If not currently authenticated, check if we should be after a small delay
        // This handles cases where URL params aren't present but user completed II flow
        focusTimeout = setTimeout(async () => {
          if (authClient) {
            const wasAuthenticated = await authClient.isAuthenticated()
            if (wasAuthenticated && !isAuthenticated) {
              // console.log("🔄 Authentication detected on focus, refreshing auth state...")
              resetSession()
            }
          }
        }, 500)
      }
    }

    const handleVisibilityChange = () => {
      if (!document.hidden && !isAuthenticated) {
        // Check if we just returned from Internet Identity
        const urlParams = new URLSearchParams(window.location.search)
        const hasIICallback = urlParams.has("sessionkey") || window.location.hash.includes("sessionkey")

        if (hasIICallback) {
          console.log("🔄 Detected return from Internet Identity via visibility change, refreshing auth state...")
          resetSession()
        }
      }
    }

    window.addEventListener("focus", handleWindowFocus)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      window.removeEventListener("focus", handleWindowFocus)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      if (focusTimeout) clearTimeout(focusTimeout)
    }
  }, [isAuthenticated, authClient])

  const resetSession = async (): Promise<void> => {
    const authClient = await AuthClient.create()
    const isAuthed = await authClient.isAuthenticated()
    const identity = authClient.getIdentity()

    const principal = identity.getPrincipal()
    const accountHex = getAccountIdHex(principal)

    const agent = new HttpAgent({ host: HOST, identity })
    if (HOST.includes("localhost")) await agent.fetchRootKey()

    const backendActor = CuratedProjects.createActor(BACKEND_CANISTER_ID_IC, { agent })
    const usersActor = Users.createActor(USERS_CANISTER_ID_IC, { agent })
    const proposalsActor = Proposals.createActor(PROPOSALS_CANISTER_ID_IC, { agent })
    const nftActor = Actor.createActor(NFT_IDL, {
      agent,
      canisterId: NFT_CANISTER_ID_IC,
    }) as NFT_SERVICE
    const icpActor = Actor.createActor(ICP_LEDGER_IDL, {
      agent,
      canisterId: ICP_LEDGER_CANISTER_ID_IC,
    }) as ICP_LEDGER_SERVICE

    setAuthClient(authClient)
    setIsAuthenticated(isAuthed)
    setUserPrincipal(principal)
    setAccounntIdHex(accountHex)
    setUserId(principal.toString())

    setActor(backendActor)
    setUsers(usersActor)
    setProposals(proposalsActor)
    setNft(nftActor)
    setIcp(icpActor)
  }

  const login = async (): Promise<void> => {
    if (isAuthenticated || !authClient) return

    try {
      // console.log("🔐 Initiating Internet Identity login...")
      await authClient.login({
        maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1_000_000_000), // 7 days
        ...(isCustomDomain() && { derivationOrigin: APP_DERIVATION_ORIGIN }),
      })
      // Don't call resetSession() here - let the window focus/visibility listeners handle it
      // when the user returns from Internet Identity
      // console.log("🔐 Login initiated, waiting for user to return from Internet Identity...")
    } catch (error) {
      console.warn("Login failed:", error)
    }
  }

  const logout = async (): Promise<void> => {
    if (!isAuthenticated || !authClient) return
    await authClient.logout()
    await resetSession()
  }

  const value: AuthContextValue = {
    isAuthenticated,
    userPrincipal,
    accounntIdHex,
    userId,
    actor,
    users,
    proposals,
    nft,
    icp,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { useAuth }
export default AuthProvider
