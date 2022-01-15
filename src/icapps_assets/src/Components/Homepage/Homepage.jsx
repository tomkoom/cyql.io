import React from "react";
import css from "./Homepage.module.css";
import { Link } from "react-router-dom";
import Loader from "../../Loader";

// Components
import RecentlyAdded from "./RecentlyAdded/RecentlyAdded";
import NftSales from "./NftSales/NftSales";
import TopNftCollections from "./TopNftCollections/TopNftCollections";

// Redux
import { useSelector } from "react-redux";
import JoinCommunity from "./JoinCommunity/JoinCommunity";

const Homepage = () => {
  const upcomingNfts = useSelector((state) => state.siteData.upcomingNfts);
  const nftItems = useSelector((state) => state.nftItems.nftItems);

  return (
    <main className={`${css.home} container1440`}>
      <section className={css.home__hero}>
        <h2 className={css.home__hero__title}>IC projects community portal</h2>
        <p className="bodyText">
          Discover new apps, keep an eye out for upcoming NFT sales, compare NFT
          collections stats and more.
        </p>
      </section>

      {/* Recently added */}
      <section className={css.home__apps}>
        <div className={css.home__section__title}>
          <h3>Recently added projects</h3>
          <Link className="viewAll" to="/apps">
            View all &gt;
          </Link>
        </div>

        <RecentlyAdded />
      </section>

      {/* Upcoming NFT sales */}
      <section className={css.home__upcomingNfts}>
        <div className={css.home__section__title}>
          <h3>Upcoming NFT sales</h3>
          <Link className="viewAll" to="/upcoming">
            View all &gt;
          </Link>
        </div>

        <NftSales
          upcomingNftsFiltered={upcomingNfts.filter(
            (upcNft) => upcNft["Date"] !== "Sale is open"
          )}
          Loader={<Loader />}
        />
      </section>

      {/* Ongoing NFT sales */}
      <section className={css.home__upcomingNfts}>
        <div className={css.home__section__title}>
          <h3>Ongoing NFT sales</h3>
          <Link className="viewAll" to="/upcoming">
            View all &gt;
          </Link>
        </div>

        <NftSales
          upcomingNftsFiltered={upcomingNfts.filter(
            (upcNft) => upcNft["Date"] === "Sale is open"
          )}
          Loader={<Loader />}
        />
      </section>

      {/* Top NFT collections */}
      <section className={css.home__nftCollections}>
        <div className={css.home__section__title}>
          <h3>Top NFT collections</h3>
          <Link className="viewAll" to="/nft">
            View all &gt;
          </Link>
        </div>
        <TopNftCollections nftItems={nftItems} Loader={<Loader />} />
      </section>

      {/* Join community */}
      <section className={css.home__nftCollections}>
        <div className={css.home__section__title}>
          <h3>Join icApps community</h3>
        </div>
        <JoinCommunity />
      </section>
    </main>
  );
};

export default Homepage;
