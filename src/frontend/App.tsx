import React, { FC, useEffect } from "react"
import { RouterProvider } from "react-router-dom"
import { Router } from "@/routes/_index"
import { useAuth } from "@/context/Auth"
import { useNft, useIcpLedger } from "@/hooks/_index"

// state
import { useAppDispatch } from "@/hooks/useRedux"
import { setSignInModalIsOpen } from "@/state/modals/signInModal"

const App: FC = (): JSX.Element => {
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
    if (!isAuthenticated) return
    dispatch(setSignInModalIsOpen(false))
  }, [isAuthenticated])

  useEffect(() => {
    if (accounntIdHex) {
      refreshIcpBalance(accounntIdHex)
    }
  }, [accounntIdHex])

  return <RouterProvider router={Router} />
}

export default App
