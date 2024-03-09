import React, { FC } from "react"
import styled from "styled-components"
import { ProjectData, Token, Primary } from "./_index"

const ListProject: FC = (): JSX.Element => {
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

      <p>social networks web2</p>
      <p>social networks web3</p>
      <p>documentation</p>
    </ListProjectStyled>
  )
}

const ListProjectStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

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
