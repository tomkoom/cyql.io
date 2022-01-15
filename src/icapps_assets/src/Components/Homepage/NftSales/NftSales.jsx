import React from "react";
import css from "./NftSales.module.css";
import { Link } from "react-router-dom";

// Framer Motion
import { motion } from "framer-motion";
import { cardVariants } from "../../../motionVariants";

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
              {upcomingNftsFiltered.slice(0, 6).map((nft) => (
                <tr key={nft.id} key={nft.id}>
                  <td className={css.nft__mainColl}>
                    <Link
                      // to={`a/${nft.id}`}
                      to="upcoming"
                      className={css.nft__link}
                    >
                      <span>
                        <h4 className={css.nft__mainColl__title}>{nft.name}</h4>
                        <p className="bodyTextLight">
                          {nft.description && nft.description.length > 140
                            ? `${nft.description.substring(0, 140)}…`
                            : nft.description}
                        </p>
                      </span>
                    </Link>
                  </td>

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

                  <td></td>
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

      <ul className={css.nftSales}>
        {upcomingNftsFiltered.length < 1
          ? Loader
          : upcomingNftsFiltered.slice(0, 6).map((upcNft, i) => (
              <motion.li
                className={css.nftSales__i}
                variants={cardVariants}
                whileHover="whileHover"
                key={i}
              >
                <Link
                  // to={`/a/${upcNft.id}`}
                  to="/upcoming"
                  className={css.nftSales__i__linkBlock}
                >
                  {/* Main */}
                  <div className={css.nftSales__i__linkBlock__main}>
                    <h4>{upcNft["Name"]}</h4>
                    <p>
                      {upcNft["Description"] &&
                      upcNft["Description"].length > 70
                        ? `${upcNft["Description"].substring(0, 70)}…`
                        : upcNft["Description"]}
                    </p>
                  </div>

                  {/* Tags */}
                  <ul className={css.nftSales__i__linkBlock__tags}>
                    {upcNft["Total NFTs"] && (
                      <li>{upcNft["Total NFTs"]} units</li>
                    )}
                    {upcNft["Price"] && upcNft["Price"] !== "TBA" ? (
                      <li>{upcNft["Price"]}</li>
                    ) : null}
                  </ul>

                  {/* Loop NFT preview images */}
                  <div className={css.nftSales__i__linkBlock__img}>
                    {(() => {
                      let nftImgs = [];
                      for (let i = 1; i <= 4; i++) {
                        nftImgs.push(
                          <img
                            className={css.nftSales__i__linkBlock__img__i}
                            src={upcNft[`Img${i}`]}
                            style={
                              upcNft[`Img${i}`] ? null : { display: "none" }
                            }
                            alt={`${upcNft["Name"]} preview${i}`}
                            key={i}
                          />
                        );
                      }
                      return nftImgs;
                    })()}
                  </div>
                </Link>
              </motion.li>
            ))}
      </ul>
    </div>
  );
};

export default NftSales;
