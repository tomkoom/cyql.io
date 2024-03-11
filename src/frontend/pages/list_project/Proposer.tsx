import React, { FC } from "react"
import styled from "styled-components"
import { useAuth } from "@/context/Auth"

const Proposer: FC = (): JSX.Element => {
  const { userId } = useAuth()
  return (
    <ProposerStyled>
      Proposer: <span>{userId === "2vxsx-fae" ? "..." : userId}</span>
    </ProposerStyled>
  )
}

const ProposerStyled = styled.p`
  text-align: center;
  line-height: 150%;
  color: var(--secondaryColor);

  > span {
    background-color: var(--underlay1);
    color: var(--primaryColor);
  }
`

export default Proposer
