import React from "react";
import css from "./UpcomingNfts.module.css";
import Loader from "../../Loader";
import { toApp } from "../../Routes/routes";

// redux
import { useSelector } from "react-redux";

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faTelegramPlane,
  faDiscord,
  faMedium,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const iconTwitter = <FontAwesomeIcon icon={faTwitter} />;
const iconDiscord = <FontAwesomeIcon icon={faDiscord} />;
const iconGithub = <FontAwesomeIcon icon={faGithub} />;
const iconTelegram = <FontAwesomeIcon icon={faTelegramPlane} />;
const iconMedium = <FontAwesomeIcon icon={faMedium} />;
const iconLink = <FontAwesomeIcon icon={faLink} />;

let socialLinks = [];
let icLinks = [];

const UpcomingNfts = () => {
  const upcomingNfts = useSelector(
    (state) => state.siteData.upcomingNfts.value
  );

  const sortByDate = (a, b) => {
    if (a.nftSaleDate < b.nftSaleDate) {
      return -1;
    }
    if (a.nftSaleDate > b.nftSaleDate) {
      return 1;
    }
    return 0;
  };

  return (
    <section className={css.nft}>
      {/* Hero */}
      <div className={css.nft__hero}>
        <h2 className="pageTitle">Upcoming NFT Sales &#38; Airdrops</h2>
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

      {/* content */}
      {upcomingNfts && upcomingNfts.length > 0 ? (
        <div style={{ overflowX: "auto" }}>
          <table className={css.t}>
            <thead>
              <tr>
                <th>Name</th>
                <th>IC Links</th>
                <th>Links</th>
                <th>Sale Date</th>
                <th>Total Assets</th>
                <th>Unit Price</th>
                <th>Preview</th>
              </tr>
            </thead>
            <tbody>
              {upcomingNfts.map((nft) => (
                <tr key={nft.id}>
                  <td className={css.t__mainColl}>
                    <span onClick={() => toApp(nft.id)}>
                      <h4 className={css.t__mainColl__title}>{nft.name}</h4>
                      <p className={css.t__mainColl__description}>
                        {nft.description && nft.description.length > 70
                          ? `${nft.description.substring(0, 70)}…`
                          : nft.description}
                      </p>
                    </span>
                  </td>

                  {/* ic links */}
                  <td className={css.t__iclinks}>
                    <ul>
                      {
                        ((icLinks = [
                          { link: nft.canister, name: "Canister" },
                          { link: nft.dscvr, name: "Dscvr" },
                          { link: nft.distrikt, name: "Distrikt" },
                          { link: nft.openChat, name: "OpenChat" },
                        ]),
                        icLinks.map(
                          ({ link, name }, i) =>
                            link && (
                              <li key={i}>
                                <a href={link}>{name}</a>
                              </li>
                            )
                        ))
                      }
                    </ul>
                  </td>

                  {/* links */}
                  <td className={css.t__links}>
                    <ul>
                      {
                        ((socialLinks = [
                          {
                            name: "Website",
                            link: nft.website,
                            icon: iconLink,
                          },
                          {
                            name: "Twitter",
                            link: nft.twitter,
                            icon: iconTwitter,
                          },
                          {
                            name: "Discord",
                            link: nft.discord,
                            icon: iconDiscord,
                          },
                          {
                            name: "Telegram",
                            link: nft.telegram,
                            icon: iconTelegram,
                          },
                          {
                            name: "GitHub",
                            link: nft.github,
                            icon: iconGithub,
                          },
                          {
                            name: "Medium",
                            link: nft.medium,
                            icon: iconMedium,
                          },
                        ]),
                        socialLinks.map(
                          ({ name, link, icon }, i) =>
                            link && (
                              <li key={i}>
                                <a href={link}>
                                  <span>{icon}</span>&nbsp;{name}
                                </a>
                              </li>
                            )
                        ))
                      }
                    </ul>
                  </td>

                  <td>
                    {nft.nftSaleStatus === "Open"
                      ? "Sale is open"
                      : nft.nftSaleDate}
                  </td>
                  <td>{nft.nftUnits}</td>
                  <td>{nft.nftUnitPrice}</td>
                  <td className={css.nft__preview}>
                    <div>
                      {(() => {
                        let nftPreviews = [];
                        for (let i = 1; i <= 4; i++) {
                          nftPreviews.push(
                            <img
                              src={nft[`nftImg${i}`]}
                              style={
                                nft[`nftImg${i}`] ? null : { display: "none" }
                              }
                              alt={`${nft.name} NFT preview ${i}`}
                              key={i}
                            />
                          );
                        }
                        return nftPreviews;
                      })()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default UpcomingNfts;
