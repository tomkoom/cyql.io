import React from "react";
import css from "./UpcomingNfts.module.css";
import Loader from "../../CatLoader";

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
  <FontAwesomeIcon icon={faArrowRight} id={css.iconArrowRight} />
);
const iconCalendar = (
  <FontAwesomeIcon icon={faCalendarAlt} id={css.iconCalendar} />
);
const iconGlobe = <FontAwesomeIcon icon={faGlobe} />;
const iconTwitter = <FontAwesomeIcon icon={faTwitter} />;
const iconDiscord = <FontAwesomeIcon icon={faDiscord} />;
const iconTelegram = <FontAwesomeIcon icon={faTelegram} />;
const iconMedium = <FontAwesomeIcon icon={faMedium} />;

let socialLinks = [];
let icLinks = [];

const UpcomingNfts = () => {
  const upcomingNfts = useSelector((state) => state.siteData.upcomingNfts);

  return (
    <section className={css.nft}>
      {/* Hero */}
      <div className={css.nft__hero}>
        <h2>Upcoming NFT Sales &#38; Airdrops</h2>
        <p className="bodyText">
          {/* Information on this page should not be considered as financial advice. */}
          Please note: We do not guarantee information provided on this page is
          100% accurate. Please do your own research.
        </p>

        {/* Media partners */}
        <div className={css.mediaPartners}>
          <p>Media Partners</p>

          <div className={css.mediaPartners__logo}>
            <img
              src="https://i.postimg.cc/50PprTYH/golka-userimg-rec.png"
              alt="Golka UserImg"
            />
            Golka
          </div>

          <div className={css.mediaPartners__logo}>
            <img
              src="https://i.postimg.cc/bYVLq76L/entrepot-logo-168.png"
              alt="Entrepot Logo"
            />
            Entrepot
          </div>
        </div>

        {/* Submit btn */}
        <a
          className={css.submitBtn}
          href="https://forms.gle/rSxVndkZCkSpnfph7"
          target="_blank"
          rel="noreferrer noopener"
        >
          Submit your project
        </a>
      </div>

      {/* Content */}
      {upcomingNfts && upcomingNfts.length > 0 ? (
        upcomingNfts.map((nft) => (
          <div className={css.nft__card} key={nft.name}>
            <div className={css.nft__card__main}>
              {/* heading */}
              <div className={css.nft__card__main__heading}>
                <div className={css.nft__card__main__heading__title}>
                  <h3>{nft.name}</h3>
                </div>

                {nft.date === "Sale is open" ? (
                  <div
                    className={css.nft__card__main__heading__date}
                    data-value="btn"
                  >
                    <a
                      href={nft.market}
                      target="_blank"
                      rel="norefferrer noopener"
                    >
                      Sale is open {iconArrowRight}
                    </a>
                  </div>
                ) : (
                  <div className={css.nft__card__main__heading__date}>
                    {iconCalendar}
                    <p>{`${nft.date} ${nft.time} ${nft.timeZone}`}</p>
                  </div>
                )}
              </div>

              {/* description */}
              <p className="bodyTextLight">
                {nft.description && nft.description.length > 280
                  ? `${nft.description.substring(0, 280)}...`
                  : nft.description}
              </p>

              <p className="bodyTextLight">
                {nft.totalNfts && `Total assets 🗿 ${nft.totalNfts}`}
                {nft.totalNfts && nft.price !== "TBA" && nft.price
                  ? " · "
                  : null}
                {nft.price !== "TBA" && nft.price
                  ? `Unit price ${nft.price}`
                  : null}
              </p>

              {/* Social links */}
              <div className={css.linksList}>
                <ul className={css.nft__card__main__socLinks}>
                  {
                    ((socialLinks = [
                      { link: nft.website, icon: iconGlobe },
                      { link: nft.twitter, icon: iconTwitter },
                      { link: nft.discord, icon: iconDiscord },
                      { link: nft.telegram, icon: iconTelegram },
                      { link: nft.medium, icon: iconMedium },
                    ]),
                    socialLinks.map(({ link, icon }, i) => (
                      <li
                        className={css.nft__card__main__socLinks__i}
                        style={link ? null : { display: "none" }}
                        key={i}
                      >
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {icon}
                        </a>
                      </li>
                    )))
                  }
                </ul>

                {/* IC links */}
                <ul className={css.nft__card__main__socLinks}>
                  {
                    ((icLinks = [
                      { link: nft.dscvr, name: "Dscvr" },
                      { link: nft.distrikt, name: "Distrikt" },
                      { link: nft.openChat, name: "Open Chat" },
                    ]),
                    icLinks.map(({ link, name }, i) => (
                      <li
                        className={css.nft__card__main__icSocLinks__i}
                        style={link ? null : { display: "none" }}
                        key={i}
                      >
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {name}
                        </a>
                      </li>
                    )))
                  }
                </ul>
              </div>
            </div>

            {/* Loop NFT preview images */}
            <div
              className={css.nft__card__preview}
              style={nft.img1 ? null : { display: "none" }}
            >
              {(() => {
                let nftPreviews = [];
                for (let i = 1; i <= 4; i++) {
                  nftPreviews.push(
                    <img
                      className={css.nft__card__preview__i}
                      src={nft[`img${i}`]}
                      alt={`${nft.name} preview${i}`}
                      key={i}
                    />
                  );
                }
                return nftPreviews;
              })()}
            </div>
          </div>
        ))
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default UpcomingNfts;
