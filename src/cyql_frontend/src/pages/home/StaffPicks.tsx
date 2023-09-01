import React, { FC } from "react";
import styled from "styled-components";

// hooks
import useNav from "@/hooks/useNav";

const StaffPicks: FC = (): JSX.Element => {
  const { toProject } = useNav();

  const staffPicksItems = [
    {
      slug: "nfid",
      title: "NFID",
      text: "identity layer for the internet",
    },
    {
      slug: "me-wallet",
      title: "ME Wallet",
      text: "a powerful multichain wallet",
    },
    {
      slug: "taggr",
      title: "#TAGGR",
      text: "decentralized social network",
    },
    {
      slug: "funded",
      title: "Funded",
      text: "web3 crowdfunding",
    },
    {
      slug: "rabbithole-app",
      title: "Rabbithole",
      text: "🔒 encrypted file storage",
    },
    {
      slug: "carbon-crowd",
      title: "Carbon Crowd",
      text: "decarbonise cloud computing",
    },
    {
      slug: "canlista",
      title: "Canlista",
      text: "community canister registry",
    },
    {
      slug: "icpcoins",
      title: "ICPCoins",
      text: "ic cryptocurrencies by market cap",
    },
    {
      slug: "blast",
      title: "Blast",
      text: "install & share immutable contracts",
    },
    {
      slug: "nnscat",
      title: "NNSCat",
      text: "filter and compare NNS proposals",
    },
  ];

  const openProject = (slug: string): void => {
    toProject(slug);
  };

  return (
    <StaffPicksStyled>
      <h3>staff picks</h3>

      <ul>
        {staffPicksItems.map((item, i) => (
          <li onClick={() => openProject(item.slug)} key={i}>
            <span>{item.title}</span>
            <span id="text">{item.text}</span>
          </li>
        ))}
      </ul>
    </StaffPicksStyled>
  );
};

const StaffPicksStyled = styled.div`
  margin-bottom: 1rem;

  > h3 {
    font-size: var(--fs6);
    font-weight: var(--fwBold);
    color: var(--secondaryColor);
    margin-bottom: 0.5rem;
  }

  > ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    gap: 0.5rem;
    margin-bottom: 1rem;

    > li {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      font-size: var(--fsText);
      font-weight: var(--fwMedium);
      background-color: var(--underlay1);
      padding: 0.5rem 0.75rem;
      border-radius: 0.5rem;
      cursor: pointer;

      > span#text {
        font-size: var(--fs7);
        opacity: 80%;
      }
    }
  }
`;

export default StaffPicks;
