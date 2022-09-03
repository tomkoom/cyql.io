import React, { useEffect } from "react";
import css from "./Nft.module.css";

// backend
import { Actor, HttpAgent } from "@dfinity/agent";
import nft_idl from "../../idl/nft_idl";

// state
import { useSelector, useDispatch } from "react-redux";
import {
  selectRegistry,
  setRegistry,
  selectSupply,
  setSupply,
  selectListingsNum,
  setListingsNum,
} from "../../State/nft/nft";

// utils
import { getHoldersNum } from "./utils/getHoldersNum.js";

// host, nft can id
const host = "https://mainnet.dfinity.network";
const nftCanisterId = "dtlqp-nqaaa-aaaak-abwna-cai";

const Nft = () => {
  const dispatch = useDispatch();
  const registry = useSelector(selectRegistry);
  const holders = getHoldersNum(registry);
  const supply = useSelector(selectSupply);
  const listingsNum = useSelector(selectListingsNum);

  const getNftData = async () => {
    const nft = Actor.createActor(nft_idl, {
      agent: new HttpAgent({ host }),
      canisterId: nftCanisterId,
    });

    await nft
      .getRegistry()
      .then((res) => dispatch(setRegistry(res)))
      .catch((err) => console.log(err));

    await nft
      .supply("")
      .then((res) => {
        dispatch(setSupply(Number(res.ok)));
      })
      .catch((err) => console.log(err));

    await nft
      .listings()
      .then((res) => dispatch(setListingsNum(res.length)))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getNftData();
  }, []);

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
            <p className={css.data}>N/A</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nft;
