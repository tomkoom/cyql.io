import React from "react";
import css from "./ShareModal.module.css";

// icons
import { iTwitter, iTelegram, iFacebook, iReddit, iRedditAlien, iLinkedin } from "@icons/Icons";

// react share
import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from "react-share";

// components
import { Header } from "./index";

// state
import { useDispatch } from "react-redux";
import { setShareModal } from "@state/modals/shareModal";

const ShareModal = ({ slug, name, category, description }) => {
  const dispatch = useDispatch();
  const url = `https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/#/projects/${slug}`;
  const url2 = `https://cyql.io/#/projects/${slug}`;

  const close = () => {
    dispatch(setShareModal(false));
  };

  const summary = `${name}: ${description}`;

  return (
    <div className={css.modal} onClick={close}>
      <div className={css.content} onClick={(e) => e.stopPropagation()}>
        <Header name={name} />
        <ul className={css.shareBtns}>
          <li>
            <TwitterShareButton
              url={url2}
              title={`${summary} 🔗`}
              via="cyqlio"
              hashtags={[...category, "ICP", "Web3", "InternetComputer"]}
            >
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
      </div>
    </div>
  );
};

export default ShareModal;
