import React from "react";
import css from "./Home.module.css";
import ICLogo from "../../../assets/ic-logo.svg";

// icons
import { iArrowRight } from "@icons/Icons";

// routes
import { toApps, toUpcoming } from "@routes/routes";

// components
import {
  Exchanges,
  HighlightedByCategory,
  HighlightedProjects,
  JoinCommunity,
  NftSales,
  ViewAllBtn,
} from "./index";

// state
import { useSelector } from "react-redux";
import { selectProjects, selectProjectsLength, selectNFTs } from "@state/projects";

const Home = () => {
  const projects = useSelector(selectProjects);
  const projectsNum = useSelector(selectProjectsLength);
  const nfts = useSelector(selectNFTs);
  const upcomingNfts = nfts.filter((nft) => nft.nftSaleStatus === "Upcoming");
  const ongoingNfts = nfts.filter((nft) => nft.nftSaleStatus === "Open");
  const pProjects = projects.filter((p) => !p.category.includes("NFTs")); // no nfts
  const pNfts = projects.filter((p) => p.category.includes("NFTs")); // nfts
  const popularProjects = projects
    .filter((p) => p.upvotedBy)
    .filter((p) => !p.category.includes("NFTs"))
    .sort((a, b) => b.upvotedBy.length - a.upvotedBy.length);
  const popularNfts =
    projects.length > 0 &&
    projects
      .filter((p) => p.upvotedBy)
      .filter((p) => p.category.includes("NFTs"))
      .sort((a, b) => b.upvotedBy.length - a.upvotedBy.length);

  return (
    <main className={css.home}>
      <section className={css.hero}>
        <h2 className={`${css.homeTitle} pageTitle`}>
          The curated list of{" "}
          {projectsNum !== 0 ? (
            <span className={css.projectsNum} onClick={toApps}>
              {projectsNum}
            </span>
          ) : (
            <span className={css.dots}>...</span>
          )}{" "}
          <span className={css.icBadge}>
            <img className={css.icLogo} src={ICLogo} alt="ic-logo" />
            <span>Internet Computer</span>
          </span>{" "}
          projects
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
              <p className={css.highlightTitle}>cyql NFTs are available on Entrepot</p>
            </div>
            <span className={css.rightArrowIcon}>{iArrowRight}</span>
          </a>
        </div>
        <div className={css.highlightsI}></div>
      </div>

      {/* recently added projects */}
      <section>
        <div className={css.sectionHeader}>
          <h3 className={css.title}>Recently added projects</h3>
          <ViewAllBtn nav={toApps} />
        </div>
        <HighlightedProjects projects={projects.length > 0 && pProjects} />
      </section>

      {/* recently added nfts */}
      <section>
        <div className={css.sectionHeader}>
          <h3 className={css.title}>Recently added NFTs</h3>
          <ViewAllBtn nav={toApps} />
        </div>
        <HighlightedProjects projects={projects.length > 0 && pNfts} />
      </section>

      {/* popular projects */}
      <section>
        <div className={css.sectionHeader}>
          <h3 className={css.title}>Popular apps</h3>
          <ViewAllBtn nav={toApps} />
        </div>
        <HighlightedProjects projects={projects.length > 0 && popularProjects} />
      </section>

      {/* popular nfts */}
      <section>
        <div className={css.sectionHeader}>
          <h3 className={css.title}>Popular NFTs</h3>
          <ViewAllBtn nav={toApps} />
        </div>
        <HighlightedProjects projects={projects.length > 0 && popularNfts} />
      </section>

      {/* upcoming nft sales */}
      <section className={css.home__upcomingNfts}>
        <div className={css.sectionHeader}>
          <h3 className={css.title}>Upcoming NFT sales</h3>
          <ViewAllBtn nav={toUpcoming} />
        </div>
        <NftSales nftSalesFiltered={upcomingNfts} />
      </section>

      {/* ongoing nft sales */}
      <section className={css.home__upcomingNfts}>
        <div className={css.sectionHeader}>
          <h3 className={css.title}>Ongoing NFT sales</h3>
          <ViewAllBtn nav={toUpcoming} />
        </div>
        <NftSales nftSalesFiltered={ongoingNfts} />
      </section>
      <div className={css.divider} />

      {/* wallets */}
      <section>
        <div className={css.sectionHeader}>
          <div className={css.titleContainer}>
            <h3 className={css.title}>Wallets</h3>
          </div>
          <ViewAllBtn nav={toApps} />
        </div>
        <HighlightedByCategory filter="Wallets" />
      </section>
      <div className={css.divider} />

      {/* explorers */}
      <section>
        <div className={css.sectionHeader}>
          <div className={css.titleContainer}>
            <h3 className={css.title}>Explorers</h3>
          </div>
          <ViewAllBtn nav={toApps} />
        </div>
        <HighlightedByCategory filter="Explorers" />
      </section>
      <div className={css.divider} />

      {/* social networks */}
      <section>
        <div className={css.sectionHeader}>
          <div className={css.titleContainer}>
            <h3 className={css.title}>Social Networks</h3>
          </div>
          <ViewAllBtn nav={toApps} />
        </div>
        <HighlightedByCategory filter="Social Networks" />
      </section>
      <div className={css.divider} />

      {/* defi */}
      <section>
        <div className={css.sectionHeader}>
          <div className={css.titleContainer}>
            <h3 className={css.title}>DeFi</h3>
          </div>
          <ViewAllBtn nav={toApps} />
        </div>
        <HighlightedByCategory filter="DeFi" />
      </section>
      <div className={css.divider} />

      {/* exchanges */}
      <section>
        <div className={css.sectionHeader}>
          <div className={css.titleContainer}>
            <h3 className={css.title}>Exchanges</h3>
          </div>
          {/* <ViewAllBtn nav="" /> */}
        </div>
        <Exchanges />
      </section>
      <div className={css.divider} />

      {/* join community */}
      <section className={css.home__nftCollections}>
        <div className={css.sectionHeader}>
          <h3 className={css.title}>Join community</h3>
        </div>
        <JoinCommunity />
      </section>
    </main>
  );
};

export default Home;
