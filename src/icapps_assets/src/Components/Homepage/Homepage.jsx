import React from "react";
import css from "./Homepage.module.css";
import { Link } from "react-router-dom";
import Loader from "../../Loader";

// Framer Motion
import { motion } from "framer-motion";
import { cardVariants } from "../../motionVariants";

// Redux
import { useSelector } from "react-redux";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const iconDatabase = <FontAwesomeIcon icon={faDatabase} />;
const iconGithub = <FontAwesomeIcon icon={faGithub} />;

const Homepage = () => {
  const apps = useSelector((state) => state.siteData.projects);
  const upcomingNfts = useSelector((state) => state.siteData.upcomingNfts);

  return (
    <main className={`${css.home} container1440`}>
      <section className={css.home__hero}>
        <h2 className={css.home__hero__title}>IC apps community portal</h2>
      </section>

      {/* Apps Section */}
      <section className={css.home__apps}>
        {/* Title */}
        <div className={css.home__section__title}>
          <h3>Recently added apps</h3>
          <Link to="/apps">View all &gt;</Link>
        </div>

        {/* List */}
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
                    <div
                      className={css.li__item__linkBlock__appInfo__description}
                    >
                      <h2
                        className={
                          css.li__item__linkBlock__appInfo__description__title
                        }
                      >
                        {app.name}
                        &nbsp;
                        {app.category == "Social Networks"
                          ? "🎯"
                          : app.category == "Games"
                          ? "⚔️"
                          : app.category == "dApps"
                          ? "🔗"
                          : app.category == "DeFi"
                          ? "‍🌾"
                          : app.category == "DAOs"
                          ? "🏠"
                          : app.category == "Infrastructure"
                          ? "🚀"
                          : app.category == "Wallets"
                          ? "👛"
                          : app.category == "Tools"
                          ? "🛠️"
                          : app.category == "Explorers"
                          ? "🌎"
                          : app.category == "NFTs"
                          ? "🗿"
                          : app.category == "DeFi"
                          ? "‍🌾"
                          : null}
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
      </section>

      {/* UPCOMING NFT SALES */}
      <section className={css.home__upcomingNfts}>
        {/* Title */}
        <div className={css.home__section__title}>
          <h3>Upcoming NFT sales</h3>
          <Link to="/upcoming">View all &gt;</Link>
        </div>

        {/* List */}
        <ul className={css.home__upcNfts__li}>
          {!upcomingNfts.length ? (
            <Loader />
          ) : (
            upcomingNfts
              .filter((upcNft) => upcNft["Date"] !== "Sale is open")
              .slice(0, 9)
              .map((upcNft, i) => (
                <motion.li
                  className={css.home__upcNfts__li__i}
                  variants={cardVariants}
                  whileHover="whileHover"
                  key={i}
                >
                  <Link to={`/a/${upcNft.id}`} className={css.linkBlock}>
                    {/* Main */}
                    <div className={css.home__upcNfts__li__i__main}>
                      <h4>{upcNft["Name"]}</h4>
                      <p className="bodyTextLight">
                        {upcNft["Description"] &&
                        upcNft["Description"].length > 100
                          ? `${upcNft["Description"].substring(0, 100)}...`
                          : upcNft["Description"]}
                      </p>
                    </div>

                    {/* NFT Images */}
                    <div className={css.home__upcNfts__li__i__img}>
                      <div
                        className={css.home__upcNfts__li__i__img__i}
                        style={{ backgroundImage: `url(${upcNft["Img1"]})` }}
                      />
                      <div
                        className={css.home__upcNfts__li__i__img__i}
                        style={{ backgroundImage: `url(${upcNft["Img2"]})` }}
                      />
                      <div
                        className={css.home__upcNfts__li__i__img__i}
                        style={{ backgroundImage: `url(${upcNft["Img3"]})` }}
                      />
                      <div
                        className={css.home__upcNfts__li__i__img__i}
                        style={{ backgroundImage: `url(${upcNft["Img4"]})` }}
                      />
                    </div>
                  </Link>
                </motion.li>
              ))
          )}
        </ul>
      </section>

      {/* ONGOING NFT SALES */}
      <section className={css.home__upcomingNfts}>
        {/* Title */}
        <div className={css.home__section__title}>
          <h3>Ongoing NFT sales</h3>
          <Link to="/upcoming">View all &gt;</Link>
        </div>

        {/* List */}
        <ul className={css.home__upcNfts__li}>
          {!upcomingNfts.length ? (
            <Loader />
          ) : (
            upcomingNfts
              .filter((upcNft) => upcNft["Date"] === "Sale is open")
              .slice(0, 9)
              .map((upcNft, i) => (
                <motion.li
                  className={css.home__upcNfts__li__i}
                  variants={cardVariants}
                  whileHover="whileHover"
                  key={i}
                >
                  <Link to={`/a/${upcNft.id}`} className={css.linkBlock}>
                    {/* Main */}
                    <div className={css.home__upcNfts__li__i__main}>
                      <h4>{upcNft["Name"]}</h4>
                      <p className="bodyTextLight">
                        {upcNft["Description"] &&
                        upcNft["Description"].length > 140
                          ? `${upcNft["Description"].substring(0, 140)}...`
                          : upcNft["Description"]}
                      </p>
                    </div>

                    {/* NFT Images */}
                    <div className={css.home__upcNfts__li__i__img}>
                      <div
                        className={css.home__upcNfts__li__i__img__i}
                        style={{ backgroundImage: `url(${upcNft["Img1"]})` }}
                      />
                      <div
                        className={css.home__upcNfts__li__i__img__i}
                        style={{ backgroundImage: `url(${upcNft["Img2"]})` }}
                      />
                      <div
                        className={css.home__upcNfts__li__i__img__i}
                        style={{ backgroundImage: `url(${upcNft["Img3"]})` }}
                      />
                      <div
                        className={css.home__upcNfts__li__i__img__i}
                        style={{ backgroundImage: `url(${upcNft["Img4"]})` }}
                      />
                    </div>
                  </Link>
                </motion.li>
              ))
          )}
        </ul>
      </section>

      {/* <section className={css.home__communityLinks}>
        <div className={css.home__section__title}>
          <h3>Join icApps community</h3>
        </div>

        <div className={css.home__communityLinks__content}>
          <div className={css.home__communityLinks__content__item}>
            {iconDiscord}
            <a href="">Join Discord</a>
          </div>
          <div className={css.home__communityLinks__content__item}>
            {iconTwitter}
            <a href="">Follow on Twitter</a>
          </div>
        </div>
      </section> */}
    </main>
  );
};

export default Homepage;
