import { useAuth } from "@/context/Auth"
import { useIcpLedger, useNft } from "@/hooks"
import { useAppDispatch } from "@/hooks/useRedux"
import { Router } from "@/routes"
import { setSignInModalIsOpen } from "@/state/modals/signInModal"
import React, { useEffect } from "react"
import { RouterProvider } from "react-router-dom"

export default function App() {
  const dispatch = useAppDispatch()
  const { nft, isAuthenticated, accounntIdHex } = useAuth()
  const { refreshNfts } = useNft()
  const { refreshIcpBalance } = useIcpLedger()

  useEffect(() => {
    if (nft && isAuthenticated && accounntIdHex) {
      refreshNfts()
    }
  }, [nft, isAuthenticated, accounntIdHex])

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(setSignInModalIsOpen(false))
    }
  }, [isAuthenticated, dispatch])

  useEffect(() => {
    if (accounntIdHex) {
      refreshIcpBalance(accounntIdHex)
    }
  }, [accounntIdHex])

  return <RouterProvider router={Router} />
}
