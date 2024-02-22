import { useAuth } from "@/context/Auth"

// state
import { useAppDispatch } from "./useRedux"
import { setUserBalanceIcp } from "@/state/user"

export const useIcpLedger = () => {
  const dispatch = useAppDispatch()
  const { icp } = useAuth()

  const refreshIcpBalance = async (accounntIdHex: string): Promise<void> => {
    const certified = false

    await icp.accountBalance({ certified, accountIdentifier: accounntIdHex }).then((res) => {
      dispatch(setUserBalanceIcp({ e8s: Number(res) }))
    })
  }

  return { refreshIcpBalance }
}
