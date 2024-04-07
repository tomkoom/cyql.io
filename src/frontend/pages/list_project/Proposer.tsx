import React, { FC } from "react"
import styled from "styled-components"
import { useAuth } from "@/context/Auth"

const Proposer: FC = (): JSX.Element => {
  const { userId } = useAuth()
  return (
    <ProposerStyled>
      <span className="label">Proposer</span>
      <span className="value">{userId === "2vxsx-fae" ? "[ Sign in first ]" : userId}</span>
    </ProposerStyled>
  )
}

const ProposerStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > span {
    line-height: 150%;
  }

  > span.label {
    color: var(--secondaryColor);
  }

  > span.value {
    background-color: var(--underlay1);
    color: var(--primaryColor);
  }
`

export default Proposer
