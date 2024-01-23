import React, { FC } from "react"
import styled from "styled-components"
import useNav from "@/hooks/useNav"

const staffPicksItems = [
  {
    id: "280",
    title: "#TAGGR",
    text: "decentralized social network",
  },
  {
    id: "389",
    title: "NFID",
    text: "identity layer for the internet",
  },
  {
    id: "430",
    title: "DooCoins",
    text: "rewards system for kids",
  },
  {
    id: "290",
    title: "ME Wallet",
    text: "a powerful multichain wallet",
  },
  {
    id: "246",
    title: "Funded",
    text: "web3 crowdfunding",
  },
  {
    id: "369",
    title: "OpenChat",
    text: "decentralized chat app",
  },
  {
    id: "424",
    title: "Rabbithole",
    text: "🔒 encrypted file storage",
  },
  {
    id: "215",
    title: "Carbon Crowd",
    text: "decarbonise cloud computing",
  },
  {
    id: "313",
    title: "Canlista",
    text: "community canister registry",
  },
  {
    id: "79",
    title: "ICPCoins",
    text: "ic cryptocurrencies by market cap",
  },
  {
    id: "80",
    title: "Blast",
    text: "install & share immutable contracts",
  },
  {
    id: "386",
    title: "NNSCat",
    text: "filter and compare NNS proposals",
  },
]

const StaffPicks: FC = (): JSX.Element => {
  const { toProject } = useNav()

  const openProject = (id: string): void => {
    toProject(id)
  }

  return (
    <StaffPicksStyled>
      <h3>staff picks</h3>

      <ul>
        {staffPicksItems.map((item, i) => (
          <li onClick={() => openProject(item.id)} key={i}>
            <span>{item.title}</span>
            <span id="text">{item.text}</span>
          </li>
        ))}
      </ul>
    </StaffPicksStyled>
  )
}

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
      padding: 0.25rem 0.5rem;
      border-radius: 0.5rem;
      cursor: pointer;

      > span#text {
        font-size: var(--fs7);
        font-weight: var(--fwRegular);
        color: var(--tertiaryColor);
      }
    }
  }
`

export default StaffPicks
