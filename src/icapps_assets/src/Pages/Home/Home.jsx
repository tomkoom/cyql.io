import React from "react";
import css from "./Home.module.css";

// icons
import { iArrowRight } from "../../Icons/Icons";

// routes
import { toApps, toUpcoming } from "../../Routes/routes";

// components
import {
  Exchanges,
  HighlightedByCategory,
  HighlightedProjects,
  JoinCommunity,
  NftSales,
  Partners,
} from "./index";

// state
import { useSelector } from "react-redux";
import { selectProjects, selectNFTs } from "../../State/projects";

const ViewAllBtn = ({ nav }) => {
  return (
    <button className={css.viewAll} onClick={nav}>
      View all
    </button>
  );
};

const Home = () => {
  const projects = useSelector(selectProjects);
  const nfts = useSelector(selectNFTs);
  const upcomingNfts = nfts.filter((nft) => nft.nftSaleStatus === "Upcoming");
  const ongoingNfts = nfts.filter((nft) => nft.nftSaleStatus === "Open");
  const projects_projects = projects.filter((project) => project.category !== "NFTs"); // no nfts
  const projects_nfts = projects.filter((project) => project.category === "NFTs"); // nfts
  const popularProjects = projects
    .filter((project) => project.upvotedBy)
    .filter((project) => project.category !== "NFTs")
    .sort((a, b) => b.upvotedBy.length - a.upvotedBy.length);
  const popularNfts =
    projects.length > 0 &&
    projects
      .filter((project) => project.upvotedBy)
      .filter((project) => project.category === "NFTs")
      .sort((a, b) => b.upvotedBy.length - a.upvotedBy.length);

  return (
    <main className={css.home}>
      <section className={css.hero}>
        <h2 className={`${css.homeTitle} pageTitle`}>
          Internet Computer projects community portal 🌀
        </h2>
        <p className="text">Discover new dApps, keep an eye out for upcoming NFT sales and more.</p>
      </section>

      <div className={css.highlights}>
        <div className={css.highlightsI}>
          <a
            className={css.highlightsILinkBlock}
            href="https://entrepot.app/marketplace/ic-apps"
            target="_blank"
            rel="noreferrer noopener"
          >
            <div className={css.highlightsInfo}>
              <span className={css.highlightsIcon}>🐋</span>
              <h3>icApps NFTs are tradable on Entrepot</h3>
            </div>
            <span className={css.rightArrowIcon}>{iArrowRight}</span>
          </a>
        </div>
        <div className={css.highlightsI}></div>
      </div>

      {/* recently added projects */}
      <section className={css.home__apps}>
        <div className={css.sectionTitle}>
          <h3 className={css.title}>Recently added projects</h3>
          <ViewAllBtn nav={toApps} />
        </div>
        <HighlightedProjects
          projects={projects.length > 0 && projects_projects}
          hideCategory={false}
        />
      </section>

      {/* recently added nfts */}
      <section className={css.home__apps}>
        <div className={css.sectionTitle}>
          <h3 className={css.title}>Recently added NFTs</h3>
          <ViewAllBtn nav={toApps} />
        </div>
        <HighlightedProjects projects={projects.length > 0 && projects_nfts} hideCategory={true} />
      </section>

      {/* popular projects */}
      <section className={css.home__apps}>
        <div className={css.sectionTitle}>
          <h3 className={css.title}>Popular apps</h3>
          <ViewAllBtn nav={toApps} />
        </div>
        <HighlightedProjects
          projects={projects.length > 0 && popularProjects}
          hideCategory={false}
        />
      </section>

      {/* popular nfts */}
      <section className={css.home__apps}>
        <div className={css.sectionTitle}>
          <h3 className={css.title}>Popular NFTs</h3>
          <ViewAllBtn nav={toApps} />
        </div>
        <HighlightedProjects projects={projects.length > 0 && popularNfts} hideCategory={true} />
      </section>

      {/* upcoming nft sales */}
      <section className={css.home__upcomingNfts}>
        <div className={css.sectionTitle}>
          <h3 className={css.title}>Upcoming NFT sales</h3>
          <ViewAllBtn nav={toUpcoming} />
        </div>
        <NftSales nftSalesFiltered={upcomingNfts} />
      </section>

      {/* ongoing nft sales */}
      <section className={css.home__upcomingNfts}>
        <div className={css.sectionTitle}>
          <h3 className={css.title}>Ongoing NFT sales</h3>
          <ViewAllBtn nav={toUpcoming} />
        </div>
        <NftSales nftSalesFiltered={ongoingNfts} />
      </section>
      <div className="div" />

      {/* wallets */}
      <section>
        <div className={css.sectionTitle}>
          <div className={css.titleContainer}>
            <h3 className={css.title}>Wallets</h3>
          </div>
          <ViewAllBtn nav={toApps} />
        </div>
        <HighlightedByCategory filter="Wallets" />
      </section>
      <div className="div" />

      {/* explorers */}
      <section>
        <div className={css.sectionTitle}>
          <div className={css.titleContainer}>
            <h3 className={css.title}>Explorers</h3>
          </div>
          <ViewAllBtn nav={toApps} />
        </div>
        <HighlightedByCategory filter="Explorers" />
      </section>
      <div className="div" />

      {/* social networks */}
      <section>
        <div className={css.sectionTitle}>
          <div className={css.titleContainer}>
            <h3 className={css.title}>Social Networks</h3>
          </div>
          <ViewAllBtn nav={toApps} />
        </div>
        <HighlightedByCategory filter="Social Networks" />
      </section>
      <div className="div" />

      {/* defi */}
      <section>
        <div className={css.sectionTitle}>
          <div className={css.titleContainer}>
            <h3 className={css.title}>DeFi</h3>
          </div>
          <ViewAllBtn nav={toApps} />
        </div>
        <HighlightedByCategory filter="DeFi" />
      </section>
      <div className="div" />

      {/* exchanges */}
      <section>
        <div className={css.sectionTitle}>
          <div className={css.titleContainer}>
            <h3 className={css.title}>Exchanges</h3>
          </div>
          {/* <ViewAllBtn nav="" /> */}
        </div>
        <Exchanges />
      </section>
      <div className="div" />

      {/* partners */}
      <section>
        <div className={css.sectionTitle}>
          <div className={css.titleContainer}>
            <h3 className={css.title}>Partners</h3>
          </div>
        </div>
        <Partners />
      </section>

      {/* join community */}
      <section className={css.home__nftCollections}>
        <div className={css.sectionTitle}>
          <h3 className={css.title}>Join community</h3>
        </div>
        <JoinCommunity />
      </section>
    </main>
  );
};

export default Home;
