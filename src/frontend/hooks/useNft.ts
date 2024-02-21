import { useAuth } from "@/context/Auth"

// state
import { useAppDispatch } from "./useRedux"
import { setNftIdsOwned } from "@/state/user"

export const useNft = () => {
  const dispatch = useAppDispatch()
  const { nft, accounntIdHex } = useAuth()

  const refreshUserOwnedNfts = async (): Promise<void> => {
    let registry = []
    await nft.getRegistry().then((res) => (registry = res))

    const filtered = registry.filter((item) => item[1] === accounntIdHex).map((item) => item[0])

    dispatch(setNftIdsOwned(filtered))
  }

  return { refreshUserOwnedNfts }
}
