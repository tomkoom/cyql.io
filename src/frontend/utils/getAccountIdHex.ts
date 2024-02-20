// https://github.com/dfinity/ic-js/tree/main/packages/ledger-icp#factory-accountidentifier
import { AccountIdentifier } from "@dfinity/ledger-icp"
import { Principal } from "@dfinity/principal"

export const getAccountIdHex = (principal: Principal): string => {
  const accId: AccountIdentifier = AccountIdentifier.fromPrincipal({
    principal,
  })
  return accId.toHex()
}
