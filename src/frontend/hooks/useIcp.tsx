import { useAuth } from "@/auth/Auth"
import { Principal } from "@dfinity/principal"
import {
  _SERVICE,
  Account,
  TransferArg,
  Result,
} from "@/idl/icrc1_ledger_types"
import { notifyErr, notifySuccess } from "@/utils/notify"
import { FEE } from "@/constants/constants"
import { NETWORK } from "@/constants/constants"

// state
import { useAppDispatch, useAppSelector } from "./useRedux"
import { setUserBalance, setUserBalanceIsLoading, Balance } from "@/state/user"
import { Token, setTokens, selectTokens } from "@/state/token/tokens"

export const useToken = () => {
  const dispatch = useAppDispatch()
  const { userPrincipal, chip, icp } = useAuth()
  const tokens = useAppSelector(selectTokens)
  const user: Account = {
    owner: userPrincipal,
    subaccount: [],
  }

  const sendTokens = async (
    icrc_ledger: _SERVICE,
    withdrawId: string,
    amountE8s: number,
  ): Promise<void> => {
    const to: Account = {
      owner: Principal.fromText(withdrawId),
      subaccount: [],
    }

    const transferArg: TransferArg = {
      to,
      fee: [],
      memo: [],
      from_subaccount: [],
      created_at_time: [],
      amount: BigInt(amountE8s - FEE),
    }

    await icrc_ledger
      .icrc1_transfer(transferArg)
      .then((transferRes) => {
        if ("Ok" in transferRes) {
          notifySuccess("transfer: ok")
        } else {
          console.error(transferRes)
          const msg = JSON.stringify(transferRes, (_, v) =>
            typeof v === "bigint" ? v.toString() : v,
          )
          notifyErr(msg)
        }
      })
      .catch((err) => {
        console.error(err)
        notifyErr(err.message)
      })
  }

  const sendTokens2 = async (
    icrc_ledger: _SERVICE,
    withdrawId: string,
    amountE8s: number,
  ): Promise<Result> => {
    const to: Account = {
      owner: Principal.fromText(withdrawId),
      subaccount: [],
    }

    const transferArg: TransferArg = {
      to,
      fee: [],
      memo: [],
      from_subaccount: [],
      created_at_time: [],
      amount: BigInt(amountE8s - FEE),
    }

    return await icrc_ledger.icrc1_transfer(transferArg)
  }

  const refreshBalance = async (icrc_token: _SERVICE): Promise<Balance> => {
    let balance: Balance = {}
    let symbol = ""

    await icrc_token.icrc1_symbol().then((res) => (symbol = res))

    if (symbol) {
      await icrc_token.icrc1_balance_of(user).then((res) => {
        balance = { [symbol]: { e8s: Number(res) } }
      })
    }
    return balance
  }

  const refreshBalances = async (): Promise<void> => {
    dispatch(setUserBalanceIsLoading(true))
    let bcs = {}
    if (chip) await refreshBalance(chip).then((b) => (bcs = { ...bcs, ...b }))
    if (icp) await refreshBalance(icp).then((b) => (bcs = { ...bcs, ...b }))
    if (NETWORK === "local") console.log("refresh balance:", bcs)
    dispatch(setUserBalance(bcs))
    dispatch(setUserBalanceIsLoading(false))
  }

  const setTokenMetadata = async (icrc_token: _SERVICE): Promise<void> => {
    const tn: Token = { symbol: "", name: "" }
    await icrc_token.icrc1_symbol().then((res) => (tn.symbol = res))
    await icrc_token.icrc1_name().then((res) => (tn.name = res))

    if (!tokens.some((t) => t.symbol === tn.symbol)) {
      dispatch(setTokens(tn))
    }
  }

  return {
    sendTokens,
    sendTokens2,
    refreshBalances,
    setTokenMetadata,
  }
}
