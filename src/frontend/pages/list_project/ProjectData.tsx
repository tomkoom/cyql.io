import React, { FC } from "react"
import styled from "styled-components"
import { Categories } from "./_index"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectProposedProject } from "@/state/proposedProject"
import { selectProposedProjectCategories } from "@/state/categories/proposedProjectCategories"

const ProjectData: FC = (): JSX.Element => {
  const project = useAppSelector(selectProposedProject)
  const allCategories = useAppSelector(selectProposedProjectCategories)

  return (
    <ProjectDataStyled>
      <div className="section">
        <div className="title">
          <h5>1. Pick category</h5>
          <p>One or multiple</p>
        </div>

        <p className="category_array">[{project.category.join(", ")}]</p>
        <CategoriesWrapper>
          <Categories
            name="Infrastructure"
            categories={allCategories.filter((c) =>
              [
                "infrastructure",
                "storage",
                "computing",
                "search_engines",
                "protocol",
                "automation",
              ].includes(c)
            )}
          />

          <Categories
            name="DeFi"
            categories={allCategories.filter((c) =>
              ["defi", "staking", "wallets", "dexs_swapping"].includes(c)
            )}
          />

          <Categories
            name="Communication"
            categories={allCategories.filter((c) =>
              ["communication", "social_networks", "messaging"].includes(c)
            )}
          />

          <Categories
            name="Games, Metaverse, AR/VR"
            categories={allCategories.filter((c) =>
              ["games", "metaverse", "ar_vr", "p2e", "betting"].includes(c)
            )}
          />

          <Categories
            name="Governance"
            categories={allCategories.filter((c) => ["governance", "daos"].includes(c))}
          />

          <Categories
            name="Anaytics"
            categories={allCategories.filter((c) => ["analytics", "explorers"].includes(c))}
          />

          <Categories
            name="Identity"
            categories={allCategories.filter((c) => ["identity", "identity_providers"].includes(c))}
          />

          <Categories
            name="NFTs"
            categories={allCategories.filter((c) =>
              ["nfts", "nft_analytics", "inscriptions"].includes(c)
            )}
          />

          <Categories
            name="BTC, Ethereum"
            categories={allCategories.filter((c) => ["btc", "ethereum"].includes(c))}
          />

          <Categories
            name="Communities"
            categories={allCategories.filter((c) => ["communities"].includes(c))}
          />

          <Categories
            name="Other"
            categories={allCategories.filter((c) =>
              [
                "other",
                "dapps",
                "education",
                "dev_tools",
                "payments_invoicing",

                // ...
                "communities",
                "vcs",

                // ...
                "ai",

                // ...
              ].includes(c)
            )}
          />
        </CategoriesWrapper>
      </div>

      <div className="section">
        <div className="title">
          <h5>2. Token</h5>
          <p>
            Please pick the token standard and specify the ledger canister id if the project is
            tokenized
          </p>
        </div>
      </div>
    </ProjectDataStyled>
  )
}

const ProjectDataStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  text-align: center;
  margin: 2rem 0;

  > div.section {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    > p.category_array {
      font-size: var(--fs5);
    }

    > div.title {
      h5 {
        margin-bottom: 0.25rem;
      }

      p {
        color: var(--secondaryColor);
      }
    }
  }

  > div.categories {
  }
`

const CategoriesWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 1.5rem;
`

export default ProjectData
