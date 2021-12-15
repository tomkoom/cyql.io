import React, { useState, useEffect } from "react";
import css from "./NftList.module.css";

// GOOGLE API
import useGoogleSheets from "use-google-sheets";
import k from "../../../../k/k";

// LOADER
import Loader from "../Loader";

const googleSheetsApiKey = k.GOOGLE_SHEETS_API;
const googleSheetId = k.GOOGLE_SHEET_ID;

let nftDataArr = [];

const NftList = ({ icpPrice }) => {
  const [gsData, setGsData] = useState();
  const [gsDataLength, setGsDataLength] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [nftData, setNftData] = useState();

  // INITIAL GS DATA FETCH
  const { data, loading, error } = useGoogleSheets({
    apiKey: googleSheetsApiKey,
    sheetId: googleSheetId,
    sheetsNames: ["NftList"],
  });

  // SET STATE AFTER DATA IS LOADED FROM GS
  useEffect(() => {
    if (!loading) {
      setGsData(data[0].data);
      setGsDataLength(data[0].data.length);
    }
  }, [loading]);

  useEffect(() => {
    if (gsData) {
      for (let i = 0; i < gsDataLength; i++) {
        fetch(gsData[i].canister)
          .then((res) => res.text())
          .then((nftMarketData) => {
            processMarketData(nftMarketData, gsData[i]);
          });
      }
    }
  }, [gsData]);

  // PROCESS MARKET DATA FUNC
  function processMarketData(nftMarketData, nInfo) {
    const mData = nftMarketData
      .split("\n")
      .map((str) => str.replace(/ /g, "").toLowerCase());

    let totalAssets = mData.filter((str) => str.includes("mintednfts:")).length
      ? mData
          .filter((str) => str.includes("mintednfts:"))
          .toString()
          .replace("mintednfts:", "")
          .replace("_", ",")
      : nInfo.assets;

    const circulatingNfts = mData
      .filter((str) => str.includes("circulatingnfts:"))
      .toString()
      .replace("circulatingnfts:", "")
      .replace("_", ",");

    const listings = mData
      .filter((str) => str.includes("marketplacelistings:"))
      .toString()
      .replace("marketplacelistings:", "")
      .replace("_", ",");

    const sales = mData
      .filter((str) => str.includes("soldviamarketplace:"))
      .toString()
      .replace("soldviamarketplace:", "")
      .replace("_", ",");

    // number
    const salesInIcp = +mData
      .filter((str) => str.includes("soldviamarketplaceinicp:"))
      .toString()
      .replace("soldviamarketplaceinicp:", "")
      .replace("_", "")
      .replace("icp", "");

    // str
    const salesInIcpFormatted = new Intl.NumberFormat("en-US").format(
      salesInIcp
    );

    // number
    const volumeUsd = +(icpPrice * salesInIcp).toFixed(2);

    // str
    const volumeUsdFormatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(volumeUsd);

    // number
    const avgPrice = +mData
      .filter((str) => str.includes("averagepriceicpviamarketplace:"))
      .toString()
      .replace("averagepriceicpviamarketplace:", "")
      .replace("_", ",")
      .replace("icp", "");

    nInfo.totalAssets = totalAssets;
    nInfo.circulatingNfts = circulatingNfts;
    nInfo.listings = listings;
    nInfo.sales = sales;
    nInfo.salesInIcp = salesInIcp;
    nInfo.salesInIcpFormatted = salesInIcpFormatted;
    nInfo.volumeUsd = volumeUsd;
    nInfo.volumeUsdFormatted = volumeUsdFormatted;
    nInfo.avgPrice = avgPrice;

    nftDataArr.push(nInfo);

    if (gsDataLength == nftDataArr.length) {
      nftDataArr.sort((a, b) => b.salesInIcp - a.salesInIcp);
      setNftData(nftDataArr);
      setIsLoaded(true);
      nftDataArr = [];
    }
  }

  return (
    <section className={css.nftTable}>
      <h2 className={css.nftTable__title}>NFT Collections</h2>
      <p className={`${css.nftTable_desription} bodyText`}>
        Below are listed the stats for the IC NFT collections. Projects are
        sorted in descending order by volume. If you see inaccuracies, or you
        have any missing information&nbsp;
        <a
          id={css.nftTable__msgLink}
          href="https://twitter.com/messages/compose?recipient_id=1386304698358116354"
          target="_blank"
          rel="noreferrer noopener"
        >
          you can write to us
        </a>
      </p>

      {!isLoaded ? (
        <Loader />
      ) : (
        <table className={css.nftTable__table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Volume</th>
              <th>Sales</th>
              <th>Listings</th>
              <th>Assets</th>
              <th>Min. Sale Price</th>
              <th>Max. Sale Price</th>
              <th>Avg. Price</th>
            </tr>
          </thead>
          <tbody>
            {nftData.map((n, i) => (
              <tr key={n.name}>
                <td data-label="#">{i + 1}</td>
                <td data-label="Name">
                  <a
                    className={css.nftCollectionLink}
                    href={n.market}
                    target="_blank"
                    rel="norefferer noopener"
                  >
                    <img
                      className={css.nftCollectionLink__cover}
                      src={n.img}
                      alt={n.name}
                    />
                    {n.name}
                  </a>
                </td>
                <td data-label="Volume">
                  <div className={css.volume}>
                    {n.salesInIcpFormatted
                      ? `${n.salesInIcpFormatted} ICP`
                      : "-"}
                    <span id={css.volumeUsd}>
                      {n.volumeUsdFormatted ? n.volumeUsdFormatted : null}
                    </span>
                  </div>
                </td>
                <td data-label="Sales">{n.sales ? n.sales : "-"}</td>
                <td data-label="Listings">{n.listings ? n.listings : "-"}</td>
                <td data-label="Assets">
                  {n.circulatingNfts
                    ? n.circulatingNfts
                    : n.totalAssets
                    ? n.totalAssets
                    : "-"}
                </td>
                <td data-label="Min Sale Price">
                  {n.minSalePrice
                    ? `${n.minSalePrice} ICP`
                    : n.maxSalePrice == "Airdrop"
                    ? "Airdrop"
                    : null}
                </td>
                <td data-label="Max. Sale Price">
                  {n.maxSalePrice && n.maxSalePrice != "Airdrop"
                    ? `${n.maxSalePrice} ICP`
                    : n.maxSalePrice == "Airdrop"
                    ? n.maxSalePrice
                    : null}
                </td>
                <td data-label="Avg. Price">
                  {n.avgPrice ? `${n.avgPrice} ICP` : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default NftList;
