import React from "react";
import css from "./AppPage.module.css";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { btnVariants } from "../../MotionVariants";

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
let socialLinks = [];

const AppPage = ({ data, loading }) => {
  const { id } = useParams();

  return (
    <section className={`${css.appPage} container768`}>
      {/* GO BACK BTN */}
      <Link className={css.backBtn} to="/">
        <motion.div
          className={css.backBtn__container}
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
            <div key={d.id} className={css.appItem}>
              <div
                className={css.appItem__appCover}
                style={
                  d.cover
                    ? {
                        backgroundImage: `url(${d.cover})`,
                      }
                    : { display: "none" }
                }
              ></div>
              <div className={css.appItem__appInfo}>
                <img
                  className={css.appItem__appInfo__logo}
                  src={d.logo}
                  alt={d.name}
                  style={{
                    display: d.logo ? "null" : "none",
                  }}
                />
                <div className={css.appItem__appInfo__appCaption}>
                  <h2 className={css.appItem__appInfo__appCaption__title}>
                    {d.name}
                  </h2>

                  <span className={css.appItem__appInfo__appCaption__tag}>
                    {d.category}
                  </span>
                </div>
              </div>

              <p className="bodyTextLight">{d.description}</p>
              <br />

              <motion.div
                className={css.appItem__tradeBtn}
                data-value="btn"
                variants={btnVariants}
                whileHover="whileHover"
                style={d.marketUrl ? null : { display: "none" }}
              >
                <a
                  href={d.marketUrl}
                  target="_blank"
                  rel="norefferrer noopener"
                >
                  Trade {iconArrowRight}
                </a>
              </motion.div>

              {/* IC ECOSYSTEM LINKS */}
              <div
                style={
                  d.canister || d.dscvr || d.distrikt || d.openChat
                    ? null
                    : { display: "none" }
                }
              >
                <p className="bodyText">IC Ecosystem</p>
                <ul className={css.appItem__socialIconsList}>
                  {
                    ((icLinks = [
                      {
                        name: "Canister",
                        link: d.canister,
                        icon: "🛢️",
                        img: "",
                      },
                      {
                        name: "Dscvr",
                        link: d.dscvr,
                        icon: "",
                        img: "https://i.postimg.cc/ZqN5BX1m/dscvr.jpg",
                      },
                      {
                        name: "Distrikt",
                        link: d.distrikt,
                        icon: "",
                        img: "https://i.postimg.cc/YqcjBq5f/distrikt-app-logo.jpg",
                      },
                      {
                        name: "Open Chat",
                        link: d.openChat,
                        icon: "",
                        img: "",
                      },
                    ]),
                    icLinks.map(({ name, link, icon, img }) => (
                      <motion.li
                        key={name}
                        data-social={name}
                        variants={btnVariants}
                        whileHover="whileHover"
                        className={css.appItem__socialIconsList__item}
                        style={link ? null : { display: "none" }}
                      >
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {icon ? (
                            icon
                          ) : img ? (
                            <img src={img} alt={`${name} logo`} />
                          ) : null}
                        </a>
                      </motion.li>
                    )))
                  }
                </ul>
              </div>

              {/* SOCIAL MEDIA LINKS */}
              <div
                style={
                  d.website || d.discord || d.github || d.telegram || d.medium
                    ? null
                    : { display: "none" }
                }
              >
                <p className="bodyText">Social Media</p>

                <ul className={css.appItem__socialIconsList}>
                  {
                    ((socialLinks = [
                      {
                        name: "Website",
                        link: d.website,
                        icon: iconGlobe,
                      },
                      {
                        name: "Twitter",
                        link: d.twitter,
                        icon: iconTwitter,
                      },
                      {
                        name: "Discord",
                        link: d.discord,
                        icon: iconDiscord,
                      },
                      {
                        name: "GitHub",
                        link: d.github,
                        icon: iconGithub,
                      },
                      {
                        name: "Telegram",
                        link: d.telegram,
                        icon: iconTelegram,
                      },
                      {
                        name: "Medium",
                        link: d.medium,
                        icon: iconMedium,
                      },
                    ]),
                    socialLinks.map(({ name, link, icon }) => (
                      <motion.li
                        key={name}
                        data-social={name}
                        variants={btnVariants}
                        whileHover="whileHover"
                        className={css.appItem__socialIconsList__item}
                        style={link ? null : { display: "none" }}
                      >
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {icon}
                        </a>
                      </motion.li>
                    )))
                  }
                </ul>
              </div>
              <a
                href="https://twitter.com/messages/compose?recipient_id=1386304698358116354"
                className={css.twitterDmButton}
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
