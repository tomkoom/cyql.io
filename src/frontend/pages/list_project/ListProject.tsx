import React, { FC } from "react"
import styled from "styled-components"
import { Category, Token, Primary, Input, Steps, Proposer } from "./_index"
import { Btn } from "@/components/btns/_index"
import { web2Links, web3Links, extra, extra2 } from "./_inputs"
import { ListConfirmModal } from "@/modals/_index"
import { useAuth } from "@/context/Auth"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import {
  selectListConfirmModalIsOpen,
  setListConfirmModalIsOpen,
} from "@/state/modals/listConfirmModal"
import { setSignInModalIsOpen } from "@/state/modals/signInModal"

const ListProject: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAuth()
  const listConfirmModalIsOpen = useAppSelector(selectListConfirmModalIsOpen)

  const closeConfirmProposalModal = (): void => {
    dispatch(setListConfirmModalIsOpen(false))
  }

  const openConfirmProposalModal = (): void => {
    dispatch(setListConfirmModalIsOpen(false))
  }

  const openSingInModal = (): void => {
    dispatch(setSignInModalIsOpen(true))
  }

  const openModal = (): void => {
    if (isAuthenticated) {
      openConfirmProposalModal()
    } else {
      openSingInModal()
    }
  }

  return (
    <ListProjectStyled>
      <ListConfirmModal isOpen={listConfirmModalIsOpen} onClose={closeConfirmProposalModal} />

      <div className="content">
        <div className="header">
          <h2 className="pageTitle">List New #ic Project</h2>
          <p>
            The project will be listed as a proposal and will be voted and moderated by the
            community
          </p>
          {/* <Steps /> */}
        </div>

        <StepWrapper>
          <div className="title">
            <h5>Step 1: Pick Project Category</h5>
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
            <h5>Step 2: Fill in the Project Data</h5>
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
          text={isAuthenticated ? "Submit Project" : "Sign In to Submit"}
          onClick={openModal}
        />
      </div>
    </ListProjectStyled>
  )
}

const ListProjectStyled = styled.div`
  > div.content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 4rem;

    > div.header {
      > p {
        text-align: center;
      }
    }
  }
`

const StepWrapper = styled.div`
  box-shadow: var(--boxShadow3);
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

export default ListProject
