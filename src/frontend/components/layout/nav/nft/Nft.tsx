import { NftBtn } from "."
import { NftModal } from "@/modals/_index"
import { useAppSelector } from "@/hooks/useRedux"
import React from "react"
import { selectNftModal } from "@/state/modals/nftModal"

export default function Nft() {
  const isOpen = useAppSelector(selectNftModal)

  return (
    <div>
      <NftModal isOpen={isOpen} />
      <NftBtn />
    </div>
  )
}
