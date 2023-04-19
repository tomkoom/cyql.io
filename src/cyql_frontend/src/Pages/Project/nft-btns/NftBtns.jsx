import React from "react";
import css from "./NftBtns.module.css";

// components
import Btn from "./btn/Btn";

const NftBtns = ({ nftMarket, nftRarity }) => {
  return (
    <div className={css.nftBtns}>
      {nftMarket && <Btn label="Trade" url={nftMarket} />}
      {nftRarity && <Btn label="Rarity" url={nftRarity} />}
    </div>
  );
};

export default NftBtns;
