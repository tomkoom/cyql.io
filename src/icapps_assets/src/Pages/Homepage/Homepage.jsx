import React from "react";
import css from "./Homepage.module.css";
import { toApps, toUpcoming, toNft } from "../../Routes/routes";
import Loader from "../../Components/Loader/Loader";

// components
import RecentlyAdded from "./RecentlyAdded/RecentlyAdded";
import NftSales from "./NftSales/NftSales";
import TopNftCollections from "./TopNftCollections/TopNftCollections";
import JoinCommunity from "./JoinCommunity/JoinCommunity";

// redux
import { useSelector } from "react-redux";
import { selectNftItems } from "../../State/nftItems";
import { selectUpcomingNfts } from "../../State/siteData";
import { selectProjects } from "../../State/siteData";

const Homepage = () => {
  const upcomingNfts = useSelector(selectUpcomingNfts);
  const nftItems = useSelector(selectNftItems);
  const projects = useSelector(selectProjects);

  return (
    <main className={css.home}>
      <section className={css.home__hero}>
        <h2 className="pageTitle">IC projects community portal</h2>
        <p className="bodyText">
          Discover new apps, keep an eye out for upcoming NFT sales, compare NFT
          collections stats and more.
        </p>
      </section>

      {/* recently added nfts*/}
      <section className={css.home__apps}>
        <div className={css.home__section__title}>
          <h3>Recently added NFTs</h3>
          <button className={`${css.viewAll} navlink`} onClick={() => toApps()}>
            View all &gt;
          </button>
        </div>

        <RecentlyAdded
          projects={projects.filter((project) => project.category === "NFTs")}
        />
      </section>

      {/* recently added projects*/}
      <section className={css.home__apps}>
        <div className={css.home__section__title}>
          <h3>Recently added projects</h3>
          <button className={`${css.viewAll} navlink`} onClick={() => toApps()}>
            View all &gt;
          </button>
        </div>

        <RecentlyAdded
          projects={projects.filter((project) => project.category !== "NFTs")}
        />
      </section>

      {/* upcoming NFT sales */}
      <section className={css.home__upcomingNfts}>
        <div className={css.home__section__title}>
          <h3>Upcoming NFT sales</h3>
          <button
            className={`${css.viewAll} navlink`}
            onClick={() => toUpcoming()}
          >
            View all &gt;
          </button>
        </div>

        <NftSales
          upcomingNftsFiltered={upcomingNfts.filter(
            (nft) =>
              nft.nftSaleStatus !== "Open" && nft.nftSaleStatus !== "Over"
          )}
          loader={<Loader />}
        />
      </section>

      {/* ongoing nft sales */}
      <section className={css.home__upcomingNfts}>
        <div className={css.home__section__title}>
          <h3>Ongoing NFT sales</h3>
          <button
            className={`${css.viewAll} navlink`}
            onClick={() => toUpcoming()}
          >
            View all &gt;
          </button>
        </div>

        <NftSales
          upcomingNftsFiltered={upcomingNfts.filter(
            (nft) => nft.nftSaleStatus === "Open"
          )}
          loader={<Loader />}
        />
      </section>

      {/* top nft collections */}
      {/* <section className={css.home__nftCollections}>
        <div className={css.home__section__title}>
          <h3>Top NFT collections</h3>
          <button className={`${css.viewAll} navlink`} onClick={() => toNft()}>
            View all &gt;
          </button>
        </div>
        <TopNftCollections nftItems={nftItems} loader={<Loader />} />
      </section> */}

      {/* join community */}
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
