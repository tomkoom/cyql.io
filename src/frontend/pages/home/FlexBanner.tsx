import React, { FC } from "react"
import styled from "styled-components"
import { FLEX_SITE_URL } from "@/constants/constants"

const FlexBanner: FC = (): JSX.Element => {
  return (
    <FlexBannerStyled href={FLEX_SITE_URL} target="_blank" rel="noreferrer noopener">
      <div className="main">
        <h6>🔥💪 FLEX 💪🔥</h6>
        <p>P2P & Meme Currency on the IC</p>
      </div>
    </FlexBannerStyled>
  )
}

const FlexBannerStyled = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  box-shadow: var(--boxShadow1);
  padding: 0.75rem 1rem;
  transition: var(--transition1);

  &:hover {
    background-color: var(--underlay1);
  }

  > div.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > h6 {
      font-size: var(--fs6);
      font-weight: var(--fwBlack);
    }

    > p {
      font-weight: var(--fwBold);
    }
  }
`

export default FlexBanner
