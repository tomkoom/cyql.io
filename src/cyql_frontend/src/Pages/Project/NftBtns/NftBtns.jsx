import React from "react";
import css from "./NftBtns.module.css";

// components
import Btn from "./Btn/Btn";

const NftBtns = ({ nftMarketUrl, nftRarityChecker }) => {
  return (
    <div className={css.nftBtns}>
      {nftMarketUrl && <Btn label="Trade" url={nftMarketUrl} />}
      {nftRarityChecker && <Btn label="Rarity" url={nftRarityChecker} />}
    </div>
  );
};

export default NftBtns;
