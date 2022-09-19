import React from "react";
import css from "./Summary.module.css";

// redux
import { useSelector } from "react-redux";
import { selectProjectsLength, selectNFTs } from "../../State/projects";

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
      </ul>
    </div>
  );
};

export default Summary;
