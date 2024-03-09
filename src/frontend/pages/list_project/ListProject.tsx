import React, { FC } from "react"
import styled from "styled-components"
import { ProjectData, Token, Primary, TextInputLabel } from "./_index"
import { Btn } from "@/components/btns/_index"

const ListProject: FC = (): JSX.Element => {
  const submit = (): void => {}

  return (
    <ListProjectStyled>
      <div className="title">
        <h2 className="pageTitle">List New #ic Project</h2>
        <p>
          The project will be listed as a proposal and will be voted and moderated by the community
        </p>
      </div>

      <div>
        <ProjectData />
      </div>

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
          <p>
            Please specify the ledger canister id and a token standard if the project is tokenized
          </p>
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
          <TextInputLabel id={"x"} label={"X/Twitter"} />
          <TextInputLabel id={"discord"} label={"Discord"} />
          <TextInputLabel id={"telegram"} label={"Telegram"} />
          <TextInputLabel id={"github"} label={"GitHub"} />
        </div>
      </Panel>

      <Panel>
        <div className="title">
          <h5>Web3 #ic Links</h5>
        </div>
        <div className="content">
          <TextInputLabel id={"taggr"} label={"#TAGGR"} />
          <TextInputLabel id={"openchat"} label={"OpenChat"} />
          <TextInputLabel id={"dscvr"} label={"DSCVR"} />
          <TextInputLabel id={"funded"} label={"Funded"} />
        </div>
      </Panel>

      <Panel>
        <div className="title">
          <h5>#ic Links</h5>
          <p>DFINITY forum, SNS, etc</p>
        </div>
        <div className="content">
          <TextInputLabel
            id={"dfinityForumShowcase"}
            label={"DFINITY forum [showcase] url"}
            placeholder={"..."}
          />
          <TextInputLabel
            id={"nnsProjectUrl"}
            label={"NNS project url"}
            placeholder={"nns.ic0.app/project/?project=..."}
          />
        </div>
      </Panel>

      <Panel>
        <div className="title">
          <h5>Docs, Whitepaper, etc</h5>
        </div>
        <div className="content">
          <TextInputLabel id={"docs"} label={"Docs"} placeholder="docs.app.com" />
          <TextInputLabel id={"whitepaper"} label={"Whitepaper"} placeholder="app.com/whitepaper" />
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
    margin-bottom: 0.5rem;

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
