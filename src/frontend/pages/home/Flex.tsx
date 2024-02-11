import React, { FC } from "react"
import styled from "styled-components"
import { FLEX_URL } from "@/constants/constants"
import { iExternalLink } from "@/components/icons/Icons"

const Flex: FC = (): JSX.Element => {
  return (
    <FlexStyled>
      <a href={FLEX_URL} target="_blank" rel="noreferrer noopener">
        FLEX {iExternalLink}
      </a>
    </FlexStyled>
  )
}

const FlexStyled = styled.div`
  > a {
    height: 2.75rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0 0.5rem;
    background-color: var(--black);
    color: #f2f4f8;
    font-weight: var(--fwBlack);
    border-radius: 1.375rem;
    transition: var(--transition1);

    &:hover {
      opacity: 0.8;
    }
  }
`

export default Flex
