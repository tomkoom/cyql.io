import React, { createContext, useContext, useState, useEffect } from "react"

// constants
import { APP_DERIVATION_ORIGIN } from "@/constants/constants"

// utils
import { isCustomDomain } from "@/utils/isCustomDomain"

// juno
import {
  authSubscribe,
  InternetIdentityProvider,
  NFIDProvider,
  login,
  logout as junoSignOut,
} from "@junobuild/core"

const AuthContext = createContext()
const useAuth = () => {
  return useContext(AuthContext)
}

function AuthProvider({ children }) {
  const [userId, setUserId] = useState("")
  const [signInLoading, setSignInLoading] = useState(false)

  // ii
  const signInWithII = async () => {
    setSignInLoading(true)

    await login({
      provider: new InternetIdentityProvider({
        domain: "ic0.app",
      }),
      windowed: false,
      // if domain is custom, use canonical origin (canister-id domain)
      ...(isCustomDomain() && {
        derivationOrigin: APP_DERIVATION_ORIGIN,
      }),
    }).catch((err) => {
      console.log(err)
      setSignInLoading(false)
    })
    setSignInLoading(false)
  }

  // nfid
  const signInWithNfid = async () => {
    const appName = "cyql.io"
    const logoUrl = "https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/cyql-favicon.svg"

    setSignInLoading(true)
    await login({
      provider: new NFIDProvider({
        appName,
        logoUrl,
      }).catch((err) => {
        console.log(err)
        setSignInLoading(false)
      }),
    })
    setSignInLoading(false)
  }

  useEffect(() => {
    const sub = authSubscribe((user) => {
      if (user !== null) {
        setSignInLoading(true)
        setUserId(user.key)
        setSignInLoading(false)
      }
    })
    return () => sub()
  }, [])

  const logout = async () => {
    await junoSignOut()

    // clear state
    setUserId("")
  }

  const value = {
    userId,
    signInLoading,

    // juno
    signInWithII,
    signInWithNfid,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { useAuth }
export default AuthProvider
