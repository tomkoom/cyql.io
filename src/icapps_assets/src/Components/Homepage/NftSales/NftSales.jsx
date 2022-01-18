import React from "react";
import css from "./NftSales.module.css";
import { toUpcoming } from "../../../Routes/routes";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faLink } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faTelegramPlane,
  faDiscord,
  faMedium,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const iconGlobe = <FontAwesomeIcon icon={faGlobe} />;
const iconTwitter = <FontAwesomeIcon icon={faTwitter} />;
const iconDiscord = <FontAwesomeIcon icon={faDiscord} />;
const iconGithub = <FontAwesomeIcon icon={faGithub} />;
const iconTelegram = <FontAwesomeIcon icon={faTelegramPlane} />;
const iconMedium = <FontAwesomeIcon icon={faMedium} />;
const iconLink = <FontAwesomeIcon icon={faLink} />;

const NftSales = ({ upcomingNftsFiltered, Loader }) => {
  return (
    <div>
      {upcomingNftsFiltered.length < 1 ? (
        Loader
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table className={css.nftSales}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Links</th>
                <th>IC Links</th>
                <th>Date</th>
                <th>Unit Price</th>
                <th>Total Assets</th>
                <th>Preview</th>
              </tr>
            </thead>
            <tbody>
              {upcomingNftsFiltered.slice(0, 10).map((nft) => (
                <tr key={nft.id} key={nft.id}>
                  <td className={css.nft__mainColl}>
                    <button
                      onClick={() => toUpcoming()}
                      // to={`a/${nft.id}`}
                      className={`${css.nft__link} navlink`}
                    >
                      <span>
                        <h4 className={css.nft__mainColl__title}>{nft.name}</h4>
                        <p className="bodyText">
                          {nft.description && nft.description.length > 100
                            ? `${nft.description.substring(0, 100)}…`
                            : nft.description}
                        </p>
                      </span>
                    </button>
                  </td>

                  {/* Social Links */}
                  <td className={css.nft__links}>
                    <ul>
                      <li style={nft.website ? null : { display: "none" }}>
                        <a
                          href={nft.website}
                          rel="noreferrer noopener"
                          target="_blank"
                        >
                          <span>{iconLink}</span>&nbsp;Website
                        </a>
                      </li>
                      <li style={nft.twitter ? null : { display: "none" }}>
                        <a
                          href={nft.twitter}
                          rel="noreferrer noopener"
                          target="_blank"
                        >
                          <span>{iconTwitter}</span>&nbsp;Twitter
                        </a>
                      </li>
                      <li style={nft.discord ? null : { display: "none" }}>
                        <a
                          href={nft.discord}
                          rel="noreferrer noopener"
                          target="_blank"
                        >
                          <span>{iconDiscord}</span>&nbsp;Discord
                        </a>
                      </li>
                      <li style={nft.telegram ? null : { display: "none" }}>
                        <a
                          href={nft.telegram}
                          rel="noreferrer noopener"
                          target="_blank"
                        >
                          <span>{iconTelegram}</span>&nbsp;Telegram
                        </a>
                      </li>
                      <li style={nft.medium ? null : { display: "none" }}>
                        <a
                          href={nft.medium}
                          rel="noreferrer noopener"
                          target="_blank"
                        >
                          <span>{iconMedium}</span>&nbsp;Medium
                        </a>
                      </li>
                    </ul>
                  </td>

                  {/* IC Links */}
                  <td className={css.nft__links}>
                    <ul>
                      <li style={nft.canister ? null : { display: "none" }}>
                        <a
                          href={nft.canister}
                          rel="noreferrer noopener"
                          target="_blank"
                        >
                          {/* <span>{iconLink}</span>&nbsp; */}
                          Canister
                        </a>
                      </li>
                      <li style={nft.dscvr ? null : { display: "none" }}>
                        <a
                          href={nft.dscvr}
                          rel="noreferrer noopener"
                          target="_blank"
                        >
                          {/* <span>{iconTwitter}</span>&nbsp; */}
                          Dscvr
                        </a>
                      </li>
                      <li style={nft.distrikt ? null : { display: "none" }}>
                        <a
                          href={nft.distrikt}
                          rel="noreferrer noopener"
                          target="_blank"
                        >
                          {/* <span>{iconDiscord}</span>&nbsp; */}
                          Distrikt
                        </a>
                      </li>
                      <li style={nft.openChat ? null : { display: "none" }}>
                        <a
                          href={nft.openChat}
                          rel="noreferrer noopener"
                          target="_blank"
                        >
                          {/* <span>{iconTelegram}</span>&nbsp; */}
                          openChat
                        </a>
                      </li>
                    </ul>
                  </td>

                  <td>{nft.date}</td>
                  <td>{nft.price}</td>
                  <td>{nft.totalNfts}</td>
                  <td className={css.nft__preview}>
                    <div>
                      {(() => {
                        let nftPreviews = [];
                        for (let i = 1; i <= 4; i++) {
                          nftPreviews.push(
                            <img
                              src={nft[`img${i}`]}
                              style={
                                nft[`img${i}`] ? null : { display: "none" }
                              }
                              alt={`${nft.name} preview${i}`}
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
      )}
    </div>
  );
};

export default NftSales;
