import { useAuth } from "@/context/Auth"
import { TokenIndex, AccountIdentifier__1 } from "@/idl/nft_idl_interface"

// state
import { useAppDispatch } from "./useRedux"
import { setNftIdsOwned } from "@/state/user"

interface UseNft {
  refreshOwnedNfts: () => Promise<void>
  sendNft: () => Promise<void>
}

export const useNft = (): UseNft => {
  const dispatch = useAppDispatch()
  const { nft, accounntIdHex } = useAuth()

  const refreshOwnedNfts = async (): Promise<void> => {
    await nft.tokens(accounntIdHex).then((res) => {
      if ("ok" in res) {
        const array = Array.from(res.ok)
        dispatch(setNftIdsOwned(array))
      }
    })
  }

  const sendNft = async (): Promise<void> => {}

  return { refreshOwnedNfts, sendNft }
}
