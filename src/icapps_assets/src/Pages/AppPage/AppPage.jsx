import React, { useState } from "react";
import css from "./AppPage.module.css";
import { useParams } from "react-router-dom";
import { goBack } from "../../Routes/routes";
import Loader from "../../Components/Loader/Loader";

// icons
import {
  iLink,
  iTwitter,
  iTelegram,
  iDiscord,
  iMedium,
  iGithub,
  iArrowLeft,
  iArrowRight,
  iExternalLink,
} from "../../Icons/Icons";

// redux
import { useSelector } from "react-redux";
import { selectProjects } from "../../State/siteData";
import { selectNftItems } from "../../State/nftItems";

let nftItem = {};
let socialLinks = [];
let icLinks = [];

const ExpandableText = ({ children }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={css.expandable}>
      <div
        className={css.expandable__content}
        style={{ maxHeight: expanded ? "none" : "20px" }}
      >
        {children}
      </div>
      <button
        className={`${css.readMoreBtn} navlink`}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Read less" : "Read more"}
      </button>
    </div>
  );
};

const AppPage = () => {
  const { id } = useParams();
  const nftItems = useSelector(selectNftItems);
  const projects = useSelector(selectProjects);

  const getTwitterUsername = (url) => {
    const username = url.split(".com/")[1];
    return "@" + username;
  };

  return (
    <section className={`${css.appPage} container768`}>
      <button className="navlink" onClick={() => goBack()}>
        <div className={css.backBtn__container}>{iArrowLeft}</div>
      </button>

      <ExpandableText>
        <p>
          This website is maintained by the IC community. Anyone can submit
          their project. Not all information may be properly verified and
          therefore may not be accurate. DYOR and use your best judgement when
          dealing with the projects listed on this site.
        </p>
      </ExpandableText>

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
                    {project.category === "NFTs" && project.nftSaleStatus ? (
                      <span
                        className={`${css.app__info__caption__tags__item} ${css.nftSaleStatus}`}
                      >
                        {project.nftSaleStatus === "Over"
                          ? "Launched"
                          : project.nftSaleStatus === "Open"
                          ? "Sale is open"
                          : "Upcoming NFT sale"}
                      </span>
                    ) : null}
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
                        project[`nftImg${i}`] ? (
                          <div className={css.nftImgs__item} key={i}>
                            <img
                              src={project[`nftImg${i}`]}
                              alt={`${project.name} nft preview ${i}`}
                            />
                          </div>
                        ) : (
                          ""
                        )
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

              {project.nftMarketUrl && (
                <a
                  className={css.trade__btn}
                  href={project.nftMarketUrl}
                  target="_blank"
                  rel="norefferrer noopener"
                >
                  Trade on Entrepot&nbsp;<span>{iArrowRight}</span>
                </a>
              )}

              {/* ic links */}
              <div>
                {project.canister ||
                project.dscvr ||
                project.distrikt ||
                project.openChat ? (
                  <div>
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
                          <li
                            key={name}
                            data-social={name}
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
                          </li>
                        )))
                      }
                    </ul>
                  </div>
                ) : (
                  ""
                )}

                {project.website ||
                project.app ||
                project.twitter ||
                project.discord ||
                project.github ||
                project.telegram ||
                project.medium ? (
                  <div>
                    <ul className={css.links}>
                      {
                        ((socialLinks = [
                          {
                            id: "Website",
                            name: "Website",
                            link: project.website,
                            icon: iLink,
                          },
                          {
                            id: "App",
                            name: "App",
                            link: project.app,
                            icon: iExternalLink,
                          },
                          {
                            id: "Twitter",
                            name: getTwitterUsername(project.twitter),
                            link: project.twitter,
                            icon: iTwitter,
                          },
                          {
                            id: "Discord",
                            name: "Discord",
                            link: project.discord,
                            icon: iDiscord,
                          },
                          {
                            id: "Telegram",
                            name: "Telegram",
                            link: project.telegram,
                            icon: iTelegram,
                          },
                          {
                            id: "GitHub",
                            name: "GitHub",
                            link: project.github,
                            icon: iGithub,
                          },
                          {
                            id: "Medium",
                            name: "Medium",
                            link: project.medium,
                            icon: iMedium,
                          },
                        ]),
                        socialLinks.map(({ id, name, link, icon }) => (
                          <li
                            key={id}
                            data-social={id}
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
                          </li>
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
