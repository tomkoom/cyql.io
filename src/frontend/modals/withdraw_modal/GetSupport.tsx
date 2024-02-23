import React, { FC } from "react"
import styled from "styled-components"
import { DISCORD_URL } from "@/constants/constants"

const GetSupport: FC = (): JSX.Element => {
  return (
    <GetSupportStyled href={DISCORD_URL} target="_blank" rel="noreferrer noopener">
      Get Support
    </GetSupportStyled>
  )
}

const GetSupportStyled = styled.a`
  color: var(--secondaryColor);
  transition: var(--transition1);

  &:hover {
    color: var(--primaryColor);
  }
`

export default GetSupport
