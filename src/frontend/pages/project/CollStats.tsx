import type { Project } from "@/state/types/Project"
import React, { FC } from "react"
import styled from "styled-components"

interface CollStatsProps {
  project: Project
}

const CollStats: FC<CollStatsProps> = ({ project }) => {
  const { nftSaleDate, nftUnits, nftUnitPrice } = project

  if (!project.category.includes("NFTs")) {
    return null
  }

  return (
    <CollStatsStyled>
      <h5>Collection Stats</h5>

      <ul>
        <li>
          <p className="label">Sale date</p>
          <p className="value">{nftSaleDate || "n/a"}</p>
        </li>

        <li>
          <p className="label">Total items</p>
          <p className="value">{nftUnits || "n/a"}</p>
        </li>

        <li>
          <p className="label">Sale price</p>
          <p id="collStatsInfo" className="value">
            {nftUnitPrice ? nftUnitPrice.toLowerCase() : "n/a"}
          </p>
        </li>
      </ul>
    </CollStatsStyled>
  )
}

const CollStatsStyled = styled.div`
  > h5 {
    font-size: var(--fs5);
    margin-top: 1rem;
  }

  > ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
    gap: 0.5rem;
    margin: 0.5rem 0;

    > li {
      background-color: var(--underlay1);
      padding: 1rem;
      white-space: nowrap;

      > p.label {
        font-size: var(--fs6);
        font-weight: var(--fwMedium);
        color: var(--tertiaryColor);
        margin-bottom: 0.125rem;
      }

      > p.value {
        line-height: 150%;
        font-weight: var(--fwMedium);

        &#collStatsInfo {
          white-space: normal;
          word-wrap: break-word;
        }
      }
    }
  }
`

export default CollStats
