import React, { FC } from "react"
import styled from "styled-components"
import { ICP_CC_URL } from "@/constants/constants"
import { iExternalLink } from "@/components/icons/Icons"

const Banner: FC = (): JSX.Element => {
  return (
    <BannerStyled href={ICP_CC_URL} target="_blank" rel="noreferrer noopener">
      <div>
        <img
          src="https://assets-global.website-files.com/6548867b09c1e7779fd604c0/6569619375665a89afa7c5f5_icpcc%20logo-white-transparent.svg"
          alt=""
        />
      </div>
      <p>ICP Community Conference: May 10th. Join the Web3 Invasion! 👽</p>
      <span className="icon">{iExternalLink}</span>
    </BannerStyled>
  )
}

const BannerStyled = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--underlay1);
  transition: var(--transition1);
  font-size: var(--fsText);

  &:hover {
    background-color: var(--underlay2);
  }

  > div {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    background-color: var(--underlay2);

    > img {
      max-width: 6rem;
      width: 100%;
      object-fit: scale-down;

      padding: 0;
      margin: 0;
    }
  }

  > span.emoji {
    width: 2rem;
    height: 2rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    font-size: var(--fs6);
  }

  > span.icon {
    font-size: var(--fsText);
    color: var(--tertiaryColor);
  }
`

export default Banner
