import React, { FC } from "react"
import { Btn } from "@/components/btns/_index"

// state
import { useAppDispatch } from "@/hooks/useRedux"
import { setNftModal } from "@/state/modals/nftModal"

const NftBtn: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const openNftModal = (): void => {
    dispatch(setNftModal(true))
  }

  return <Btn btnType={"secondary"} text={"cyql NFTs"} onClick={openNftModal} />
}

export default NftBtn
