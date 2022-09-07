import React from "react";
import css from "./Nft.module.css";

// icons
import { iExternalLink } from "../../Icons/Icons";

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

  const nft = [
    { label: "Holders", data: holders },
    { label: "Supply", data: supply.toString() },
    { label: "Listings", data: listingsNum.toString() },
    { label: "Floor", data: (floor / 100_000_000).toString() },
  ];

  return (
    <div className={css.nft}>
      <h2 className="pageTitle">cyql NFT</h2>
      <div className={css.content}>
        <a
          className={css.link}
          href="https://entrepot.app/marketplace/ic-apps"
          rel="noreferrer noopener"
          target="_blank"
        >
          Buy <span className={css.icon}>{iExternalLink}</span>
        </a>

        <ul className={css.li}>
          {nft.map((nft) => (
            <li key={nft.label}>
              <p className="label">{nft.label}</p>
              <p className={css.data}>
                {nft.data}&nbsp;
                {nft.label === "Floor" && <span className={css.icp}>ICP</span>}
              </p>
            </li>
          ))}
        </ul>

        {/* add holders list */}
      </div>
    </div>
  );
};

export default Nft;
