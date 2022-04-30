import React from "react";
import css from "./CollectionStats.module.css";

const CollectionStats = ({ nftSaleStatus, nftSaleDate, nftUnits, nftUnitPrice }) => {
  return (
    <div className={css.collectionStats}>
      <ul>
        <li>
          <p className="bodyText">Status</p>
          <p className="bodyText">{nftSaleStatus ? nftSaleStatus : "N/A"}</p>
        </li>
        <li>
          <p className="bodyText">Sale date</p>
          <p className="bodyText">{nftSaleDate ? nftSaleDate : "N/A"}</p>
        </li>
        <li>
          <p className="bodyText">Total NFTs</p>
          <p className="bodyText">{nftUnits ? nftUnits : "N/A"}</p>
        </li>
        <li>
          <p className="bodyText">Sale price</p>
          <p className="bodyText" id={css.collStatsInfo}>
            {nftUnitPrice ? nftUnitPrice : "N/A"}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default CollectionStats;
