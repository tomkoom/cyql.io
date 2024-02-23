import { AccountIdentifier } from "@dfinity/ledger-icp"
import { useAuth } from "@/context/Auth"
import { ICP_FEE_E8S } from "@/constants/constants"
import { TransferArgs } from "@/idl/ledger_idl_service"

// state
import { useAppDispatch } from "./useRedux"
import { setUserBalanceIcp } from "@/state/user"

interface UseIcpLedger {
  refreshIcpBalance: (accounntIdHex: string) => Promise<void>
  sendIcp: (accounntIdHex: string, amountE8s: number) => Promise<void>
}

export const useIcpLedger = (): UseIcpLedger => {
  const dispatch = useAppDispatch()
  const { icp } = useAuth()

  const refreshIcpBalance = async (accounntIdHex: string): Promise<void> => {
    const accountId = AccountIdentifier.fromHex(accounntIdHex)
    const accountIdUint8Array = accountId.toUint8Array()

    await icp
      .account_balance({ account: accountIdUint8Array })
      .then((res) => {
        const userBalance = { e8s: Number(res.e8s) }
        dispatch(setUserBalanceIcp(userBalance))
      })
      .catch((err) => console.log(err))
  }

  const sendIcp = async (accounntIdHex: string, amountE8s: number): Promise<void> => {
    const accountId = AccountIdentifier.fromHex(accounntIdHex)
    const accountIdUint8Array = accountId.toUint8Array()
    const amountMinusFee = { e8s: BigInt(amountE8s - ICP_FEE_E8S) }
    const fee = { e8s: BigInt(ICP_FEE_E8S) }

    const transferArgs: TransferArgs = {
      to: accountIdUint8Array,
      amount: amountMinusFee,
      fee,
      memo: BigInt(0),
      from_subaccount: [],
      created_at_time: [],
    }

    await icp.transfer(transferArgs)
  }

  return { refreshIcpBalance, sendIcp }
}
