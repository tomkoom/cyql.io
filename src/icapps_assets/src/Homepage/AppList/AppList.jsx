import React from "react";
import css from "./AppList.module.css";
import { Link } from "react-router-dom";

// FRAMER MOTION
import { motion } from "framer-motion";
import { cardVariants } from "../../MotionVariants";

const AppList = ({ loading, error, filteredApps }) => {
  return (
    <section className={css.appList}>
      {loading ? (
        <p className="center">Loading...</p>
      ) : error ? (
        <p className="center">Fetch error!</p>
      ) : (
        <div className={css.li}>
          {filteredApps.map((d) => (
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
                      {d.category === "Social Networks"
                        ? "🎯"
                        : d.category === "Games"
                        ? "⚔️"
                        : d.category === "dApps"
                        ? "🔗"
                        : d.category === "DeFi"
                        ? "‍🌾"
                        : d.category === "DAOs"
                        ? "🏠"
                        : d.category === "Infrastructure"
                        ? "🚀"
                        : d.category === "Wallets"
                        ? "👛"
                        : d.category === "Tools"
                        ? "🛠️"
                        : d.category === "Explorers"
                        ? "🌎"
                        : d.category === "NFTs"
                        ? "🗿"
                        : d.category === "DeFi"
                        ? "‍🌾"
                        : null}
                    </h2>

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
    </section>
  );
};

export default AppList;
