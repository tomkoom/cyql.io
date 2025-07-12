import { Btn } from "@/components/btns"
import CrossIcon from "@/components/icons/CrossIcon"
import { TextInput } from "@/components/ui"
import { useAuth } from "@/context/Auth"
import { useNft } from "@/hooks"
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { RootModal } from "@/modals"
import { setIsLoading } from "@/state/loading"
import { selectWithdrawNftModalNftIdx } from "@/state/modals/withdrawNftModal"
import { ChangeEvent, FC, useState } from "react"
import styled from "styled-components"
import { GetSupport, Steps } from "./withdraw_modal/_index"

interface WithdrawNftModalProps {
  isOpen: boolean
  onClose: () => void
}

const WithdrawNftModal: FC<WithdrawNftModalProps> = ({ isOpen, onClose }): JSX.Element => {
  const dispatch = useAppDispatch()
  const nftIdx = useAppSelector(selectWithdrawNftModalNftIdx)
  const { accounntIdHex } = useAuth()
  const { refreshNfts, sendNft } = useNft()

  // ...
  const initialStep = 1
  const [step, setStep] = useState<number>(initialStep)
  const [withdrawalAccountId, setWithdrawalAccountId] = useState<string>("")
  const [err, setErr] = useState<string>("")

  const reset = (): void => {
    setStep(initialStep)
    setWithdrawalAccountId("")
    setErr("")
    onClose()
  }

  const validateId = (): boolean => {
    setErr("")
    if (withdrawalAccountId === "") {
      setErr("Can't be empty")
      return false
    }

    // validate account id

    return true
  }

  const setWithdrawalId = (e: ChangeEvent<HTMLInputElement>): void => {
    setWithdrawalAccountId(e.target.value)
  }

  const nextStep = (): void => {
    if (validateId()) {
      setStep(2)
    }
  }

  const prevStep = (): void => {
    setStep(1)
  }

  const confirm = async (): Promise<void> => {
    dispatch(setIsLoading(true))
    await sendNft(nftIdx, withdrawalAccountId)
    await refreshNfts()
    dispatch(setIsLoading(false))
    reset()
  }

  return (
    <RootModal isOpen={isOpen}>
      <WithdrawNftModalStyled>
        <CrossIcon onClick={reset} />
        <Steps step={step} />

        {step === 1 ? (
          <div className="step">
            <Inputs>
              <div className="input_field">
                <label htmlFor="withdraw_address">
                  Enter destination <span>Account Id</span>
                </label>

                <TextInput id="withdraw_address" value={withdrawalAccountId} placeholder={`e.g. ${accounntIdHex}`} onChange={(e) => setWithdrawalId(e)} />
                {err && <span style={{ color: "var(--colorErr)" }}>{err}</span>}
              </div>

              <div className="input_field">
                <label htmlFor="nft_idx">NFT index to withdraw</label>
                <TextInput id="nft_idx" value={"#" + nftIdx?.toString()} readOnly />
              </div>
            </Inputs>

            <Btn btnType={"primary"} text={"Withdraw"} onClick={nextStep} />
            <GetSupport />
          </div>
        ) : step === 2 ? (
          <div className="step">
            <Confirm>
              <div className="data_field">
                <p className="label">Withdraw to</p>
                <p className="value">{withdrawalAccountId}</p>
              </div>

              <div className="data_field">
                <p className="label">NFT to withdraw</p>
                <p className="value">{"#" + nftIdx?.toString()}</p>
              </div>
            </Confirm>

            <div className="btns">
              <Btn btnType={"secondary"} text={"Back"} onClick={prevStep} />
              <Btn btnType={"primary"} text={"Confirm"} onClick={confirm} />
            </div>
          </div>
        ) : (
          ""
        )}
      </WithdrawNftModalStyled>
    </RootModal>
  )
}

const WithdrawNftModalStyled = styled.div`
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
    max-width: 48rem;
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

    > div.btns {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;
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
  }
`

const Confirm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: var(--primaryColor);

  > div.data_field {
    text-align: center;
    background-color: var(--underlay1);
    padding: 0.75rem;

    > p.label {
      margin-bottom: 0.5rem;
    }
  }
`

export default WithdrawNftModal
