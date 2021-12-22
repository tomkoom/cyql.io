import React, { useState } from "react";
import css from "./AppList.module.css";
import { Link } from "react-router-dom";
import Loader from "./../../../CatLoader";

// Framer Motion
import { motion } from "framer-motion";
import { cardVariants } from "../../../MotionVariants";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

// Redux
import { useSelector } from "react-redux";

const iconGithub = <FontAwesomeIcon icon={faGithub} />;

const AppList = ({ loading, error, searchValue }) => {
  const [itemsVisible, setItemsVisible] = useState(36);
  const showMoreItems = () => {
    setItemsVisible((prevValue) => prevValue + 36);
  };

  const filteredProjects = useSelector(
    (state) => state.siteData.filteredProjects
  );

  return (
    <section className={css.appList}>
      {loading ? (
        <div className="center">
          <Loader />
        </div>
      ) : error ? (
        <p className="center">Fetch error!</p>
      ) : (
        <div className={css.li}>
          {filteredProjects
            .filter((val) => {
              if (searchValue == "") {
                return val;
              } else if (
                val.name.toLowerCase().includes(searchValue.toLowerCase())
              ) {
                return val;
              }
            })
            .slice(0, itemsVisible)
            .map((d) => (
              <motion.div
                key={d.id}
                className={css.li__item}
                variants={cardVariants}
                whileHover="whileHover"
              >
                <Link className={css.li__item__linkBlock} to={`/a/${d.id}`}>
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
                      <h2
                        className={
                          css.li__item__linkBlock__appInfo__description__title
                        }
                      >
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
                          : d.category == "DeFi"
                          ? "‍🌾"
                          : null}
                      </h2>

                      {d.github || d.canister || d.tags ? (
                        <ul>
                          {d.github && <li>{iconGithub} Open Source</li>}
                          {d.canister && <li>🛢️ Deployed to IC</li>}
                          {d.tags == "Psychedelic" && (
                            <li>
                              {" "}
                              <img
                                src="https://psychedelic.ooo/images/11-2.svg"
                                alt="Psychedelic"
                              />{" "}
                              {d.tags}
                            </li>
                          )}
                          {d.tags == "toniqlabs" && <li>{d.tags}</li>}
                        </ul>
                      ) : null}

                      <p className="bodyTextLight">
                        {d.description && d.description.length > 80
                          ? `${d.description.substring(0, 80)}…`
                          : d.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
        </div>
      )}
      {loading ? null : (
        <div className={css.appList__loadMoreBtn}>
          <button onClick={showMoreItems}>
            Load more projects &#40;+36&#41;
          </button>
        </div>
      )}
    </section>
  );
};

export default AppList;
