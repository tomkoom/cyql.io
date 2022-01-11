import React from "react";
import css from "./Homepage.module.css";
import { Link } from "react-router-dom";
import Loader from "../../Loader";

// Components
import RecentlyAdded from "./RecentlyAdded/RecentlyAdded";
import NftSales from "./NftSales/NftSales";

// Redux
import { useSelector } from "react-redux";

const Homepage = () => {
  const upcomingNfts = useSelector((state) => state.siteData.upcomingNfts);

  return (
    <main className={`${css.home} container1440`}>
      <section className={css.home__hero}>
        <h2 className={css.home__hero__title}>IC apps community portal</h2>
      </section>

      {/* Recently added */}
      <section className={css.home__apps}>
        <div className={css.home__section__title}>
          <h3>Recently added apps</h3>
          <Link to="/apps">View all &gt;</Link>
        </div>

        <RecentlyAdded />
      </section>

      {/* Upcoming NFT sales */}
      <section className={css.home__upcomingNfts}>
        <div className={css.home__section__title}>
          <h3>Upcoming NFT sales</h3>
          <Link to="/upcoming">View all &gt;</Link>
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
          <Link to="/upcoming">View all &gt;</Link>
        </div>

        <NftSales
          upcomingNftsFiltered={upcomingNfts.filter(
            (upcNft) => upcNft["Date"] === "Sale is open"
          )}
          Loader={<Loader />}
        />
      </section>
    </main>
  );
};

export default Homepage;
