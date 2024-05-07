import React, { FC } from "react"
import styled from "styled-components"
import { FLEX_SITE_URL } from "@/constants/constants"

const FlexBanner: FC = (): JSX.Element => {
  return (
    <FlexBannerStyled href={FLEX_SITE_URL} target="_blank" rel="noreferrer noopener">
      <span>🔥</span>
      <div className="main">
        <h6>FLEX</h6>
        <p>P2P & Meme Currency on the IC</p>
      </div>
      <span>🔥</span>
    </FlexBannerStyled>
  )
}

const FlexBannerStyled = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  box-shadow: var(--boxShadow1), var(--shadow2);
  padding: 0.75rem 1rem;
  transition: var(--transition1);

  &:hover {
    color: var(--background);
    background-color: var(--primaryColor);
  }

  > span {
    font-size: var(--fs5);
  }

  > div.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > h6 {
      font-size: var(--fs4);
      font-weight: var(--fwBlack);
    }

    > p {
      font-weight: var(--fwBold);
    }
  }
`

export default FlexBanner
