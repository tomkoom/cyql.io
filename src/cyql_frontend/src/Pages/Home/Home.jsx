import React from "react";
import css from "./Home.module.css";

// routes
import { toApps } from "@routes/routes";

// components
import {
  Exchanges,
  Header,
  HighlightedByCategory,
  HighlightedProjects,
  JoinCommunity,
  ViewAllBtn,
} from "./index";

// state
import { useSelector } from "react-redux";
import { selectJunoProjects } from "@state/junoProjects";

const Home = () => {
  const projects = useSelector(selectJunoProjects);
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
      <Header />

      {/* newest projects */}
      <section>
        <div className={css.sectionHeader}>
          <h3 className={css.title}>new projects</h3>
          <ViewAllBtn nav={toApps} />
        </div>
        <HighlightedProjects projects={projects.length > 0 && pProjects} />
      </section>

      {/* newest nfts */}
      <section>
        <div className={css.sectionHeader}>
          <h3 className={css.title}>new nfts</h3>
          <ViewAllBtn nav={toApps} />
        </div>
        <HighlightedProjects projects={projects.length > 0 && pNfts} />
      </section>

      {/* popular projects */}
      <section>
        <div className={css.sectionHeader}>
          <h3 className={css.title}>popular projects</h3>
          <ViewAllBtn nav={toApps} />
        </div>
        <HighlightedProjects projects={projects.length > 0 && popularProjects} />
      </section>

      {/* popular nfts */}
      <section>
        <div className={css.sectionHeader}>
          <h3 className={css.title}>popular nfts</h3>
          <ViewAllBtn nav={toApps} />
        </div>
        <HighlightedProjects projects={projects.length > 0 && popularNfts} />
      </section>

      {/* wallets */}
      <section>
        <div className={css.sectionHeader}>
          <div className={css.titleContainer}>
            <h3 className={css.title}>wallets</h3>
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
            <h3 className={css.title}>explorers</h3>
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
            <h3 className={css.title}>social networks</h3>
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
            <h3 className={css.title}>defi</h3>
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
            <h3 className={css.title}>exchanges</h3>
          </div>
        </div>
        <Exchanges />
      </section>
      <div className={css.divider} />

      {/* join community */}
      <section className={css.home__nftCollections}>
        <div className={css.sectionHeader}>
          <h3 className={css.title}>join community</h3>
        </div>
        <JoinCommunity />
      </section>
    </main>
  );
};

export default Home;
