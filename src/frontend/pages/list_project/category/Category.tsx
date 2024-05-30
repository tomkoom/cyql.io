import React, { FC } from "react"
import styled from "styled-components"
import { CategoryBlock } from "./_index"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectListProject } from "@/state/listProject"
import { selectProposedProjectCategories } from "@/state/categories/proposedProjectCategories"

const Category: FC = (): JSX.Element => {
  const project = useAppSelector(selectListProject)
  const categories = useAppSelector(selectProposedProjectCategories)

  return (
    <CategoryStyled>
      {project.category.length > 0 && (
        <div className="selected">
          <p>Selected categories:</p>
          <div>
            {project.category.map((category) => (
              <span key={category}>{category}</span>
            ))}
          </div>
        </div>
      )}

      <CategoriesWrapper>
        <CategoryBlock
          name="Infrastructure"
          categories={categories.filter((c) =>
            ["infrastructure", "storage", "computing", "search_engines", "protocol", "automation", "developer_tooling"].includes(c)
          )}
        />

        <CategoryBlock name="DeFi" categories={categories.filter((c) => ["defi", "staking", "wallets", "dexs_swapping"].includes(c))} />

        <CategoryBlock name="Communication" categories={categories.filter((c) => ["communication", "social_networks", "messaging"].includes(c))} />

        <CategoryBlock name="Games, Metaverse, AR/VR" categories={categories.filter((c) => ["games", "metaverse", "ar_vr", "p2e", "betting"].includes(c))} />

        <CategoryBlock name="Governance" categories={categories.filter((c) => ["governance", "daos"].includes(c))} />

        <CategoryBlock name="Anaytics" categories={categories.filter((c) => ["analytics", "explorers"].includes(c))} />

        <CategoryBlock name="Identity" categories={categories.filter((c) => ["identity", "identity_providers"].includes(c))} />

        <CategoryBlock name="NFTs" categories={categories.filter((c) => ["nfts", "nft_analytics", "inscriptions"].includes(c))} />

        <CategoryBlock name="BTC, Ethereum" categories={categories.filter((c) => ["btc", "ethereum"].includes(c))} />

        <CategoryBlock name="Communities" categories={categories.filter((c) => ["communities"].includes(c))} />

        <CategoryBlock
          name="Other"
          categories={categories.filter((c) =>
            [
              "other",
              "dapps",
              "education",
              "payments_invoicing",

              // ...
              "vcs",
              "ai",
            ].includes(c)
          )}
        />
      </CategoriesWrapper>
    </CategoryStyled>
  )
}

const CategoryStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > div.selected {
    > p {
      font-size: var(--fsText);
      margin-bottom: 0.5rem;
    }

    > div {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.25rem;

      > span {
        padding: 0.5rem;
        color: var(--background);
        background-color: var(--primaryColor);
        font-size: var(--fsText);
      }
    }
  }
`

const CategoriesWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 2px;
`

export default Category
