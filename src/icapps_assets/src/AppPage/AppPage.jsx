import React, { useState } from "react";
import "./AppPage.css";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { btnVariants } from "../MotionVariants";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faGlobe,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faTelegram,
  faDiscord,
  faMedium,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const iconArrowLeft = <FontAwesomeIcon icon={faArrowLeft} />;
const iconArrowRight = <FontAwesomeIcon icon={faArrowRight} />;
const iconGlobe = <FontAwesomeIcon icon={faGlobe} />;
const iconTwitter = <FontAwesomeIcon icon={faTwitter} />;
const iconDiscord = <FontAwesomeIcon icon={faDiscord} />;
const iconGithub = <FontAwesomeIcon icon={faGithub} />;
const iconTelegram = <FontAwesomeIcon icon={faTelegram} />;
const iconMedium = <FontAwesomeIcon icon={faMedium} />;

let icLinks = [];

const AppPage = ({ data, loading }) => {
  const { id } = useParams();

  return (
    <section className="app-page container768">
      {/* GO BACK BTN */}
      <Link className="backBtn" to="/">
        <motion.div
          className="backBtn__container"
          variants={btnVariants}
          whileHover="whileHover"
        >
          {iconArrowLeft}
        </motion.div>
      </Link>

      {/* CONTENT */}
      {loading ? (
        <p className="center">Loading...</p>
      ) : (
        data[0].data
          .filter((d) => d.id === id)
          .map((d) => (
            <div key={d.id} className="app-item">
              <div
                className="app-item__app-cover"
                style={
                  d.cover
                    ? {
                        backgroundImage: `url(${d.cover})`,
                      }
                    : { display: "none" }
                }
              ></div>
              <div className="app-item__app-info">
                <img
                  className="app-item__app-info__logo"
                  src={d.logo}
                  alt={d.name}
                  style={{
                    display: d.logo ? "null" : "none",
                  }}
                />
                <div className="app-item__app-info__app-caption">
                  <h2 className="app-item__app-info__app-caption__title">
                    {d.name}
                  </h2>

                  <span className="app-item__app-info__app-caption__tag">
                    {d.category}
                  </span>
                </div>
              </div>

              <p className="body-text-light">{d.description}</p>
              <br />

              <motion.div
                className="app-item__trade-btn"
                data-value="btn"
                variants={btnVariants}
                whileHover="whileHover"
                style={d.marketUrl ? null : { display: "none" }}
              >
                <a
                  href={d.marketUrl}
                  target="_blank"
                  rel="norefferrer noopener"
                  className="btn"
                >
                  Trade {iconArrowRight}
                </a>
              </motion.div>

              {/* IC ECOSYSTEM */}
              <div
                className="ic-ecosystem"
                style={
                  d.canister || d.dscvr || d.distrikt
                    ? null
                    : { display: "none" }
                }
              >
                <p className="body-text opacity66">IC Ecosystem</p>

                <ul className="app-item__social-icons-list">
                  {
                    ((icLinks = [
                      { link: d.canister, icon: "🛢️" },
                      { link: d.dscvr },
                      { link: d.distrikt },
                    ]),
                    icLinks.map(({ link }, i) => (
                      <motion.li
                        key={i}
                        data-social="Canister"
                        variants={btnVariants}
                        whileHover="whileHover"
                        className="app-item__social-icons-list__item"
                        style={link ? null : { display: "none" }}
                      >
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          🛢️
                        </a>
                      </motion.li>
                    )))
                  }

                  <motion.li
                    data-social="Dscvr"
                    variants={btnVariants}
                    whileHover="whileHover"
                    className="app-item__social-icons-list__item"
                    style={d.dscvr ? null : { display: "none" }}
                  >
                    <a href={d.dscvr} target="_blank" rel="noopener noreferrer">
                      <img
                        src="https://i.postimg.cc/ZqN5BX1m/dscvr.jpg"
                        alt={`${d.name} Dscvr`}
                      />
                    </a>
                  </motion.li>
                  <motion.li
                    data-social="Distrikt"
                    variants={btnVariants}
                    whileHover="whileHover"
                    className="app-item__social-icons-list__item"
                    style={d.distrikt ? null : { display: "none" }}
                  >
                    <a
                      href={d.distrikt}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="https://i.postimg.cc/YqcjBq5f/distrikt-app-logo.jpg"
                        alt={`${d.name} Distrikt`}
                      />
                    </a>
                  </motion.li>
                </ul>
              </div>

              <div
                className="social-media"
                style={
                  d.website || d.discord || d.github || d.telegram || d.medium
                    ? null
                    : { display: "none" }
                }
              >
                <p className="body-text opacity66">Social Media</p>

                <ul className="app-item__social-icons-list">
                  <motion.li
                    data-social="Website"
                    variants={btnVariants}
                    whileHover="whileHover"
                    className="app-item__social-icons-list__item"
                    style={d.website ? null : { display: "none" }}
                  >
                    <a
                      href={d.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {iconGlobe}
                    </a>
                  </motion.li>

                  <motion.li
                    data-social="Twitter"
                    variants={btnVariants}
                    whileHover="whileHover"
                    className="app-item__social-icons-list__item"
                    style={d.twitter ? null : { display: "none" }}
                  >
                    <a
                      href={d.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {iconTwitter}
                    </a>
                  </motion.li>
                  <motion.li
                    data-social="Discord"
                    variants={btnVariants}
                    whileHover="whileHover"
                    className="app-item__social-icons-list__item"
                    style={d.discord ? null : { display: "none" }}
                  >
                    <a
                      href={d.discord}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {iconDiscord}
                    </a>
                  </motion.li>
                  <motion.li
                    data-social="GitHub"
                    variants={btnVariants}
                    whileHover="whileHover"
                    className="app-item__social-icons-list__item"
                    style={d.github ? null : { display: "none" }}
                  >
                    <a
                      href={d.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {iconGithub}
                    </a>
                  </motion.li>
                  <motion.li
                    data-social="Telegram"
                    variants={btnVariants}
                    whileHover="whileHover"
                    className="app-item__social-icons-list__item"
                    style={d.telegram ? null : { display: "none" }}
                  >
                    <a
                      href={d.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {iconTelegram}
                    </a>
                  </motion.li>

                  <motion.li
                    data-social="Medium"
                    variants={btnVariants}
                    whileHover="whileHover"
                    className="app-item__social-icons-list__item"
                    style={d.medium ? null : { display: "none" }}
                  >
                    <a
                      href={d.medium}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {iconMedium}
                    </a>
                  </motion.li>
                </ul>
              </div>
              <a
                href="https://twitter.com/messages/compose?recipient_id=1386304698358116354"
                className="twitterDmButton"
                data-screen-name="@DfinitApps"
                rel="noreferrer noopener"
              >
                Edit the project info
              </a>
              {/* END APP ITEM */}
            </div>
          ))
      )}
    </section>
  );
};

export default AppPage;
