import React from "react";
import css from "./NftSales.module.css";

// routes
import { toApp, toUpcoming } from "../../../Routes/routes";

// components
import { Loader, ViewMoreBtn } from "../../../Components/index";

// icons
import { iLink, iTwitter, iDiscord, iGithub, iTelegram, iMedium } from "../../../Icons/Icons";

let socialLinks = [];

const NftSales = ({ nftSalesFiltered }) => {
  const sortByDate = (a, b) => {
    if (a.nftSaleDate && b.nftSaleDate) {
      let partsA = a.nftSaleDate.split("/").reverse().join("-");
      let partsB = b.nftSaleDate.split("/").reverse().join("-");
      let dateA = new Date(partsA);
      let dateB = new Date(partsB);
      return dateA - dateB;
    } else if (a.nftSaleDate && !b.nftSaleDate) {
      return -1;
    } else if (!a.nftSaleDate && b.nftSaleDate) {
      return 1;
    }
  };

  return (
    <div>
      {nftSalesFiltered.length < 1 ? (
        <Loader />
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
              {nftSalesFiltered
                .slice(0, 9)
                .sort((a, b) => sortByDate(a, b))
                .map((nft) => (
                  <tr onClick={() => toApp(nft.id)} key={nft.id}>
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
                            { link: nft.website, icon: iLink },
                            { link: nft.twitter, icon: iTwitter },
                            { link: nft.discord, icon: iDiscord },
                            { link: nft.telegram, icon: iTelegram },
                            { link: nft.github, icon: iGithub },
                            { link: nft.medium, icon: iMedium },
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

                    <td>{nft.nftSaleStatus === "Open" ? "Sale is open" : nft.nftSaleDate}</td>
                    <td>{nft.nftUnitPrice}</td>
                    <td>{nft.nftUnits}</td>
                    <td className={css.nft__preview}>
                      <div>
                        {(() => {
                          let nftPreviews = [];
                          for (let i = 1; i <= 4; i++) {
                            nftPreviews.push(
                              <img
                                src={nft[`nftImg${i}`]}
                                style={nft[`nftImg${i}`] ? null : { display: "none" }}
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
          {nftSalesFiltered.length > 0 && (
            <ViewMoreBtn nav={toUpcoming}>View all upcoming NFT sales</ViewMoreBtn>
          )}
        </div>
      )}
    </div>
  );
};

export default NftSales;
