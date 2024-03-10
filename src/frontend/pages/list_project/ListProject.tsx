import React, { FC } from "react"
import styled from "styled-components"
import { Category, Token, Primary, Input } from "./_index"
import { Btn } from "@/components/btns/_index"
import { web2Links, web3Links, extra, extra2 } from "./_inputs"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectListProject } from "@/state/listProject"

const ListProject: FC = (): JSX.Element => {
  const project = useAppSelector(selectListProject)

  const submit = (): void => {
    console.log(project)
  }

  return (
    <ListProjectStyled>
      <div className="title">
        <h2 className="pageTitle">List New #ic Project</h2>
        <p>
          The project will be listed as a proposal and will be voted and moderated by the community
        </p>
      </div>

      <Panel>
        <div className="title">
          <h5>Project Category</h5>
          <p>Pick one or multiple</p>
        </div>
        <div className="content">
          <Category />
        </div>
      </Panel>

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
          <h5>Token Ledger and Standard</h5>
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
            <Input key={item.id} id={item.id} label={item.label} placeholder={item.placeholder} />
          ))}
        </div>
      </Panel>

      <Panel>
        <div className="title">
          <h5>Web3 #ic Links</h5>
        </div>
        <div className="content">
          {web3Links.map((item) => (
            <Input key={item.id} id={item.id} label={item.label} placeholder={item.placeholder} />
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
            <Input key={item.id} id={item.id} label={item.label} placeholder={item.placeholder} />
          ))}
        </div>
      </Panel>

      <Panel>
        <div className="title">
          <h5>Docs, Whitepaper, etc</h5>
        </div>
        <div className="content">
          {extra2.map((item) => (
            <Input key={item.id} id={item.id} label={item.label} placeholder={item.placeholder} />
          ))}
        </div>
      </Panel>

      <Btn btnType={"primary"} text={"Submit Project"} onClick={submit} />
    </ListProjectStyled>
  )
}

const ListProjectStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-bottom: 4rem;

  > div.title {
    > p {
      text-align: center;
    }
  }
`

const Panel = styled.div`
  text-align: center;

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
