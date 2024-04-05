import React, { FC } from "react"
import styled from "styled-components"
import { CategoryBlock } from "./_index"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectListProject } from "@/state/projectProposal"
import { selectProposedProjectCategories } from "@/state/categories/proposedProjectCategories"

const Category: FC = (): JSX.Element => {
  const project = useAppSelector(selectListProject)
  const allCategories = useAppSelector(selectProposedProjectCategories)

  return (
    <CategoryStyled>
      <p className="category_array">[{project.category.join(", ")}]</p>
      <CategoriesWrapper>
        <CategoryBlock
          name="Infrastructure"
          categories={allCategories.filter((c) =>
            [
              "infrastructure",
              "storage",
              "computing",
              "search_engines",
              "protocol",
              "automation",
              "developer_tooling",
            ].includes(c)
          )}
        />

        <CategoryBlock
          name="DeFi"
          categories={allCategories.filter((c) =>
            ["defi", "staking", "wallets", "dexs_swapping"].includes(c)
          )}
        />

        <CategoryBlock
          name="Communication"
          categories={allCategories.filter((c) =>
            ["communication", "social_networks", "messaging"].includes(c)
          )}
        />

        <CategoryBlock
          name="Games, Metaverse, AR/VR"
          categories={allCategories.filter((c) =>
            ["games", "metaverse", "ar_vr", "p2e", "betting"].includes(c)
          )}
        />

        <CategoryBlock
          name="Governance"
          categories={allCategories.filter((c) => ["governance", "daos"].includes(c))}
        />

        <CategoryBlock
          name="Anaytics"
          categories={allCategories.filter((c) => ["analytics", "explorers"].includes(c))}
        />

        <CategoryBlock
          name="Identity"
          categories={allCategories.filter((c) => ["identity", "identity_providers"].includes(c))}
        />

        <CategoryBlock
          name="NFTs"
          categories={allCategories.filter((c) =>
            ["nfts", "nft_analytics", "inscriptions"].includes(c)
          )}
        />

        <CategoryBlock
          name="BTC, Ethereum"
          categories={allCategories.filter((c) => ["btc", "ethereum"].includes(c))}
        />

        <CategoryBlock
          name="Communities"
          categories={allCategories.filter((c) => ["communities"].includes(c))}
        />

        <CategoryBlock
          name="Other"
          categories={allCategories.filter((c) =>
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
  align-items: center;
  gap: 1rem;

  > p.category_array {
    font-size: var(--fs5);
  }
`

const CategoriesWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 2px;
`

export default Category
