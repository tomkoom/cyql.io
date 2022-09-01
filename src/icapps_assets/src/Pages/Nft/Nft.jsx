import React from "react";
import css from "./Nft.module.css";

// state
import { useSelector } from "react-redux";
import { selectRegistry } from "../../State/nft/nft";

// utils
import { getHoldersNum } from "./utils/getHoldersNum.js";

// move querying nft data to this component

const Nft = () => {
  const registry = useSelector(selectRegistry);
  const holders = getHoldersNum(registry);

  return (
    <div className={css.nft}>
      <h2>CYQL NFT Stats</h2>
      <ul>
        <li>Holders: {holders}</li>
      </ul>
    </div>
  );
};

export default Nft;
