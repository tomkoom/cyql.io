import React from "react";
import css from "./NftBtn.module.css";
import mark from "@assets/logo/cyql-mark-black.svg";

// state
import { useDispatch, useSelector } from "react-redux";
import { setNftModal } from "@state/modals/nftModal";
import { selectTheme } from "@state/theme";

const NftBtn = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const style =
    theme === "light"
      ? {
          filter:
            "brightness(0) saturate(100%) invert(5%) sepia(23%) saturate(631%) hue-rotate(162deg) brightness(97%) contrast(92%)",
        }
      : theme === "dark"
      ? {
          filter:
            "brightness(0) saturate(100%) invert(99%) sepia(28%) saturate(3510%) hue-rotate(180deg) brightness(110%) contrast(95%)",
        }
      : null;

  const openNftModal = () => {
    dispatch(setNftModal(true));
  };

  return (
    <button className={css.nftBtn} onClick={openNftModal}>
      <img style={style} className={css.mark} src={mark} alt="cyql mark" />
      nft
    </button>
  );
};

export default NftBtn;
