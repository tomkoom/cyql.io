import React from "react";
import css from "./AppPage.module.css";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { socLinkBtns } from "../../motionVariants";

// Redux
import { useSelector } from "react-redux";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faGlobe,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faTelegramPlane,
  faDiscord,
  faMedium,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const iconArrowLeft = <FontAwesomeIcon icon={faArrowLeft} />;
const iconArrowRight = <FontAwesomeIcon icon={faArrowRight} size="xs" />;
const iconGlobe = <FontAwesomeIcon icon={faGlobe} />;
const iconTwitter = <FontAwesomeIcon icon={faTwitter} />;
const iconDiscord = <FontAwesomeIcon icon={faDiscord} />;
const iconGithub = <FontAwesomeIcon icon={faGithub} />;
const iconTelegram = <FontAwesomeIcon icon={faTelegramPlane} />;
const iconMedium = <FontAwesomeIcon icon={faMedium} />;

let icLinks = [];
let nftItem = {};

let socialLinks = [];

const AppPage = ({ data, loading }) => {
  const { id } = useParams();

  const nftItems = useSelector((state) => state.nftItems.nftItems);

  return (
    <section className={`${css.appPage} container1440`}>
      {/* GO BACK BTN */}
      <Link className={css.backBtn} to="/">
        <motion.div className={css.backBtn__container}>
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
              />
              <div className={css.appItem__appInfo}>
                {/* logo */}
                <img
                  className={css.appItem__appInfo__logo}
                  src={d.logo}
                  alt={d.name}
                  style={{
                    display: d.logo ? "null" : "none",
                  }}
                />
                {/* title and tags */}
                <div className={css.appItem__appInfo__appCaption}>
                  <h2 className={css.appItem__appInfo__appCaption__title}>
                    {d.name}
                  </h2>

                  <div className={css.appItem__appInfo__appCaption__tags}>
                    <span
                      className={css.appItem__appInfo__appCaption__tags__item}
                    >
                      {d.category}
                    </span>
                    <span
                      style={d.tags ? null : { display: "none" }}
                      className={css.appItem__appInfo__appCaption__tags__item}
                    >
                      {d.tags}
                    </span>
                  </div>
                </div>

                {/* date */}
                <div className={css.appItem__appInfo__date}>{d.date}</div>
              </div>

              <p className="bodyTextLight">{d.description}</p>
              <br />

              {/* NFT IMAGES */}
              <div
                className={css.nftImgs}
                style={d.nftImg1 ? null : { display: "none" }}
              >
                <div
                  className={css.nftImgs__item}
                  style={d.nftImg1 ? null : { display: "none" }}
                >
                  <img src={d.nftImg1} alt={`${d.name} nft1`} />
                </div>
                <div
                  className={css.nftImgs__item}
                  style={d.nftImg2 ? null : { display: "none" }}
                >
                  <img src={d.nftImg2} alt={`${d.name} nft2`} />
                </div>
                <div
                  className={css.nftImgs__item}
                  style={d.nftImg3 ? null : { display: "none" }}
                >
                  <img src={d.nftImg3} alt={`${d.name} nft3`} />
                </div>
                <div
                  className={css.nftImgs__item}
                  style={d.nftImg4 ? null : { display: "none" }}
                >
                  <img src={d.nftImg4} alt={`${d.name} nft4`} />
                </div>
              </div>

              {/* NFT MARKET DATA */}
              <div
                style={
                  nftItems
                    ? nftItems.find((nftItem) => nftItem.name === d.name)
                      ? null
                      : { display: "none" }
                    : null
                }
              >
                {
                  ((nftItem = nftItems
                    ? nftItems.find((nftItem) => nftItem.name === d.name)
                    : null),
                  (
                    <div className={css.appItem__nftMarketData}>
                      {/* Volume */}
                      <div className={css.appItem__nftMarketData__item}>
                        <p className={css.appItem__nftMarketData__item__title}>
                          Volume 📈
                        </p>
                        <p className={css.appItem__nftMarketData__item__data}>
                          {nftItem
                            ? `${nftItem.salesInIcpFormatted} ICP`
                            : null}
                        </p>
                      </div>
                      {/* Sales */}
                      <div className={css.appItem__nftMarketData__item}>
                        <p className={css.appItem__nftMarketData__item__title}>
                          Sales 🤝
                        </p>
                        <p className={css.appItem__nftMarketData__item__data}>
                          {nftItem ? nftItem.sales : null}
                        </p>
                      </div>

                      {/* Minted NFTs */}
                      <div className={css.appItem__nftMarketData__item}>
                        <p className={css.appItem__nftMarketData__item__title}>
                          Minted NFTs 🗿
                        </p>
                        <p className={css.appItem__nftMarketData__item__data}>
                          {nftItem ? nftItem.totalAssetsFormatted : null}
                        </p>
                      </div>

                      {/* Listings */}
                      <div className={css.appItem__nftMarketData__item}>
                        <p className={css.appItem__nftMarketData__item__title}>
                          Market Listings 📦
                        </p>
                        <p className={css.appItem__nftMarketData__item__data}>
                          {nftItem ? nftItem.listings : null}
                        </p>
                      </div>
                    </div>
                  ))
                }
              </div>

              <div className={css.appItem__btns}>
                {/* Compare stats */}
                <div
                  className={css.appItem__btns__item}
                  style={d.category === "NFTs" ? null : { display: "none" }}
                >
                  <Link to="/nft">Compare Stats</Link>
                </div>
                {/* Trade */}
                <div
                  className={css.appItem__btns__item__secondary}
                  style={d.marketUrl ? null : { display: "none" }}
                >
                  <a
                    href={d.marketUrl}
                    target="_blank"
                    rel="norefferrer noopener"
                  >
                    Trade on Entrepot&nbsp;&nbsp;{iconArrowRight}
                  </a>
                </div>
              </div>

              <div className={css.linksContainer}>
                {/* IC ECOSYSTEM LINKS */}
                <div
                  style={
                    d.canister || d.dscvr || d.distrikt || d.openChat
                      ? null
                      : { display: "none" }
                  }
                >
                  <p className="bodyTextLight">IC Ecosystem</p>
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
                          variants={socLinkBtns}
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
                            <span>{name}</span>
                          </a>
                        </motion.li>
                      )))
                    }
                  </ul>
                </div>

                {/* SOCIAL MEDIA LINKS */}
                <div
                  style={
                    d.website ||
                    d.twitter ||
                    d.discord ||
                    d.github ||
                    d.telegram ||
                    d.medium
                      ? null
                      : { display: "none" }
                  }
                >
                  <p className="bodyTextLight">Social Media</p>

                  <ul className={css.appItem__socialIconsList}>
                    {
                      ((socialLinks = [
                        { name: "Website", link: d.website, icon: iconGlobe },
                        { name: "Twitter", link: d.twitter, icon: iconTwitter },
                        { name: "Discord", link: d.discord, icon: iconDiscord },
                        {
                          name: "Telegram",
                          link: d.telegram,
                          icon: iconTelegram,
                        },
                        { name: "GitHub", link: d.github, icon: iconGithub },
                        { name: "Medium", link: d.medium, icon: iconMedium },
                      ]),
                      socialLinks.map(({ name, link, icon }) => (
                        <motion.li
                          key={name}
                          data-social={name}
                          variants={socLinkBtns}
                          whileHover="whileHover"
                          className={css.appItem__socialIconsList__item}
                          style={link ? null : { display: "none" }}
                        >
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {icon} <span>{name}</span>
                          </a>
                        </motion.li>
                      )))
                    }
                  </ul>
                </div>
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
