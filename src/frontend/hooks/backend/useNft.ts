import { useAuth } from "@/context/Auth"
import { TransferRequest, User } from "@/idl/nft_idl_service"
import { setNftIdsOwned, setVotingPower } from "@/state/user"
import { getTokenIdentifier } from "@/utils/ext_token/getTokenIdentifier"
import { useAppDispatch } from "../useRedux"

interface UseNft {
  refreshNfts: () => Promise<void>
  sendNft: (nftIdx: number, toAccountIdHex: string) => Promise<void>
}

export const useNft = (): UseNft => {
  const dispatch = useAppDispatch()
  const { nft, accounntIdHex } = useAuth()

  const refreshNfts = async (): Promise<void> => {
    try {
    } catch (e) {
      console.log(e)
    }

    await nft.tokens(accounntIdHex).then((res) => {
      if ("ok" in res) {
        const array = Array.from(res.ok)
        dispatch(setNftIdsOwned(array))

        // voting power
        const initialVotingPower = 1
        dispatch(setVotingPower(initialVotingPower + array.length * 10))
      }
    })
  }

  const sendNft = async (nftIdx: number, toAccountIdHex: string): Promise<void> => {
    const toUser: User = {
      address: toAccountIdHex,
    }

    const fromUser: User = {
      address: accounntIdHex,
    }

    const tokenId = getTokenIdentifier(nftIdx)

    const arg: TransferRequest = {
      to: toUser,
      token: tokenId,
      notify: false,
      from: fromUser,
      memo: [],
      subaccount: [],
      amount: BigInt(1),
    }
    await nft.transfer(arg)
  }

  return { refreshNfts, sendNft }
}
