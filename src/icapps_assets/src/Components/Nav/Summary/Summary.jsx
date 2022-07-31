import React from "react";
import css from "./Summary.module.css";
import { toApps, toUpcoming } from "../../../Routes/routes";

// redux
import { useSelector } from "react-redux";
import { selectProjectsLength, selectNFTs } from "../../../State/projects";

const Summary = () => {
  const projectsNum = useSelector(selectProjectsLength);
  const nfts = useSelector(selectNFTs);
  const upcomingNFTsNum = nfts.filter((nft) => nft.nftSaleStatus === "Upcoming").length;
  const ongoingNFTsNum = nfts.filter((nft) => nft.nftSaleStatus === "Open").length;

  return (
    <div className={css.summary}>
      <ul>
        <li>
          Projects:&nbsp;<span className={css.highlight}>{projectsNum}</span>
        </li>
        <li>
          Upcoming NFT sales:&nbsp;
          <span className={css.highlight}>{upcomingNFTsNum}</span>
        </li>
        <li>
          Ongoing NFT sales:&nbsp;<span className={css.highlight}>{ongoingNFTsNum}</span>
        </li>

        {/* <li>
          Highlights:{" "}
          <a href="https://dfinity.org/grants" target="_blank" rel="noreferrer noopener">
            Developer Grants
          </a>
        </li>
        <li>
          Featured NFTs:{" "}
          <a
            href="https://entrepot.app/marketplace/poked"
            rel="noreferrer noopener"
            target="_blank"
          >
            PokedBots
          </a>
        </li> */}
      </ul>
    </div>
  );
};

export default Summary;
