import React from "react";
import css from "./AppList.module.css";
import { Link } from "react-router-dom";

// FRAMER MOTION
import { motion } from "framer-motion";
import { cardVariants } from "../MotionVariants";

// COMPONENTS
import TagButton from "./TagButton/TagButton";

const AppList = ({
  category,
  setCategory,
  filteredApps,
  data,
  loading,
  error,
}) => {
  const categories = [
    { name: "All", icon: "" },
    { name: "Social Networks", icon: "🎯" },
    { name: "Games", icon: "⚔️" },
    { name: "NFTs", icon: "🗿" },
    { name: "dApps", icon: "🔗" },
    { name: "DeFi", icon: "‍🌾" },
    { name: "DAOs", icon: "🏠" },
    { name: "Infrastructure", icon: "🚀" },
    { name: "Wallets", icon: "👛" },
    { name: "Tools", icon: "🛠️" },
    { name: "Domains", icon: "🤖" },
    { name: "Explorers", icon: "🌎" },
    { name: "Dfinity Apps", icon: "♾️" },
    { name: "Communities", icon: "📣" },
  ];

  return (
    <div className={`${css.appList} container1920`}>
      {/* <h2 className={css.appList__heading}>Discover new projects</h2> */}

      {/* CATEGORY BUTTONS */}
      <div className={css.tags}>
        {categories.map((cat, i) => (
          <TagButton
            setCategory={setCategory}
            category={cat.name}
            categoryActive={category === cat.name ? true : false}
            icon={cat.icon}
            appsNum={
              loading
                ? null
                : cat.name === "All"
                ? data[0].data.length
                : data[0].data.filter((item) => item.category === cat.name)
                    .length
            }
            key={i}
          />
        ))}
      </div>

      {/* APP LIST */}
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
                      {d.description && d.description.length > 75
                        ? `${d.description.substring(0, 75)}…`
                        : d.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {/* ADS */}
      <div className={css.appList__ads}>
        {loading ? (
          <p className="center">Loading...</p>
        ) : error ? (
          <p className="center">Fetch error!</p>
        ) : (
          data[1].data.map((add, i) => (
            <motion.a
              className={css.appList__ads__item}
              href={add.link ? add.link : "#"}
              target="_blank"
              rel="norefferer noopener"
              variants={cardVariants}
              whileHover="whileHover"
              key={i}
            >
              <div
                className={css.appList__ads__item__cover}
                style={{
                  backgroundImage: `url(${add.cover})`,
                }}
                alt={add.name}
              />
              <div className={css.appList__ads__item__info}>
                <p className="bodyText center">{add.description}</p>
              </div>
            </motion.a>
          ))
        )}
      </div>
    </div>
  );
};

export default AppList;
