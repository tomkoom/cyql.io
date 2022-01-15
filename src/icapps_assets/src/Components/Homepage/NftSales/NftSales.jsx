import React from "react";
import css from "./NftSales.module.css";
import { Link } from "react-router-dom";

// Framer Motion
import { motion } from "framer-motion";
import { cardVariants } from "../../../motionVariants";

const NftSales = ({ upcomingNftsFiltered, Loader }) => {
  return (
    <ul className={css.nftSales}>
      {!upcomingNftsFiltered.length
        ? Loader
        : upcomingNftsFiltered.slice(0, 12).map((upcNft, i) => (
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
                    {upcNft["Description"] && upcNft["Description"].length > 70
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
                          style={upcNft[`Img${i}`] ? null : { display: "none" }}
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
  );
};

export default NftSales;
