import React, { FC } from "react"
import styled from "styled-components"
import { Btn } from "@/components/btns/_index"
import { E8S, ICP_FEE_E8S } from "@/constants/constants"
import { WithdrawModal } from "@/modals/_index"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import { selectUserBalanceIcp } from "@/state/user"
import {
  setWithdrawModalIsOpen,
  selectWithdrawModalIsOpen,
  setWithdrawModalToken,
  setWithdrawModalAmountE8s,
} from "@/state/modals/withdrawModal"

const Wallet: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const balanceIcp = useAppSelector(selectUserBalanceIcp)
  const symbol = "ICP"
  const balanceIcpE8s =
    balanceIcp.e8s > 0 ? (balanceIcp.e8s / E8S).toString() : balanceIcp.e8s.toString()
  const isBtnDisabled = !balanceIcp.e8s || balanceIcp.e8s < ICP_FEE_E8S

  // modal
  const isWithdrawModalOpen = useAppSelector(selectWithdrawModalIsOpen)

  const openWithdrawModal = (): void => {
    dispatch(setWithdrawModalToken(symbol))
    dispatch(setWithdrawModalAmountE8s(balanceIcp.e8s))
    dispatch(setWithdrawModalIsOpen(true))
  }

  const closeWithdrawModal = (): void => {
    dispatch(setWithdrawModalToken(""))
    dispatch(setWithdrawModalAmountE8s(0))
    dispatch(setWithdrawModalIsOpen(false))
  }

  return (
    <WalletStyled>
      <WithdrawModal isOpen={isWithdrawModalOpen} onClose={closeWithdrawModal} />
      <div>
        <h4>wallet</h4>

        <ul>
          <li>
            <span>{symbol}</span>
            <span>
              {balanceIcpE8s} {symbol}
            </span>
            <Btn
              btnType={"secondary"}
              text={"Withdraw"}
              onClick={openWithdrawModal}
              disabled={isBtnDisabled}
            />
          </li>
        </ul>
      </div>
    </WalletStyled>
  )
}

const WalletStyled = styled.div`
  width: 100%;

  > div {
    width: 100%;

    > h4 {
      margin-bottom: 1rem;
    }

    > ul {
      > li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 0.5rem;
        background-color: var(--underlay1);
        padding: 0.5rem 0.75rem;
      }
    }
  }
`

export default Wallet
