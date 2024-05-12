import React, { Dispatch, FC, SetStateAction, useState } from "react"
import styled from "styled-components"
import { useAuth } from "@/context/Auth"
import { Category, Token, Primary, Input, Proposer, AddLogo } from "./_index"
import { Btn } from "@/components/btns/_index"
import { web2Links, web3Links, extra, extra2 } from "./_inputs"

// state
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { setSignInModalIsOpen } from "@/state/modals/signInModal"
import { selectListProject } from "@/state/projectProposal"

interface Step1Props {
  setStep: Dispatch<SetStateAction<number>>
}

const Step1: FC<Step1Props> = ({ setStep }): JSX.Element => {
  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAuth()
  const [err, setErr] = useState<string>("")
  const project = useAppSelector(selectListProject)

  const openSingInModal = (): void => {
    dispatch(setSignInModalIsOpen(true))
  }

  const validate = (): boolean => {
    setErr("")

    if (project.category.length < 1) {
      setErr("Category is not selected")
      return false
    }

    if (!project.name) {
      setErr("Project name hasn't been entered")
      return false
    }

    if (!project.description) {
      setErr("Project description hasn't been entered")
      return false
    }

    return true
  }

  const nextStep = (): void => {
    if (isAuthenticated) {
      if (validate()) {
        setStep(2)
      }
    } else {
      openSingInModal()
    }
  }

  return (
    <Step1Styled>
      <h3>1. Set project category and data</h3>

      <StepWrapper>
        <div className="title">
          <h5>1: pick project category</h5>
          <p>One or multiple</p>
        </div>

        <Panel style={{ backgroundColor: "unset", padding: "unset" }}>
          <div className="content">
            <Category />
          </div>
        </Panel>
      </StepWrapper>

      <StepWrapper>
        <div className="title">
          <h5>2: add logo</h5>
          <p>Upload logo</p>
        </div>

        <Panel>
          <div className="content">
            <AddLogo />
          </div>
        </Panel>
      </StepWrapper>

      <StepWrapper>
        <div className="title">
          <h5>3: add project data</h5>
          <p>Fill in core project information</p>
        </div>

        <div>
          <Panel>
            <div className="title">
              <h5>Core Project Information</h5>
              <p>Name, description, etc</p>
            </div>
            <div className="content">
              <Primary />
            </div>
          </Panel>

          <Panel>
            <div className="title">
              <h5>Token Data</h5>
              <p>Please specify the token ledger id and a standard if the project is tokenized</p>
            </div>
            <div className="content">
              <Token />
            </div>
          </Panel>

          <Panel>
            <div className="title">
              <h5>Web2 Links</h5>
              <p>Twitter, Discord, etc</p>
            </div>
            <div className="content">
              {web2Links.map((item) => (
                <Input key={item.id} input={item} />
              ))}
            </div>
          </Panel>

          <Panel>
            <div className="title">
              <h5>Web3 #ic Links</h5>
            </div>
            <div className="content">
              {web3Links.map((item) => (
                <Input key={item.id} input={item} />
              ))}
            </div>
          </Panel>

          <Panel>
            <div className="title">
              <h5>#ic Links</h5>
              <p>DFINITY forum showcase url, NNS project url, etc</p>
            </div>
            <div className="content">
              {extra.map((item) => (
                <Input key={item.id} input={item} />
              ))}
            </div>
          </Panel>

          <Panel>
            <div className="title">
              <h5>Docs, Whitepaper, etc</h5>
            </div>
            <div className="content">
              {extra2.map((item) => (
                <Input key={item.id} input={item} />
              ))}
            </div>
          </Panel>
        </div>
      </StepWrapper>

      <Proposer />

      <Btn
        btnType={isAuthenticated ? "primary" : "secondary"}
        text={isAuthenticated ? "Next" : "Sign In"}
        onClick={nextStep}
      />

      {err && (
        <div className="err_message">
          <p>{err}</p>
        </div>
      )}
    </Step1Styled>
  )
}

const Step1Styled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  > h3 {
    text-align: center;
    font-size: var(--fs4);
  }

  > div.err_message {
    color: var(--colorErr);
    background-color: rgba(var(--colorErrRgb), 0.1);
    text-align: center;
    padding: 0.5rem;
    margin-top: -1rem;
  }
`

const StepWrapper = styled.div`
  box-shadow: var(--boxShadow2);
  padding: 2rem;

  > div.title {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin-bottom: 2rem;

    > h5 {
      font-weight: var(--fwMedium);
    }

    > p {
      font-size: var(--fsText);
      color: var(--tertiaryColor);
    }
  }

  > div {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
    gap: 1rem;
  }
`

const Panel = styled.div`
  background-color: var(--underlay1);
  padding: 1rem;

  > div.title {
    margin-bottom: 1rem;

    h5 {
      margin-bottom: 0.5rem;
      font-weight: var(--fwMedium);
    }

    p {
      font-size: var(--fsText);
      color: var(--secondaryColor);
    }
  }
`

export default Step1
