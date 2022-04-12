import React from "react";
import css from "./NftPreviews.module.css";

const NftPreviews = ({ nftImg1, nftImg2, nftImg3, nftImg4 }) => {
  return (
    <div>
      {nftImg1 && (
        <div className={css.nftImgs}>
          <img className={css.nftImgs__item} src={nftImg1} alt="nft-preview-1" />
          <img className={css.nftImgs__item} src={nftImg2} alt="nft-preview-2" />
          <img className={css.nftImgs__item} src={nftImg3} alt="nft-preview-3" />
          <img className={css.nftImgs__item} src={nftImg4} alt="nft-preview-4" />
        </div>
      )}
    </div>
  );
};

export default NftPreviews;
