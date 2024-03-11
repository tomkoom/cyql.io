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

  const closeModal = (): void => {
    dispatch(setListConfirmModalIsOpen(false))
  }

  const openModal = (): void => {
    if (isAuthenticated) {
      dispatch(setListConfirmModalIsOpen(true))
    } else {
      dispatch(setSignInModalIsOpen(true))
    }
  }

  return (
    <ListProjectStyled>
      <ListConfirmModal isOpen={listConfirmModalIsOpen} onClose={closeModal} />

      <div>
        <div className="title">
          <h2 className="pageTitle">List New #ic Project</h2>
          <p>
            The project will be listed as a proposal and will be voted and moderated by the
            community
          </p>
          <Steps />
        </div>

        <Panel style={{ backgroundColor: "unset" }}>
          <div className="title">
            <h5 style={{ textAlign: "center" }}>* Project Category</h5>
            <p style={{ textAlign: "center" }}>Pick one or multiple</p>
          </div>
          <div className="content">
            <Category />
          </div>
        </Panel>

        <PanelsWrapper>
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
        </PanelsWrapper>

        <Proposer />
        <Btn
          btnType={"primary"}
          text={isAuthenticated ? "Submit Project" : "Sign In to Submit"}
          onClick={openModal}
        />
      </div>
    </ListProjectStyled>
  )
}

const ListProjectStyled = styled.div`
  > div {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    margin-bottom: 4rem;

    > div.title {
      > p {
        text-align: center;
      }
    }
  }
`

const PanelsWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
  gap: 1rem;
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
