import React from "react";
import css from "./NftBtn.module.css";
// import mark10 from "@assets/logo/cyql-mark-coolgray10.svg";
// import mark100 from "@assets/logo/cyql-mark-coolgray100.svg";
import markPurple from "@assets/logo/cyql-mark-purple.svg";

// state
import { useDispatch, useSelector } from "react-redux";
import { setNftModal } from "@state/modals/nftModal";
import { selectTheme } from "@state/theme";

const NftBtn = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const openNftModal = () => {
    dispatch(setNftModal(true));
  };

  return (
    <button className={css.nftBtn} onClick={openNftModal}>
      {/* <img className={css.mark} src={theme === "light" ? mark100 : mark10} alt="cyql mark" /> */}
      <img className={css.mark} src={theme === "light" ? markPurple : markPurple} alt="cyql mark" />
      nft
    </button>
  );
};

export default NftBtn;
