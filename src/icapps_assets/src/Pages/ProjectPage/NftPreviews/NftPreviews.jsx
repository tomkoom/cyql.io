import React from "react";
import css from "./NftPreviews.module.css";

const NftPreviews = ({ nftImg1, nftImg2, nftImg3, nftImg4 }) => {
  return (
    <div className={css.nftImgs}>
      {nftImg1 && <img className={css.nftImgsI} src={nftImg1} alt="nft-preview-1" />}
      {nftImg2 && <img className={css.nftImgsI} src={nftImg2} alt="nft-preview-2" />}
      {nftImg3 && <img className={css.nftImgsI} src={nftImg3} alt="nft-preview-3" />}
      {nftImg4 && <img className={css.nftImgsI} src={nftImg4} alt="nft-preview-4" />}
    </div>
  );
};

export default NftPreviews;
