import React, { FC } from "react"
import styled from "styled-components"
import { iTwitter, iTelegram, iFacebook, iRedditAlien, iLinkedin } from "@/components/icons/Icons"
import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from "react-share"
// https://www.npmjs.com/package/react-share

interface BtnsProps {
  id: string
  name: string
  category: string[]
  description: string
}

const Btns: FC<BtnsProps> = ({ id, name, category, description }): JSX.Element => {
  const url = `https://cyql.io/#/projects/${id}`
  const summary = `${name}: ${description}`
  const hashtags = [...category, "ICP", "Web3", "InternetComputer"]

  return (
    <BtnsStyled>
      <li>
        <TwitterShareButton url={url} title={`${summary} 🔗`} via="cyqlio" hashtags={hashtags}>
          <Icon id="twitter">{iTwitter}</Icon>
        </TwitterShareButton>
      </li>

      <li>
        <TelegramShareButton url={url} title={summary}>
          <Icon id="telegram">{iTelegram}</Icon>
        </TelegramShareButton>
      </li>

      <li>
        <FacebookShareButton url={url} quote={summary} hashtag="#Web3">
          <Icon id="facebook">{iFacebook}</Icon>
        </FacebookShareButton>
      </li>

      <li>
        <RedditShareButton url={url} title={summary}>
          <Icon id="reddit">{iRedditAlien}</Icon>
        </RedditShareButton>
      </li>

      <li>
        <LinkedinShareButton url={url} title={name} summary={summary} source="cyql.io">
          <Icon id="linkedin">{iLinkedin}</Icon>
        </LinkedinShareButton>
      </li>
    </BtnsStyled>
  )
}

const BtnsStyled = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;

  > li {
    transition: var(--transition1);

    &:hover {
      opacity: 0.6;
    }
  }

  > * span#twitter {
    background-color: var(--colorTwitter);
  }

  > * span#telegram {
    background-color: var(--colorTelegram);
  }

  > * span#facebook {
    background-color: var(--colorFacebook);
  }

  > * span#reddit {
    background-color: var(--colorReddit);
  }

  > * span#linkedin {
    background-color: var(--colorLinkedIn);
  }
`

const Icon = styled.span`
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  font-size: var(--fs4);
  color: #fff;
  border-radius: 50%;
`

export default Btns
