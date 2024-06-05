import React, { FC } from "react"
import styled from "styled-components"
import { Btn } from "@/components/btns/_index"
import { E8S, ICP_FEE_E8S } from "@/constants/constants"
import { WithdrawModal } from "@/modals/_index"
import { IC_LOGO } from "@/constants/constants"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import { selectUserBalanceIcp } from "@/state/user"
import { setWithdrawModalIsOpen, selectWithdrawModalIsOpen, setWithdrawModalToken, setWithdrawModalAmountE8s } from "@/state/modals/withdrawModal"

const Wallet: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const balanceIcp = useAppSelector(selectUserBalanceIcp)
  const symbol = "ICP"
  const balanceIcpE8s = balanceIcp.e8s > 0 ? (balanceIcp.e8s / E8S).toString() : balanceIcp.e8s.toString()
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

      <div className="main">
        <h4>Wallet</h4>

        <ul>
          <li>
            <div className="title">
              <img src={IC_LOGO} alt="Internet Computer logo" />
              <h5>{symbol}</h5>
            </div>

            <span>
              {balanceIcpE8s} {symbol}
            </span>

            <Btn style={{ backgroundColor: "var(--underlay2)" }} btnType={"secondary"} text={"Withdraw"} onClick={openWithdrawModal} disabled={isBtnDisabled} />
          </li>

          <li>
            <p>...</p>
          </li>
        </ul>
      </div>
    </WalletStyled>
  )
}

const WalletStyled = styled.div`
  width: 100%;

  > div.main {
    > h4 {
      margin-bottom: 1rem;
    }

    > ul {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
      gap: 0.5rem;

      > li {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
        background-color: var(--underlay1);
        padding: 1rem;
        text-align: left;

        > div.title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;

          > img {
            width: 2.5rem;
            height: 2.5rem;
            display: grid;
            place-items: center;
            background-color: var(--underlay2);
            padding: 0.25rem;
            border-radius: 50%;
          }
        }

        > span {
          font-size: var(--fs5);
        }
      }
    }
  }
`

export default Wallet
