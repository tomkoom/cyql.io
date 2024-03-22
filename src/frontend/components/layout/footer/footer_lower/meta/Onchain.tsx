import React, { FC } from "react"
import styled from "styled-components"
import { FRONTEND_CANISTER_URL } from "@/constants/constants"

const Onchain: FC = (): JSX.Element => {
  return (
    <OnchainStyled>
      On-chain:{" "}
      <a href={FRONTEND_CANISTER_URL} target="_blank" rel="noreferrer noopener">
        n7ib3-4qaaa-aaaai-qagnq-cai
      </a>
    </OnchainStyled>
  )
}

const OnchainStyled = styled.span`
  font-size: var(--fs7);
  color: var(--secondaryColor);

  > a {
    color: var(--secondaryColor);
    text-decoration: underline;
    transition: var(--transition1);

    &:hover {
      color: var(--primaryColor);
    }
  }
`

export default Onchain
