import React from "react";
import css from "./CollStats.module.css";

const CollectionStats = ({ nftSaleStatus, nftSaleDate, nftUnits, nftUnitPrice }) => {
  return (
    <div className={css.collectionStats}>
      <ul>
        <li>
          <p className={css.label}>Status</p>
          <p className={css.text}>{nftSaleStatus ? nftSaleStatus : "N/A"}</p>
        </li>
        <li>
          <p className={css.label}>Sale date</p>
          <p className={css.text}>{nftSaleDate ? nftSaleDate : "N/A"}</p>
        </li>
        <li>
          <p className={css.label}>Total NFTs</p>
          <p className={css.text}>{nftUnits ? nftUnits : "N/A"}</p>
        </li>
        <li>
          <p className={css.label}>Sale price</p>
          <p className={css.text} id={css.collStatsInfo}>
            {nftUnitPrice ? nftUnitPrice : "N/A"}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default CollectionStats;
