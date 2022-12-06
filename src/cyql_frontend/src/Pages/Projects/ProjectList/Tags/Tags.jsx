import React from "react";
import css from "./Tags.module.css";

// icons
import { iDatabase, iRocket, iGithub } from "@icons/Icons";

const Tags = ({ category, nftSaleStatus, canister, github }) => {
  return (
    <ul className={css.tags}>
      {category.length > 0 && category.map((c) => <li key={c}>{c}</li>)}
      {category === "NFTs" && nftSaleStatus === "Upcoming" && <li>{iRocket} Upcoming</li>}
      {canister && <li>{iDatabase} On-Chain</li>}
      {github && <li>{iGithub} Open Source</li>}
    </ul>
  );
};

export default Tags;
