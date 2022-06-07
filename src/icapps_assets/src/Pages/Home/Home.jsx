import React from "react";
import css from "./Home.module.css";

// routes
import { toApps, toUpcoming } from "../../Routes/routes";

// components
import { JoinCommunity, NftSales, HighlightedProjects } from "./index";

// redux
import { useSelector } from "react-redux";
import { selectProjects, selectNFTs } from "../../State/projects";

const ViewAllBtn = ({ nav }) => {
  return (
    <button className={`${css.viewAll} navlink`} onClick={nav}>
      View all &#62;
    </button>
  );
};

const Home = () => {
  const projects = useSelector(selectProjects);
  const nfts = useSelector(selectNFTs);

  return (
    <main className={css.home}>
      <section className={css.home__hero}>
        <h2 className="pageTitle">IC projects community portal</h2>
        <p className="bodyText">
          Discover new apps, keep an eye out for upcoming NFT sales, compare NFT collections stats
          and more.
        </p>
      </section>

      {/* recently added apps */}
      <section className={css.home__apps}>
        <div className={css.home__section__title}>
          <h3>Recently added apps</h3>
          <ViewAllBtn nav={toApps} />
        </div>
        <HighlightedProjects
          projects={
            projects.length > 0 && projects.filter((project) => project.category !== "NFTs")
          }
        />
      </section>

      {/* recently added nfts */}
      <section className={css.home__apps}>
        <div className={css.home__section__title}>
          <h3>Recently added NFTs</h3>
          <ViewAllBtn nav={toApps} />
        </div>
        <HighlightedProjects
          projects={
            projects.length > 0 && projects.filter((project) => project.category === "NFTs")
          }
        />
      </section>

      {/* popular apps */}
      <section className={css.home__apps}>
        <div className={css.home__section__title}>
          <h3>Popular apps</h3>
          <ViewAllBtn nav={toApps} />
        </div>
        <HighlightedProjects
          projects={
            projects.length > 0 &&
            projects
              .filter((project) => project.upvotedBy)
              .filter((project) => project.category !== "NFTs")
              .sort((a, b) => b.upvotedBy.length - a.upvotedBy.length)
          }
        />
      </section>

      {/* popular nfts */}
      <section className={css.home__apps}>
        <div className={css.home__section__title}>
          <h3>Popular NFTs</h3>
          <ViewAllBtn nav={toApps} />
        </div>
        <HighlightedProjects
          projects={
            projects.length > 0 &&
            projects
              .filter((project) => project.upvotedBy)
              .filter((project) => project.category === "NFTs")
              .sort((a, b) => b.upvotedBy.length - a.upvotedBy.length)
          }
        />
      </section>

      {/* upcoming nft sales */}
      <section className={css.home__upcomingNfts}>
        <div className={css.home__section__title}>
          <h3>Upcoming NFT sales</h3>
          <ViewAllBtn nav={toUpcoming} />
        </div>

        <NftSales nftSalesFiltered={nfts.filter((nft) => nft.nftSaleStatus === "Upcoming")} />
      </section>

      {/* ongoing nft sales */}
      <section className={css.home__upcomingNfts}>
        <div className={css.home__section__title}>
          <h3>Ongoing NFT sales</h3>
          <ViewAllBtn nav={toUpcoming} />
        </div>

        <NftSales nftSalesFiltered={nfts.filter((nft) => nft.nftSaleStatus === "Open")} />
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

export default Home;
