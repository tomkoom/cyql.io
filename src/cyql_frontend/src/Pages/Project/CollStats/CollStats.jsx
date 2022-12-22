import React from "react";
import css from "./CollStats.module.css";

const CollStats = ({ nftSaleStatus, nftSaleDate, nftUnits, nftUnitPrice }) => {
  return (
    <div className={css.collStats}>
      <h5 className={css.title}>Collection Stats</h5>
      <ul>
        <li>
          <p className={css.label}>status</p>
          <p className={css.text}>{nftSaleStatus ? nftSaleStatus.toLowerCase() : "n/a"}</p>
        </li>
        <li>
          <p className={css.label}>sale date</p>
          <p className={css.text}>{nftSaleDate ? nftSaleDate : "n/a"}</p>
        </li>
        <li>
          <p className={css.label}>total items</p>
          <p className={css.text}>{nftUnits ? nftUnits : "n/a"}</p>
        </li>
        <li>
          <p className={css.label}>sale price</p>
          <p id={css.collStatsInfo} className={css.text}>
            {nftUnitPrice ? nftUnitPrice.toLowerCase() : "n/a"}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default CollStats;
