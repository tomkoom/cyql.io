import React from "react";
import css from "./Nft.module.css";

// components
import { NftBtn, NftModal } from "./index";

// state
import { useSelector } from "react-redux";
import { selectNftModal } from "@/state/modals/nftModal";

const Nft = () => {
  const nftModal = useSelector(selectNftModal);

  return (
    <div className={css.nft}>
      <NftBtn />
      {nftModal && <NftModal />}
    </div>
  );
};

export default Nft;
