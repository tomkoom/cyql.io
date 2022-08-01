import React from "react";
import css from "./CollStats.module.css";

const CollectionStats = ({ nftSaleStatus, nftSaleDate, nftUnits, nftUnitPrice }) => {
  return (
    <div className={css.collectionStats}>
      <ul>
        <li>
          <p className="text">Status</p>
          <p className="text">{nftSaleStatus ? nftSaleStatus : "N/A"}</p>
        </li>
        <li>
          <p className="text">Sale date</p>
          <p className="text">{nftSaleDate ? nftSaleDate : "N/A"}</p>
        </li>
        <li>
          <p className="text">Total NFTs</p>
          <p className="text">{nftUnits ? nftUnits : "N/A"}</p>
        </li>
        <li>
          <p className="text">Sale price</p>
          <p className="text" id={css.collStatsInfo}>
            {nftUnitPrice ? nftUnitPrice : "N/A"}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default CollectionStats;
