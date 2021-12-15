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

  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  // SET GSDATA STATE AFTER GS DATA IS LOADED
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

    console.log(
      mData.filter((str) => str.includes("mintednfts:")).length
        ? "true"
        : "false"
    );

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

    const salesInIcp = mData
      .filter((str) => str.includes("soldviamarketplaceinicp:"))
      .toString()
      .replace("soldviamarketplaceinicp:", "")
      .replace("_", ",")
      .replace("icp", "");

    const volumeUsd = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(+(+salesInIcp.replace(",", "") * icpPrice).toFixed(2));

    const avgPrice = mData
      .filter((str) => str.includes("averagepriceicpviamarketplace:"))
      .toString()
      .replace("averagepriceicpviamarketplace:", "")
      .replace("_", ",")
      .replace("icp", "");

    const floor = mData
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
    nInfo.volumeUsd = volumeUsd;
    nInfo.avgPrice = avgPrice;

    nftDataArr.push(nInfo);

    if (gsDataLength == nftDataArr.length) {
      nftDataArr.sort(
        (a, b) =>
          parseFloat(b.salesInIcp.replace(",", "")) -
          parseFloat(a.salesInIcp.replace(",", ""))
      );
      setNftData(nftDataArr);
      setIsLoaded(true);
      nftDataArr = [];
    }
  }

  return (
    <section className={css.nftTable}>
      <h2 className={css.nftTable__title}>NFT Collections</h2>
      <p className="bodyText center">
        A list of NFT projects on the Internet Computer.
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
              <th>Avg. Price</th>
              <th>Min. Sale Price</th>
              <th>Max. Sale Price</th>
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
                    {n.salesInIcp ? `${n.salesInIcp} ICP` : "-"}
                    <span id={css.volumeUsd}>
                      {n.volumeUsd ? n.volumeUsd : null}
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
                <td data-label="Avg. Price">
                  {n.avgPrice ? `${n.avgPrice} ICP` : "-"}
                </td>
                <td data-label="Min Sale Price">
                  {n.minSalePrice ? `${n.minSalePrice} ICP` : "-"}
                </td>
                <td data-label="Max. Sale Price">
                  {n.maxSalePrice && n.maxSalePrice != "Airdrop"
                    ? `${n.maxSalePrice} ICP`
                    : n.maxSalePrice == "Airdrop"
                    ? n.maxSalePrice
                    : "-"}
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
