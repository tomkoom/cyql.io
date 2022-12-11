import React from "react";
import css from "./ShareModal.module.css";

// components
import { Header, ShareBtns } from "./index";

// state
import { useDispatch } from "react-redux";
import { setShareModal } from "@state/modals/shareModal";

const ShareModal = ({ slug, name, category, description }) => {
  const dispatch = useDispatch();
  const close = () => {
    dispatch(setShareModal(false));
  };

  return (
    <div className={css.modal} onClick={close}>
      <div className={css.content} onClick={(e) => e.stopPropagation()}>
        <Header name={name} />
        <ShareBtns slug={slug} name={name} category={category} description={description} />
      </div>
    </div>
  );
};

export default ShareModal;
