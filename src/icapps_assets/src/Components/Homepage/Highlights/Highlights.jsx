import React from "react";
import css from "./Highlights.module.css";
import { NavLink } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";

const Highlights = () => {
  const nftItems = useSelector((state) => state.nftItems.nftItems);
  const upcomingNfts = useSelector((state) => state.siteData.upcomingNfts);

  return (
    <div className={`${css.highlights} container1440`}>
      <h2>Explore</h2>
      <div className={css.highlights__content}>
        {/* Top NFT collections */}
        <div className={css.highlights__content__card}>
          <div className={css.highlights__content__card__heading}>
            <h4 className={css.highlights__content__card__heading__title}>
              Top NFT collections
            </h4>
            <NavLink to="/nft">More &gt;</NavLink>
          </div>

          <ul className={css.list}>
            {nftItems && nftItems.length
              ? nftItems.slice(0, 5).map((nftItem, i) => (
                  <li key={i} className={css.list__item}>
                    {/* <div className={css.list__item__number}>{i + 1}</div> */}
                    <div
                      className={css.list__item__img}
                      style={{ backgroundImage: `url(${nftItem.img})` }}
                    />
                    <div className={css.list__item__name}>{nftItem.name}</div>
                    <div className={css.list__item__data}>
                      {nftItem.volumeInUsdFormatted}
                    </div>
                  </li>
                ))
              : "Loading..."}
          </ul>
        </div>

        {/* Upcoming NFT sales */}
        <div className={css.highlights__content__card}>
          <div className={css.highlights__content__card__heading}>
            <h4 className={css.highlights__content__card__heading__title}>
              Upcoming NFT sales
            </h4>
            <NavLink to="/upcoming">More &gt;</NavLink>
          </div>

          <ul className={css.list}>
            {upcomingNfts && upcomingNfts.length
              ? upcomingNfts.slice(0, 5).map((upcomingNft, i) => (
                  <li key={i} className={css.list__item}>
                    {/* <div className={css.list__item__number}>{i + 1}</div> */}
                    <div
                      className={css.list__item__img}
                      style={{ backgroundImage: `url(${upcomingNft["Img1"]})` }}
                    />
                    <div className={css.list__item__name}>
                      {upcomingNft["Name"]}
                    </div>
                    <div className={css.list__item__data}>
                      {upcomingNft["Date"]}
                    </div>
                  </li>
                ))
              : "Loading..."}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Highlights;
