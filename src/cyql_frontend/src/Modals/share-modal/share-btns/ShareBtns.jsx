import React from "react";
import css from "./ShareBtns.module.css";

// icons
import { iTwitter, iTelegram, iFacebook, iRedditAlien, iLinkedin } from "@icons/Icons";

// react share
import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from "react-share";
// https://www.npmjs.com/package/react-share

const ShareBtns = ({ slug, name, categories, description }) => {
  // const url = `https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/#/projects/${slug}`;
  const url2 = `https://cyql.io/#/projects/${slug}`;
  const summary = `${name}: ${description}`;
  const hashtags = [...categories, "ICP", "Web3", "InternetComputer"];

  return (
    <ul className={css.shareBtns}>
      <li>
        <TwitterShareButton url={url2} title={`${summary} 🔗`} via="cyqlio" hashtags={hashtags}>
          <span id={css.twitter} className={css.icon}>
            {iTwitter}
          </span>
        </TwitterShareButton>
      </li>

      <li>
        <TelegramShareButton url={url2} title={summary}>
          <span id={css.telegram} className={css.icon}>
            {iTelegram}
          </span>
        </TelegramShareButton>
      </li>

      <li>
        <FacebookShareButton url={url2} quote={summary} hashtag="#Web3">
          <span id={css.facebook} className={css.icon}>
            {iFacebook}
          </span>
        </FacebookShareButton>
      </li>

      <li>
        <RedditShareButton url={url2} title={summary}>
          <span id={css.reddit} className={css.icon}>
            {iRedditAlien}
          </span>
        </RedditShareButton>
      </li>

      <li>
        <LinkedinShareButton url={url2} title={name} summary={summary} source="cyql.io">
          <span id={css.linkedin} className={css.icon}>
            {iLinkedin}
          </span>
        </LinkedinShareButton>
      </li>
    </ul>
  );
};

export default ShareBtns;
