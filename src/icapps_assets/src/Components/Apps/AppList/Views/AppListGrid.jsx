import React from "react";
import css from "./AppListGrid.module.css";
import { toApp } from "../../../../Routes/routes";

// Framer Motion
import { motion } from "framer-motion";
import { cardVariants } from "../../../../MotionVariants";

// Redux
import { useSelector } from "react-redux";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const iconDatabase = <FontAwesomeIcon icon={faDatabase} />;
const iconGithub = <FontAwesomeIcon icon={faGithub} />;

const AppListGrid = ({ searchValue, itemsVisible }) => {
  const view = useSelector((state) => state.view.view.value);

  const tagOpenSource = useSelector(
    (state) => state.projectsFiltering.openSource.value
  );
  const tagDeployedToIc = useSelector(
    (state) => state.projectsFiltering.deployedToIc.value
  );
  const tagPsychedelic = useSelector(
    (state) => state.projectsFiltering.psychedelic.value
  );
  const tagToniqlabs = useSelector(
    (state) => state.projectsFiltering.toniqlabs.value
  );

  const filteredByCategory = useSelector(
    (state) => state.projectsFiltering.filteredByCategory
  );

  const filteredByTag = useSelector(
    (state) => state.projectsFiltering.filteredByTag
  );

  const filteredProjects =
    tagOpenSource || tagDeployedToIc || tagPsychedelic || tagToniqlabs
      ? filteredByTag
      : filteredByCategory;

  return (
    <div>
      {view === "grid" && (
        <div className={css.li}>
          {filteredProjects
            .filter((p) => {
              if (searchValue === "") {
                return p;
              } else if (
                p.name.toLowerCase().includes(searchValue.toLowerCase())
              ) {
                return p;
              }
            })
            // filter by tag
            .filter((p) => {
              if (tagOpenSource) {
                return p.github;
              } else if (tagDeployedToIc) {
                return p.canister;
              } else if (tagPsychedelic) {
                return p.tags === "Psychedelic";
              } else if (tagToniqlabs) {
                return p.tags === "toniqlabs";
              } else {
                return p;
              }
            })
            // load more
            .slice(0, itemsVisible)
            .map((d) => (
              <motion.div
                key={d.id}
                className={css.li__i}
                variants={cardVariants}
                whileHover="whileHover"
              >
                <button className="linkBlock" onClick={() => toApp(d.id)}>
                  <div
                    className={css.li__item__linkBlock__coverImg}
                    style={
                      d.cover
                        ? { backgroundImage: `url(${d.cover})` }
                        : { display: "none" }
                    }
                  />
                  <div className={css.li__item__linkBlock__appInfo}>
                    <img
                      className={css.li__item__linkBlock__appInfo__logo}
                      src={d.logo}
                      alt={d.name}
                      style={d.logo ? null : { display: "none" }}
                    />
                    <div
                      className={css.li__item__linkBlock__appInfo__description}
                    >
                      <h3>
                        {d.name}
                        &nbsp;
                        {d.category == "Social Networks"
                          ? "🎯"
                          : d.category == "Games"
                          ? "⚔️"
                          : d.category == "dApps"
                          ? "🔗"
                          : d.category == "DeFi"
                          ? "‍🌾"
                          : d.category == "DAOs"
                          ? "🏠"
                          : d.category == "Infrastructure"
                          ? "🚀"
                          : d.category == "Wallets"
                          ? "👛"
                          : d.category == "Tools"
                          ? "🛠️"
                          : d.category == "Explorers"
                          ? "🌎"
                          : d.category == "NFTs"
                          ? "🗿"
                          : null}
                      </h3>

                      {d.github || d.canister || d.tags ? (
                        <ul>
                          {d.canister && <li>{iconDatabase} Deployed to IC</li>}
                          {d.github && <li>{iconGithub} Open Source</li>}
                          {d.tags == "Psychedelic" && (
                            <li>
                              <img
                                src="https://psychedelic.ooo/images/11-2.svg"
                                alt="Psychedelic"
                              />
                              &nbsp;
                              {d.tags}
                            </li>
                          )}
                          {d.tags == "toniqlabs" && <li>{d.tags}</li>}
                        </ul>
                      ) : null}

                      <p className={css.appDescription}>
                        {d.description && d.description.length > 70
                          ? `${d.description.substring(0, 70)}…`
                          : d.description}
                      </p>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
        </div>
      )}
    </div>
  );
};

export default AppListGrid;
