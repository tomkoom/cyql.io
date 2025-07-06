import { Btn } from "@/components/btns"
import { useAppDispatch } from "@/hooks/useRedux"
import { setNftModal } from "@/state/modals/nftModal"
import React from "react"

export default function NftBtn() {
  const dispatch = useAppDispatch()

  const openNftModal = (): void => {
    dispatch(setNftModal(true))
  }

  return <Btn btnType="secondary" text="cyql NFTs" onClick={openNftModal} />
}
