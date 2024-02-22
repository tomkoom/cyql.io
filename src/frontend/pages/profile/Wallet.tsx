import React, { FC } from "react"
import styled from "styled-components"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectUserBalanceIcp } from "@/state/user"
import { E8S } from "@/constants/constants"

const Wallet: FC = (): JSX.Element => {
  const balanceIcp = useAppSelector(selectUserBalanceIcp)

  return (
    <WalletStyled>
      <h4>wallet</h4>
      <p>icp: {balanceIcp.e8s > 0 ? (balanceIcp.e8s / E8S).toString() : balanceIcp.e8s}</p>
    </WalletStyled>
  )
}

const WalletStyled = styled.div`
  > h4 {
    margin-bottom: 0.5rem;
  }
`

export default Wallet
