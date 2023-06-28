import React from "react";
import css from "./NftBtn.module.css";
import mark10 from "../../../../../../assets/logo/cyql-mark-coolgray10.svg"

// state
import { useDispatch } from "react-redux";
import { setNftModal } from "@/state/modals/nftModal";

const NftBtn = () => {
  const dispatch = useDispatch();
  const openNftModal = () => {
    dispatch(setNftModal(true));
  };

  return (
    <button className={css.nftBtn} onClick={openNftModal}>
      <img className={css.mark} src={mark10} alt="cyql mark" />
      nft
    </button>
  );
};

export default NftBtn;
