import React, { useEffect } from "react";
import css from "./UpcomingNfts.module.css";
import Loader from "../../CatLoader";

// Framer Motion
import { motion } from "framer-motion";
import { btnVariants } from "../../motionVariants";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faCalendarAlt,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faTelegram,
  faDiscord,
  faMedium,
} from "@fortawesome/free-brands-svg-icons";

// Redux
import { useSelector } from "react-redux";

const iconArrowRight = (
  <FontAwesomeIcon icon={faArrowRight} color="rgba(255,255,255,0.3)" />
);
const iconCalendar = <FontAwesomeIcon icon={faCalendarAlt} color="#484644" />;
const iconGlobe = <FontAwesomeIcon icon={faGlobe} />;
const iconTwitter = <FontAwesomeIcon icon={faTwitter} />;
const iconDiscord = <FontAwesomeIcon icon={faDiscord} />;
const iconTelegram = <FontAwesomeIcon icon={faTelegram} />;
const iconMedium = <FontAwesomeIcon icon={faMedium} />;

let socialLinks = [];
let icLinks = [];

const UpcomingNfts = () => {
  // Get upcoming NFTs data from state
  const upcomingNfts = useSelector((state) => state.siteData.upcomingNfts);

  return (
    <section className={`${css.upcNft} container768`}>
      {/* HERO */}

      <div className={`${css.upcNft__hero} center`}>
        <h2>Upcoming NFT Sales &#38; Airdrops</h2>
        <p className="bodyText">
          {/* Information on this page should not be considered as financial advice. */}
          Please note: We do not guarantee information provided on this page is
          100% accurate. Please do your own research.
        </p>

        {/* MEDIA PARTNERS BADGE */}
        <div className={css.mediaPartnerBadge}>
          <p className="subtitle gray80">Media Partners</p>

          <div className={css.mediaPartnerBadge__logoContainer}>
            <img
              className={css.mediaPartnerLogo}
              src="https://i.postimg.cc/50PprTYH/golka-userimg-rec.png"
              alt="Golka UserImg"
            />
            Golka
          </div>

          <div className={`${css.mediaPartnerBadge__logoContainer} bold`}>
            <img
              className={css.mediaPartnerLogo}
              src="https://i.postimg.cc/bYVLq76L/entrepot-logo-168.png"
              alt="Entrepot Logo"
            />
            Entrepot
          </div>
        </div>

        {/* PROJECT SUBMIT BTN */}
        <a
          className={css.submitBtn}
          href="https://forms.gle/rSxVndkZCkSpnfph7"
          target="_blank"
          rel="noreferrer noopener"
        >
          Submit your project
        </a>
      </div>

      {/* CONTENT */}
      {upcomingNfts && upcomingNfts.length ? (
        upcomingNfts.map((nft) => (
          <div
            className={css.upcNft__card}
            key={nft["Name"]}
            style={
              nft["Type"] != "Promoted"
                ? null
                : {
                    boxShadow: "0 0 0 2px rgba(98, 0, 234, 0.5)",
                  }
            }
          >
            <div className={css.upcNft__card__main}>
              {/* HEADING */}

              <div className={css.upcNft__card__main__heading}>
                <div className={css.upcNft__card__main__heading__title}>
                  <h3>{nft["Name"]}</h3>
                  <span
                    className={css.upcNft__card__main__heading__featBadge}
                    style={
                      nft["Type"] != "Promoted" ? { display: "none" } : null
                    }
                  >
                    {nft["Type"] == "Promoted" ? `${nft["Type"]}` : null}
                  </span>
                </div>

                {nft["Date"] === "Sale is open" ? (
                  <motion.div
                    data-value="btn"
                    variants={btnVariants}
                    whileHover="whileHover"
                    className={css.upcNft__card__main__heading__date}
                  >
                    <a
                      href={nft["Marketplace Link"]}
                      target="_blank"
                      rel="norefferrer noopener"
                      className={css.btn}
                    >
                      Sale is open {iconArrowRight}
                    </a>
                  </motion.div>
                ) : (
                  <div className={css.upcNft__card__main__heading__date}>
                    {iconCalendar}
                    <p className="bodyText">
                      {`${nft["Date"]} ${nft["Time"]} ${nft["Time Zone"]}`}
                    </p>
                  </div>
                )}
              </div>

              {/* DESCRIPTION */}
              <p className="bodyTextLight gray40">
                {nft["Description"] && nft["Description"].length > 280
                  ? `${nft["Description"].substring(0, 280)}...`
                  : nft["Description"]}
              </p>

              <p className="bodyTextLight gray80">
                {nft["Total NFTs"] && `Total assets 🗿 ${nft["Total NFTs"]}`}
                {nft["Total NFTs"] && nft["Price"] !== "TBA" && nft["Price"]
                  ? " · "
                  : null}
                {nft["Price"] !== "TBA" && nft["Price"]
                  ? `Unit price ${nft["Price"]}`
                  : null}
              </p>

              {/* SOCIAL MEDIA LINKS */}

              <div id={css.linkList}>
                <ul className={css.upcNft__card__main__socialLinksList}>
                  {
                    ((socialLinks = [
                      { link: nft["Website"], icon: iconGlobe },
                      { link: nft["Twitter"], icon: iconTwitter },
                      { link: nft["Discord"], icon: iconDiscord },
                      { link: nft["Telegram"], icon: iconTelegram },
                      { link: nft["Medium"], icon: iconMedium },
                    ]),
                    socialLinks.map(({ link, icon }, i) => (
                      <motion.li
                        key={i}
                        variants={btnVariants}
                        whileHover="whileHover"
                        className={
                          css.upcNft__card__main__socialLinksList__item
                        }
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

                {/* IC LINKS */}
                <ul className={css.upcNft__card__main__socialLinksList}>
                  {
                    ((icLinks = [
                      { link: nft["Dscvr"], name: "Dscvr" },
                      { link: nft["Distrikt"], name: "Distrikt" },
                      { link: nft["Open Chat"], name: "Open Chat" },
                    ]),
                    icLinks.map(({ link, name }, i) => (
                      <motion.li
                        key={i}
                        variants={btnVariants}
                        whileHover="whileHover"
                        className={
                          css.upcNft__card__main__socialLinksList__item
                        }
                        style={link ? null : { display: "none" }}
                      >
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {name}
                        </a>
                      </motion.li>
                    )))
                  }
                </ul>
              </div>
            </div>

            {/* NFT IMAGES */}
            <div className={css.upcNft__card__img}>
              {(() => {
                let nftImgs = [];
                for (let i = 1; i <= 4; i++) {
                  nftImgs.push(
                    <img
                      key={i}
                      className={css.upcNft__card__img__item}
                      src={nft[`Img${i}`]}
                      alt={`${nft.Name} img ${i}`}
                    />
                  );
                }
                return nftImgs;
              })()}
            </div>
          </div>
        ))
      ) : (
        <div className="center">
          <Loader />
        </div>
      )}
    </section>
  );
};

export default UpcomingNfts;
