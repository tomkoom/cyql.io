import React from "react";
import css from "./UpcomingNfts.module.css";

// icons
import { iTwitter, iDiscord, iGithub, iTelegram, iMedium, iLink } from "../../Icons/Icons";

// routes
import { toApp } from "../../Routes/routes";

// utils
import { formatNumber } from "../../Utils/format";
import { sortByDateUpcomingNfts } from "../../Utils/sort";
import { substring105 } from "../../Utils/substring";

// components
import Loader from "../../Components/Loader/Loader";
import Partners from "./Partners/Partners";
import SubmitBtn from "./SubmitBtn/SubmitBtn";
import { Link } from "./Colls/index";

// state
import { useSelector } from "react-redux";
import { selectUpcomingNFTs } from "../../State/projects";

const NA = () => <p className={css.na}>n/a</p>;

const UpcomingNfts = () => {
  const upcomingNfts = useSelector(selectUpcomingNFTs);
  const upcomingNftsFiltered = upcomingNfts.filter(
    (nft) => nft.nftSaleStatus === "Open" || nft.nftSaleStatus === "Upcoming"
  );

  return (
    <div className={css.nft}>
      {/* hero */}
      <div className={css.hero}>
        <h2 className="pageTitle">Upcoming NFT Sales</h2>
        <p className={css.disclaimer}>
          Please note: we do not guarantee information provided on this page is 100% accurate.
          Kindly do your own research. Information on this page should not be considered as
          financial advice.
        </p>
        <Partners />
        <SubmitBtn />
      </div>

      {/* table */}
      {upcomingNfts.length > 0 ? (
        <div className={css.table}>
          <div className={css.rowHeader}>
            <div className={css.coll25}>
              <p>Name</p>
            </div>
            <div className={css.coll10}>
              <p>Links</p>
            </div>
            <div className={css.coll10}>
              <p>Links IC</p>
            </div>
            <div className={css.coll10}>
              <p>Sale Date</p>
            </div>
            <div className={css.coll10}>
              <p>Total Assets</p>
            </div>
            <div className={css.coll10}>
              <p>Unit Price</p>
            </div>
            <div className={css.coll25}>
              <p>Preview</p>
            </div>
          </div>

          {upcomingNftsFiltered
            .sort((a, b) => sortByDateUpcomingNfts(a, b))
            .map((nft) => (
              <div className={css.row} key={nft.id} onClick={() => toApp(nft.id)}>
                <div className={css.coll25}>
                  <h4 className={css.name}>{nft.name}</h4>

                  {nft.description && (
                    <p className={css.description}>{substring105(nft.description)}</p>
                  )}
                </div>

                {/* links */}
                <div className={css.coll10}>
                  {nft.website ||
                  nft.twitter ||
                  nft.discord ||
                  nft.telegram ||
                  nft.github ||
                  nft.medium ? (
                    <div className={css.links}>
                      {nft.website && <Link icon={iLink} />}
                      {nft.twitter && <Link icon={iTwitter} />}
                      {nft.discord && <Link icon={iDiscord} />}
                      {nft.telegram && <Link icon={iTelegram} />}
                      {nft.github && <Link icon={iGithub} />}
                      {nft.medium && <Link icon={iMedium} />}
                    </div>
                  ) : (
                    <NA />
                  )}
                </div>

                {/* links ic */}
                <div className={css.coll10}>
                  {nft.dscvr || nft.distrikt || nft.openChat ? (
                    <div className={css.linksIc}>
                      {nft.dscvr && <Link label="Dscvr" />}
                      {nft.distrikt && <Link label="Distrikt" />}
                      {nft.openChat && <Link label="OpenChat" />}
                    </div>
                  ) : (
                    <NA />
                  )}
                </div>

                <div className={css.coll10}>
                  {nft.nftSaleStatus === "Open" && <p>Sale is open</p>}
                  {nft.nftSaleDate ? <p>{nft.nftSaleDate}</p> : <NA />}
                </div>

                <div className={css.coll10}>
                  {nft.nftUnits ? <p>{formatNumber(nft.nftUnits)}</p> : <NA />}
                </div>

                <div className={css.coll10}>
                  {nft.nftUnitPrice ? <p>{nft.nftUnitPrice}</p> : <NA />}
                </div>

                <div className={css.coll25}>
                  <div className={css.nftPreviews}>
                    {nft.nftImg1 && <img src={nft.nftImg1} alt={`${nft.name} preview1`} />}
                    {nft.nftImg2 && <img src={nft.nftImg2} alt={`${nft.name} preview2`} />}
                    {nft.nftImg3 && <img src={nft.nftImg3} alt={`${nft.name} preview3`} />}
                    {nft.nftImg4 && <img src={nft.nftImg4} alt={`${nft.name} preview4`} />}
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default UpcomingNfts;
