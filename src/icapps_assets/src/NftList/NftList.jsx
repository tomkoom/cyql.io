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
let totalVolumeUsd = [];
let totalVolumeIcp = [];
let totalMarketCapUsd = 0;
let totalMarketCapIcp = 0;

const formatter = new Intl.NumberFormat("en-US");
const formatterUsd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

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

    // num
    const totalAssets = mData.filter((str) => str.includes("mintednfts:"))
      .length
      ? parseInt(
          mData
            .filter((str) => str.includes("mintednfts:"))[0]
            .match(/\d/g)
            .join("")
        )
      : parseInt(nInfo.assets.replace(",", ""));

    // str
    const totalAssetsFormatted = formatter.format(totalAssets);

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

    // num
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

    // num
    const volumeUsd = +(icpPrice * salesInIcp).toFixed(2);

    // str
    const volumeUsdFormatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(volumeUsd);

    // num
    const avgPrice = +mData
      .filter((str) => str.includes("averagepriceicpviamarketplace:"))
      .toString()
      .replace("averagepriceicpviamarketplace:", "")
      .replace("_", ",")
      .replace("icp", "");

    const marketCap = +(totalAssets * avgPrice).toFixed(2);
    const marketCapFormatted = formatter.format(marketCap);

    const marketCapUsd = marketCap * icpPrice;
    const marketCapUsdFormatted = formatterUsd.format(marketCapUsd);

    nInfo.sales = sales;
    nInfo.listings = listings;
    nInfo.circulatingNfts = circulatingNfts;
    nInfo.avgPrice = avgPrice;
    // ---
    nInfo.marketCap = marketCap;
    nInfo.marketCapFormatted = marketCapFormatted;
    nInfo.marketCapUsd = marketCapUsd;
    nInfo.marketCapUsdFormatted = marketCapUsdFormatted;
    nInfo.totalAssets = totalAssets;
    nInfo.totalAssetsFormatted = totalAssetsFormatted;
    nInfo.salesInIcp = salesInIcp;
    nInfo.salesInIcpFormatted = salesInIcpFormatted;
    nInfo.volumeUsd = volumeUsd;
    nInfo.volumeUsdFormatted = volumeUsdFormatted;

    nftDataArr.push(nInfo);

    if (gsDataLength == nftDataArr.length) {
      nftDataArr.sort((a, b) => b.salesInIcp - a.salesInIcp);
      setNftData(nftDataArr);
      nftDataArr = [];
      setIsLoaded(true);
    }
  }
  // END PROCESS MARKET DATA FUNC

  if (isLoaded) {
    // total sales volume in usd
    totalVolumeUsd = formatterUsd.format(
      nftData.reduce((acc, val) => {
        return acc + val.volumeUsd;
      }, 0)
    );

    // total sales volume in icp
    totalVolumeIcp = formatter.format(
      nftData.reduce((acc, val) => {
        return acc + val.salesInIcp;
      }, 0)
    );

    // total market cap in usd
    totalMarketCapUsd = formatterUsd.format(
      nftData.reduce((acc, val) => {
        return acc + val.marketCapUsd;
      }, 0)
    );

    // total market cap in icp
    totalMarketCapIcp = formatter.format(
      nftData.reduce((acc, val) => {
        return acc + val.marketCap;
      }, 0)
    );
  }

  return (
    <section className={css.nftTable}>
      <div className={css.nftTable__hero}>
        <div className={css.nftTable__hero__heading}>
          <h2>NFT Collections</h2>
          <p className="bodyText">
            Below are listed the stats for the IC NFT collections. Projects are
            sorted in descending order by volume. If you see inaccuracies, or
            you have any missing information&nbsp;
            <a
              id={css.nftTable__msgLink}
              href="https://twitter.com/messages/compose?recipient_id=1386304698358116354"
              target="_blank"
              rel="noreferrer noopener"
            >
              you can write to us
            </a>
          </p>
        </div>

        {isLoaded ? (
          <div className={css.nftTable__hero__dashboard}>
            <div className={css.nftTable__hero__dashboard__item}>
              <p>Market Cap</p>
              <h4>{totalMarketCapUsd}</h4>
              <p>{`${totalMarketCapIcp} ICP`}</p>
            </div>

            <div className={css.nftTable__hero__dashboard__item}>
              <p>All Time Sales Volume</p>
              <h4>{totalVolumeUsd}</h4>
              <p>{`${totalVolumeIcp} ICP`}</p>
            </div>
          </div>
        ) : null}
      </div>

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
              <th>Est. Market Cap</th>
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
                  <div className={css.cell}>
                    {`${n.salesInIcpFormatted} ICP`}
                    <span className={css.cellSpan}>
                      {n.volumeUsdFormatted ? n.volumeUsdFormatted : null}
                    </span>
                  </div>
                </td>
                <td data-label="Sales">{n.sales ? n.sales : null}</td>
                <td data-label="Listings">{n.listings ? n.listings : null}</td>
                <td data-label="Assets">
                  {n.circulatingNfts
                    ? n.circulatingNfts
                    : n.totalAssetsFormatted
                    ? n.totalAssetsFormatted
                    : null}
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
                  {n.avgPrice ? `${n.avgPrice} ICP` : null}
                </td>
                <td data-label="Est. Market Cap">
                  <div className={css.cell}>
                    {`${n.marketCapFormatted} ICP`}
                    <span className={css.cellSpan}>
                      {n.marketCapUsdFormatted}
                    </span>
                  </div>
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
