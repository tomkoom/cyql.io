import React from "react";
import css from "./Home.module.css";

// routes
import { toApps, toUpcoming } from "../../Routes/routes";

// components
import { JoinCommunity, NftSales, RecentlyAdded } from "./index";

// redux
import { useSelector } from "react-redux";
import { selectUpcomingNfts } from "../../State/siteData";
import { selectProjects } from "../../State/siteData";

const ViewAllBtn = ({ nav }) => {
  return (
    <button className={`${css.viewAll} navlink`} onClick={nav}>
      View all
    </button>
  );
};

const Homepage = () => {
  const nftSales = useSelector(selectUpcomingNfts);
  const projects = useSelector(selectProjects);

  return (
    <main className={css.home}>
      <section className={css.home__hero}>
        <h2 className="pageTitle">IC projects community portal</h2>
        <p className="bodyText">
          Discover new apps, keep an eye out for upcoming NFT sales, compare NFT collections stats
          and more.
        </p>
      </section>

      {/* recently added nfts*/}
      <section className={css.home__apps}>
        <div className={css.home__section__title}>
          <h3>Recently added NFTs</h3>
          <ViewAllBtn nav={toApps} />
        </div>

        <RecentlyAdded projects={projects.filter((project) => project.category === "NFTs")} />
      </section>

      {/* recently added apps*/}
      <section className={css.home__apps}>
        <div className={css.home__section__title}>
          <h3>Recently added apps</h3>
          <ViewAllBtn nav={toApps} />
        </div>

        <RecentlyAdded projects={projects.filter((project) => project.category !== "NFTs")} />
      </section>

      {/* upcoming nft sales */}
      <section className={css.home__upcomingNfts}>
        <div className={css.home__section__title}>
          <h3>Upcoming NFT sales</h3>
          <ViewAllBtn nav={toUpcoming} />
        </div>

        <NftSales
          nftSalesFiltered={nftSales.filter(
            (nft) => nft.nftSaleStatus !== "Open" && nft.nftSaleStatus !== "Over"
          )}
        />
      </section>

      {/* ongoing nft sales */}
      <section className={css.home__upcomingNfts}>
        <div className={css.home__section__title}>
          <h3>Ongoing NFT sales</h3>
          <ViewAllBtn nav={toUpcoming} />
        </div>

        <NftSales nftSalesFiltered={nftSales.filter((nft) => nft.nftSaleStatus === "Open")} />
      </section>

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
