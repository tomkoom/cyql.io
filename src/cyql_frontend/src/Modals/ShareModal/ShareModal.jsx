import React from "react";
import css from "./ShareModal.module.css";

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

const ShareModal = () => {
  const dispatch = useDispatch();

  const close = () => {
    dispatch(setShareModal(false));
  };

  return (
    <div className={css.modal} onClick={close}>
      <div className={css.content} onClick={(e) => e.stopPropagation()}>
        <Header />
        <ul>
          <li>
            <TwitterShareButton title={"123"} caption={"456"}>
              <p>tw</p>
            </TwitterShareButton>
          </li>
          <li>tg</li>
          <li>fb</li>
        </ul>
      </div>
    </div>
  );
};

export default ShareModal;
