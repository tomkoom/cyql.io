import React from "react";
import css from "./UpcomingNfts.module.css";
import Loader from "../../Components/Loader/Loader";
import { toApp } from "../../Routes/routes";

// icons
import {
  iTwitter,
  iDiscord,
  iGithub,
  iTelegram,
  iMedium,
  iLink,
} from "../../Icons/Icons";

// redux
import { useSelector } from "react-redux";

let socialLinks = [];
let icLinks = [];

const UpcomingNfts = () => {
  const upcomingNfts = useSelector(
    (state) => state.siteData.upcomingNfts.value
  );

  const sortByDate = (a, b) => {
    if (a.nftSaleStatus === "Open") {
      return -1;
    } else if (
      a.nftSaleDate &&
      a.nftSaleStatus !== "Open" &&
      b.nftSaleDate &&
      b.nftSaleStatus !== "Open"
    ) {
      let partsA = a.nftSaleDate.split("/").reverse().join("-");
      let partsB = b.nftSaleDate.split("/").reverse().join("-");
      let dateA = new Date(partsA);
      let dateB = new Date(partsB);
      return dateA - dateB;
    } else if (
      a.nftSaleDate &&
      a.nftSaleStatus !== "Open" &&
      !b.nftSaleDate &&
      b.nftSaleStatus !== "Open"
    ) {
      return -1;
    } else if (
      !a.nftSaleDate &&
      a.nftSaleStatus !== "Open" &&
      b.nftSaleDate &&
      b.nftSaleStatus !== "Open"
    ) {
      return 1;
    }
  };

  const getTwitterUsername = (url) => {
    const username = url.split(".com/")[1];
    return "@" + username;
  };

  return (
    <section className={css.nft}>
      {/* Hero */}
      <div className={css.nft__hero}>
        <h2 className="pageTitle">Upcoming NFT Sales &#38; Airdrops</h2>
        <p className="bodyText">
          {/* Information on this page should not be considered as financial advice. */}
          Please note: we do not guarantee information provided on this page is
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
              {upcomingNfts
                .filter(
                  (nft) =>
                    nft.nftSaleStatus === "Open" ||
                    nft.nftSaleStatus === "Upcoming"
                )
                .sort((a, b) => sortByDate(a, b))
                .sort((a) => (a.promoted ? -1 : 0))
                .map((nft) => (
                  <tr
                    className={nft.promoted ? css.promoted : css.t__tbody__tr}
                    key={nft.id}
                  >
                    <td className={css.t__mainColl}>
                      <span onClick={() => toApp(nft.id)}>
                        <div>
                          <h4 className={css.t__mainColl__title}>{nft.name}</h4>
                          {nft.promoted && (
                            <span>{nft.promoted ? "Promoted" : null}</span>
                          )}
                        </div>

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
                              id: "Website",
                              name: "Website",
                              link: nft.website,
                              icon: iLink,
                            },
                            {
                              id: "Twitter",
                              name: getTwitterUsername(nft.twitter),
                              link: nft.twitter,
                              icon: iTwitter,
                            },
                            {
                              id: "Discord",
                              name: "Discord",
                              link: nft.discord,
                              icon: iDiscord,
                            },
                            {
                              id: "Telegram",
                              name: "Telegram",
                              link: nft.telegram,
                              icon: iTelegram,
                            },
                            {
                              id: "GitHub",
                              name: "GitHub",
                              link: nft.github,
                              icon: iGithub,
                            },
                            {
                              id: "Medium",
                              name: "Medium",
                              link: nft.medium,
                              icon: iMedium,
                            },
                          ]),
                          socialLinks.map(
                            ({ id, name, link, icon }) =>
                              link && (
                                <li key={id}>
                                  <a
                                    href={link}
                                    rel="norefferer noopener"
                                    target="_blank"
                                  >
                                    <span>{icon}</span>&nbsp;{name}
                                  </a>
                                </li>
                              )
                          ))
                        }
                      </ul>
                    </td>

                    <td>
                      {nft.nftSaleStatus === "Open" ? (
                        <a
                          className={css.nftSaleLink}
                          href={nft.nftSaleUrl ? nft.nftSaleUrl : "#"}
                        >
                          Sale is open
                        </a>
                      ) : (
                        nft.nftSaleDate
                      )}
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
