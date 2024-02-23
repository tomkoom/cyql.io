import React, { FC, useState, ChangeEvent } from "react"
import styled from "styled-components"
import CrossIcon from "@/components/icons/CrossIcon"
import { E8S, FEE_E8S } from "@/constants/constants"
import { Btn } from "@/components/btns/_index"
import type { Tokens } from "@/state/_types/types"
import { DISCORD_URL } from "@/constants/constants"

// hooks
import { useAuth } from "@/context/Auth"
import { useIcpLedger } from "@/hooks/useIcpLedger"

// components
import { RootModal } from "../_index"
import { Steps } from "./_index"
import { TextInput } from "@/components/ui/_index"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import { selectWithdrawModalToken } from "@/state/modals/withdrawModal"
import { selectUser } from "@/state/user"
import { setIsLoading } from "@/state/loading"

interface WithdrawModalProps {
  isOpen: boolean
  onClose: () => void
}

const getWithdrawAmountStr = (balanceIcp: Tokens, tokenSymbol: string): string => {
  return ((balanceIcp.e8s - FEE_E8S) / E8S).toString() + " " + tokenSymbol
}

const WithdrawModal: FC<WithdrawModalProps> = ({ isOpen, onClose }): JSX.Element => {
  const dispatch = useAppDispatch()
  const { userPrincipal, accounntIdHex } = useAuth()
  const { refreshIcpBalance, sendIcp } = useIcpLedger()
  const [withdrawalPrincipalId, setWithdrawalPrincipalId] = useState<string>("")
  const [err, setErr] = useState<string>("")
  const [step, setStep] = useState<number>(1)

  // token
  const { balanceIcp } = useAppSelector(selectUser)
  const tokenSymbol = useAppSelector(selectWithdrawModalToken)
  const withdrawAmountStr = getWithdrawAmountStr(balanceIcp, tokenSymbol)

  const reset = (): void => {
    onClose()
    setWithdrawalPrincipalId("")
    setStep(1)
  }

  const validateId = (): boolean => {
    setErr("")
    if (withdrawalPrincipalId === "") {
      setErr("can't be empty")
      return false
    }

    return true
  }

  const setId = (e: ChangeEvent<HTMLInputElement>): void => {
    setWithdrawalPrincipalId(e.target.value)
  }

  const nextStep = (): void => {
    if (validateId()) {
      setStep(2)
    }
  }

  const confirm = async (): Promise<void> => {
    dispatch(setIsLoading(true))
    const amountE8s = balanceIcp.e8s
    await sendIcp(withdrawalPrincipalId, amountE8s)
    await refreshIcpBalance(accounntIdHex)
    dispatch(setIsLoading(false))
    reset()
  }

  return (
    <RootModal isOpen={isOpen}>
      <WithdrawModalStyled>
        <CrossIcon onClick={reset} />
        <Steps step={step} />

        {step === 1 ? (
          <div className="step">
            <Inputs>
              <div className="input_field">
                <label htmlFor="withdraw_address">
                  enter destination <span>principal id</span>
                </label>

                <TextInput
                  id="withdraw_address"
                  type="text"
                  value={withdrawalPrincipalId}
                  placeholder={`e.g. ${userPrincipal}`}
                  onChange={(e) => setId(e)}
                />

                {err && <span style={{ color: "var(--colorErr)" }}>{err}</span>}
              </div>

              <div className="input_field">
                <label htmlFor="withdraw_amount">
                  amount to withdraw (readonly, all amount to be withdrawn atm)
                </label>

                <TextInput id="withdraw_amount" type="text" value={withdrawAmountStr} readOnly />

                <span className="hint">(balance minus fee)</span>
              </div>
            </Inputs>

            <Btn btnType={"primary"} text={"Withdraw"} onClick={nextStep} />

            <a href={DISCORD_URL} target="_blank" rel="noreferrer noopener">
              get support
            </a>
          </div>
        ) : step === 2 ? (
          <div className="step">
            <Confirm>
              <div className="data_field">
                <p className="label">withdraw to principal id</p>
                <p className="value">{withdrawalPrincipalId}</p>
              </div>

              <div className="data_field">
                <p className="label">withdrawal amount</p>
                <p className="value">{withdrawAmountStr}</p>
              </div>
            </Confirm>

            <Btn btnType={"primary"} text={"Confirm"} onClick={confirm} />
          </div>
        ) : (
          ""
        )}
      </WithdrawModalStyled>
    </RootModal>
  )
}

const WithdrawModalStyled = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;

  /* ... */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  background-color: var(--background);
  padding: 1rem;

  > div.step {
    max-width: 40rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;

    > a {
      color: var(--secondaryColor);
      transition: var(--transition1);

      &:hover {
        color: var(--primaryColor);
      }
    }
  }
`

const Inputs = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > div.input_field {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    text-align: center;

    > label {
      color: var(--secondaryColor);
      margin-bottom: 0.25rem;

      > span {
        color: var(--primaryColor);
        font-weight: var(--fwMedium);
      }
    }

    > input {
      box-sizing: border-box;
      padding: 0.5rem;
      text-align: center;
    }

    > span.hint {
      color: var(--tertiaryColor);
      margin-top: 0.125rem;
    }
  }
`

const Confirm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: var(--primaryColor);

  > div.data_field {
    text-align: center;

    > p.label {
      margin-bottom: 0.5rem;
    }
  }
`

export default WithdrawModal
