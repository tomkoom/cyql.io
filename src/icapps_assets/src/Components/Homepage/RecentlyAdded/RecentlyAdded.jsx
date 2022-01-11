import React from "react";
import css from "./RecentlyAdded.module.css";
import { Link } from "react-router-dom";
import Loader from "../../../Loader";

// Framer Motion
import { motion } from "framer-motion";
import { cardVariants } from "../../../motionVariants";

// Redux
import { useSelector } from "react-redux";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const iconDatabase = <FontAwesomeIcon icon={faDatabase} />;
const iconGithub = <FontAwesomeIcon icon={faGithub} />;

const findCategory = (category) => {
  return {
    "Social Networks": "🎯",
    Games: "⚔️",
    dApps: "🔗",
    DeFi: "‍🌾",
    DAOs: "🏠",
    Infrastructure: "🚀",
    Wallets: "👛",
    Tools: "🛠️",
    Explorers: "🌎",
    NFTs: "🗿",
    DeFi: "‍🌾",
  }[category];
};

const RecentlyAdded = () => {
  const apps = useSelector((state) => state.siteData.projects);

  return (
    <ul className={css.home__apps__list}>
      {!apps.length ? (
        <Loader />
      ) : (
        apps.slice(0, 47).map((app) => (
          <motion.li
            key={app.id}
            className={css.home__apps__list__item}
            variants={cardVariants}
            whileHover="whileHover"
          >
            <Link className={css.li__item__linkBlock} to={`/a/${app.id}`}>
              <div
                className={css.li__item__linkBlock__coverImg}
                style={
                  app.cover
                    ? { backgroundImage: `url(${app.cover})` }
                    : { display: "none" }
                }
              />
              <div className={css.li__item__linkBlock__appInfo}>
                <img
                  className={css.li__item__linkBlock__appInfo__logo}
                  src={app.logo}
                  alt={app.name}
                  style={app.logo ? null : { display: "none" }}
                />
                <div className={css.li__item__linkBlock__appInfo__description}>
                  <h2
                    className={
                      css.li__item__linkBlock__appInfo__description__title
                    }
                  >
                    {app.name}
                    &nbsp;
                    {findCategory(app.category)}
                  </h2>

                  {app.github || app.canister || app.tags ? (
                    <ul>
                      {app.canister && (
                        <li>{iconDatabase}&nbsp;&nbsp;Deployed to IC</li>
                      )}
                      {app.github && (
                        <li>{iconGithub}&nbsp;&nbsp;Open Source</li>
                      )}

                      {app.tags == "Psychedelic" && (
                        <li>
                          <img
                            src="https://psychedelic.ooo/images/11-2.svg"
                            alt="Psychedelic"
                          />
                          &nbsp;&nbsp;
                          {app.tags}
                        </li>
                      )}
                      {app.tags == "toniqlabs" && <li>{app.tags}</li>}
                    </ul>
                  ) : null}

                  <p className={css.appDescription}>
                    {app.description && app.description.length > 70
                      ? `${app.description.substring(0, 70)}…`
                      : app.description}
                  </p>
                </div>
              </div>
            </Link>
          </motion.li>
        ))
      )}
      {apps.length > 0 && (
        <motion.Link
          to="/apps"
          className={css.viewAllAppsCard}
          variants={cardVariants}
          whileHover="whileHover"
        >
          View all {apps.length} apps &gt;
        </motion.Link>
      )}
    </ul>
  );
};

export default RecentlyAdded;
