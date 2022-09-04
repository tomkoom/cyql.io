import React from "react";
import css from "./Nft.module.css";

// state
import { useSelector } from "react-redux";
import { selectRegistry, selectSupply, selectListingsNum, selectFloor } from "../../State/nft/nft";

// utils
import { getHoldersNum } from "./utils/getHoldersNum.js";

const Nft = () => {
  const registry = useSelector(selectRegistry);
  const holders = getHoldersNum(registry);
  const supply = useSelector(selectSupply);
  const listingsNum = useSelector(selectListingsNum);
  const floor = useSelector(selectFloor);

  return (
    <div className={css.nft}>
      <h2 className="pageTitle">cyql NFT Stats</h2>
      <div className={css.content}>
        <a
          className={css.link}
          href="https://entrepot.app/marketplace/ic-apps"
          rel="noreferrer noopener"
          target="_blank"
        >
          Market →
        </a>

        <ul className={css.li}>
          <li>
            <p className="label">Holders</p>
            <p className={css.data}>{holders}</p>
          </li>
          <li>
            <p className="label">Supply</p>
            <p className={css.data}>{supply.toString()}</p>
          </li>
          <li>
            <p className="label">Listings</p>
            <p className={css.data}>{listingsNum.toString()}</p>
          </li>
          <li>
            <p className="label">Floor</p>
            <p className={css.data}>{(floor / 100_000_000).toString()} ICP</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nft;
