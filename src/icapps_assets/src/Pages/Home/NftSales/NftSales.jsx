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
        <div className={css.nftSales}>
          {nftSalesFiltered
            .slice(0, 8)
            .sort((a, b) => sortByDate(a, b))
            .map((nft) => (
              <div className={css.nft} onClick={() => toApp(nft.id)} key={nft.id}>
                <h3 className={css.name}>{nft.name}</h3>
                <p className={css.description}>
                  {nft.description && nft.description.length > 77
                    ? `${nft.description.substring(0, 77)}…`
                    : nft.description}
                </p>
                <div className={css.socLinks}>
                  <ul>
                    {nft.website && <li>{iLink}</li>}
                    {nft.twitter && <li>{iTwitter}</li>}
                    {nft.discord && <li>{iDiscord}</li>}
                    {nft.github && <li>{iGithub}</li>}
                    {nft.telegram && <li>{iTelegram}</li>}
                    {nft.medium && <li>{iMedium}</li>}
                  </ul>
                </div>
                <div className={css.nftPreviews}>
                  <ul>
                    <li>
                      {nft.nftImg1 && <img src={nft.nftImg1} alt={`${nft.name} NFT preview`} />}
                    </li>
                    <li>
                      {nft.nftImg2 && <img src={nft.nftImg2} alt={`${nft.name} NFT preview`} />}
                    </li>
                    <li>
                      {nft.nftImg3 && <img src={nft.nftImg3} alt={`${nft.name} NFT preview`} />}
                    </li>
                    <li>
                      {nft.nftImg4 && <img src={nft.nftImg4} alt={`${nft.name} NFT preview`} />}
                    </li>
                  </ul>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default NftSales;
