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

const NftList = () => {
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
  function processMarketData(nftMarketData, nftItemInfo) {
    const mData = nftMarketData
      .split("\n")
      .map((str) => str.replace(/ /g, "").toLowerCase());

    const totalAssets = mData.filter((str) => str.includes("mintednfts:"))
      ? mData
          .filter((str) => str.includes("mintednfts:"))
          .toString()
          .replace("mintednfts:", "")
          .replace("_", ",")
      : "";

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

    nftItemInfo.totalAssets = totalAssets;
    nftItemInfo.circulatingNfts = circulatingNfts;
    nftItemInfo.listings = listings;
    nftItemInfo.sales = sales;
    nftItemInfo.salesInIcp = salesInIcp;
    nftItemInfo.avgPrice = avgPrice;

    nftDataArr.push(nftItemInfo);

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
              <th>Market Cap</th>
              <th>Sales</th>
              <th>Listings</th>
              <th>Assets</th>
              <th>Avg. Price</th>
              <th>Min. Sale Price</th>
              <th>Max. Sale Price</th>
            </tr>
          </thead>
          <tbody>
            {nftData.map((nftItem, index) => (
              <tr key={nftItem.name}>
                <td data-label="#">{index + 1}</td>
                <td data-label="Name">
                  <a
                    className={css.nftCollectionLink}
                    href={nftItem.market}
                    target="_blank"
                    rel="norefferer noopener"
                  >
                    <div className={css.nftCoverContainer}>
                      <img
                        className={css.nftCoverContainer__item}
                        src={nftItem.img}
                        alt={nftItem.name}
                      />
                    </div>{" "}
                    {nftItem.name}
                  </a>
                </td>
                <td data-label="Market Cap">
                  {nftItem.salesInIcp ? `${nftItem.salesInIcp} ICP` : "-"}
                </td>
                <td data-label="Sales">
                  {nftItem.sales ? nftItem.sales : "-"}
                </td>
                <td data-label="Listings">
                  {nftItem.listings ? nftItem.listings : "-"}
                </td>
                <td data-label="Assets">
                  {nftItem.circulatingNfts
                    ? nftItem.circulatingNfts
                    : nftItem.totalAssets
                    ? nftItem.totalAssets
                    : "-"}
                </td>
                <td data-label="Avg. Price">
                  {nftItem.avgPrice ? `${nftItem.avgPrice} ICP` : "-"}
                </td>
                <td data-label="Min Sale Price">
                  {nftItem.minSalePrice ? `${nftItem.minSalePrice} ICP` : "-"}
                </td>
                <td data-label="Max. Sale Price">
                  {nftItem.maxSalePrice && nftItem.maxSalePrice != "Airdrop"
                    ? `${nftItem.maxSalePrice} ICP`
                    : nftItem.maxSalePrice == "Airdrop"
                    ? nftItem.maxSalePrice
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
