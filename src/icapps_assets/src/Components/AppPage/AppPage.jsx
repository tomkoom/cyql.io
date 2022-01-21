import React from "react";
import css from "./AppPage.module.css";
import { useParams } from "react-router-dom";
import { goBack } from "../../Routes/routes";
import { motion } from "framer-motion";
import { socLinkBtns } from "../../motionVariants";
import Loader from "../../Loader";

// Redux
import { useSelector } from "react-redux";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faLink,
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
const iconLink = <FontAwesomeIcon icon={faLink} />;
const iconTwitter = <FontAwesomeIcon icon={faTwitter} />;
const iconDiscord = <FontAwesomeIcon icon={faDiscord} />;
const iconGithub = <FontAwesomeIcon icon={faGithub} />;
const iconTelegram = <FontAwesomeIcon icon={faTelegramPlane} />;
const iconMedium = <FontAwesomeIcon icon={faMedium} />;

let nftItem = {};
let socialLinks = [];
let icLinks = [];

const AppPage = () => {
  const { id } = useParams();
  const nftItems = useSelector((state) => state.nftItems.nftItems);
  const projects = useSelector((state) => state.siteData.projects);

  return (
    <section className={`${css.appPage} container768`}>
      {/* go back btn */}
      <button className="navlink" onClick={() => goBack()}>
        <div className={css.backBtn__container}>{iconArrowLeft}</div>
      </button>

      {/* content */}
      {projects.length < 1 ? (
        <Loader />
      ) : (
        projects
          .filter((project) => project.id === id)
          .map((project) => (
            <div className={css.app} key={project.id}>
              {project.cover && (
                <div
                  className={css.app__cover}
                  style={{ backgroundImage: `url(${project.cover})` }}
                />
              )}

              <div className={css.app__info}>
                {/* logo */}
                {project.logo && (
                  <img
                    className={css.app__info__logo}
                    src={project.logo}
                    alt={`${project.name} logo`}
                  />
                )}

                {/* title and tags */}
                <div className={css.app__info__caption}>
                  <h3 className={css.app__info__caption__title}>
                    {project.name}
                  </h3>

                  <div className={css.app__info__caption__tags}>
                    <span className={css.app__info__caption__tags__item}>
                      {project.category}
                    </span>
                    {project.tags && (
                      <span className={css.app__info__caption__tags__item}>
                        {project.tags}
                      </span>
                    )}
                  </div>
                </div>
                {/* date */}
                <div className={css.app__info__date}>{project.dateAdded}</div>
              </div>

              <p className="bodyText">{project.description}</p>

              {/* nft images */}
              {project.nftImg1 && (
                <div className={css.nftImgs}>
                  {(() => {
                    let nftPreviews = [];
                    for (let i = 1; i <= 4; i++) {
                      nftPreviews.push(
                        <div className={css.nftImgs__item} key={i}>
                          <img
                            src={project[`nftImg${i}`]}
                            alt={`${project.name} nft preview ${i}`}
                          />
                        </div>
                      );
                    }
                    return nftPreviews;
                  })()}
                </div>
              )}

              {/* nft market data */}
              {
                ((nftItem = nftItems
                  ? nftItems.find((nftItem) => nftItem.name === project.name)
                  : null),
                nftItem && (
                  <div className={css.nftMarketData}>
                    {/* volume */}
                    <div className={css.nftMarketData__item}>
                      <h5>Volume</h5>
                      <p>{`${nftItem.salesInIcpFormatted} ICP`}</p>
                    </div>

                    {/* sales */}
                    <div className={css.nftMarketData__item}>
                      <h5>Sales</h5>
                      <p>{nftItem.sales}</p>
                    </div>

                    {/* minted nfts */}
                    <div className={css.nftMarketData__item}>
                      <h5>Minted NFTs</h5>
                      <p>{nftItem.totalAssetsFormatted}</p>
                    </div>

                    {/* listings */}
                    <div className={css.nftMarketData__item}>
                      <h5>Market Listings</h5>
                      <p className={css.nftMarketData__item__data}>
                        {nftItem.listings}
                      </p>
                    </div>
                  </div>
                ))
              }

              {project.marketUrl && (
                <a
                  className={css.app__btn}
                  href={project.marketUrl}
                  target="_blank"
                  rel="norefferrer noopener"
                >
                  Trade on Entrepot&nbsp;&nbsp;{iconArrowRight}
                </a>
              )}

              {/* links */}
              <div>
                {project.canister ||
                project.dscvr ||
                project.distrikt ||
                project.openChat ? (
                  <div>
                    <p className="bodyText">IC Ecosystem</p>
                    <ul className={css.links}>
                      {
                        ((icLinks = [
                          {
                            name: "Canister",
                            link: project.canister,
                            icon: "🛢️",
                            img: "",
                          },
                          {
                            name: "Dscvr",
                            link: project.dscvr,
                            icon: "",
                            img: "https://i.postimg.cc/ZqN5BX1m/dscvr.jpg",
                          },
                          {
                            name: "Distrikt",
                            link: project.distrikt,
                            icon: "",
                            img: "https://i.postimg.cc/YqcjBq5f/distrikt-app-logo.jpg",
                          },
                          {
                            name: "Open Chat",
                            link: project.openChat,
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
                            className={css.links__item}
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
                ) : (
                  ""
                )}

                {project.website ||
                project.twitter ||
                project.discord ||
                project.github ||
                project.telegram ||
                project.medium ? (
                  <div>
                    <p className="bodyText">Social Media</p>
                    <ul className={css.links}>
                      {
                        ((socialLinks = [
                          {
                            name: "Website",
                            link: project.website,
                            icon: iconLink,
                          },
                          {
                            name: "Twitter",
                            link: project.twitter,
                            icon: iconTwitter,
                          },
                          {
                            name: "Discord",
                            link: project.discord,
                            icon: iconDiscord,
                          },
                          {
                            name: "Telegram",
                            link: project.telegram,
                            icon: iconTelegram,
                          },
                          {
                            name: "GitHub",
                            link: project.github,
                            icon: iconGithub,
                          },
                          {
                            name: "Medium",
                            link: project.medium,
                            icon: iconMedium,
                          },
                        ]),
                        socialLinks.map(({ name, link, icon }) => (
                          <motion.li
                            key={name}
                            data-social={name}
                            variants={socLinkBtns}
                            whileHover="whileHover"
                            className={css.links__item}
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
                ) : (
                  ""
                )}
              </div>

              <a
                href="https://twitter.com/messages/compose?recipient_id=1386304698358116354"
                className={css.twitterDmButton}
                data-screen-name="@DfinitApps"
                rel="noreferrer noopener"
              >
                Edit the project info
              </a>
            </div>
          ))
      )}
    </section>
  );
};

export default AppPage;
