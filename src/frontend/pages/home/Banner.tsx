import React, { FC } from "react"
import styled from "styled-components"
import { IMAGES } from "@/constants/images"
import { ICP_CC_URL } from "@/constants/constants"

const Banner: FC = (): JSX.Element => {
  return (
    <BannerStyled>
      <a href={ICP_CC_URL} target="_blank" rel="noreferrer noopener">
        <img src={IMAGES.icp_cc_banner} alt="ICP Community Conference banner" />
        <span>Join the Web3 Invasion! ICP Community Conference on May 10th</span>
      </a>
    </BannerStyled>
  )
}

const BannerStyled = styled.div`
  margin: 0 auto;
  text-align: center;

  > a {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.225rem;
    width: 100%;
    overflow: hidden;

    > img {
      height: 80px;
      object-fit: cover;
    }

    > span {
      font-size: var(--fs7);
      color: var(--secondaryColor);
      transition: var(--transition1);
    }

    &:hover > span {
      color: var(--primaryColor);
    }
  }
`

export default Banner
