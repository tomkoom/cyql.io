import React from "react";
import css from "./NftSales.module.css";
import { toUpcoming } from "../../../Routes/routes";

// FontAwesome
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

const t = ({ upcomingNftsFiltered, loader }) => {
  return (
    <div>
      {upcomingNftsFiltered.length < 1 ? (
        loader
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table className={css.t}>
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
                <tr
                  onClick={() => toUpcoming()}
                  key={nft.id}
                  // to={`a/${nft.id}`}
                >
                  <td className={css.t__mainColl}>
                    <span>
                      <h4 className={css.t__mainColl__title}>{nft.name}</h4>
                      <p className={css.t__mainColl__description}>
                        {nft.description && nft.description.length > 70
                          ? `${nft.description.substring(0, 70)}…`
                          : nft.description}
                      </p>
                    </span>
                  </td>

                  {/* social links */}
                  <td className={css.t__links}>
                    <ul>
                      {
                        ((socialLinks = [
                          { link: nft.website, icon: iconLink },
                          { link: nft.twitter, icon: iconTwitter },
                          { link: nft.discord, icon: iconDiscord },
                          { link: nft.telegram, icon: iconTelegram },
                          { link: nft.github, icon: iconGithub },
                          { link: nft.medium, icon: iconMedium },
                        ]),
                        socialLinks.map(({ link, icon }, i) => (
                          <li style={link ? null : { display: "none" }} key={i}>
                            {icon}
                          </li>
                        )))
                      }
                    </ul>
                  </td>

                  {/* ic links */}
                  <td className={css.t__iclinks}>
                    <ul>
                      {
                        ((socialLinks = [
                          { link: nft.canister, name: "Canister" },
                          { link: nft.dscvr, name: "Dscvr" },
                          { link: nft.distrikt, name: "Distrikt" },
                          { link: nft.openChat, name: "OpenChat" },
                        ]),
                        socialLinks.map(({ link, name }, i) => (
                          <li style={link ? null : { display: "none" }} key={i}>
                            {name}
                          </li>
                        )))
                      }
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

export default t;
