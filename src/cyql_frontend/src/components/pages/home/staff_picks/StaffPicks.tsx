import React, { FC } from "react";
import styled from "styled-components";

// router
import { useHistory } from "react-router";

const StaffPicks: FC = (): JSX.Element => {
  const history = useHistory();

  const staffPicksItems = [
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
  ];

  const openProject = (slug: string): void => {
    history.push(`projects/${slug}`);
  };

  return (
    <StaffPicksStyled>
      <h3>staff picks</h3>

      <ul>
        {staffPicksItems.map((item, i) => (
          <li onClick={() => openProject(item.slug)} key={i}>
            <span id="title">{item.title}</span>
            <span id="text">{item.text}</span>
          </li>
        ))}
      </ul>
    </StaffPicksStyled>
  );
};

const StaffPicksStyled = styled.div`
  > h3 {
    font-size: var(--fsText);
    font-weight: var(--fwRegular);
    color: var(--secondaryColor);
    margin-bottom: 0.5rem;
  }

  > ul {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;

    > li {
      width: 14rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      font-size: var(--fsText);
      font-weight: var(--fwMedium);
      white-space: nowrap;
      background-color: var(--underlay1);
      padding: 0.5rem 0.75rem;
      border-radius: 0.5rem;
      cursor: pointer;

      > span#title {
      }

      > span#text {
        font-size: var(--fs7);
        opacity: 80%;
      }
    }
  }
`;

export default StaffPicks;
