import React, { FC } from "react"
import styled from "styled-components"
import { device } from "@/styles/breakpoints"

interface NameProps {
  name: string
}

const Name: FC<NameProps> = ({ name }) => {
  return <NameStyled>{name}</NameStyled>
}

const NameStyled = styled.h3`
  font-weight: var(--fwBlack);
  word-break: break-all;

  @media ${device.mobileL} {
    font-size: var(--fs4);
  }
`

export default Name
