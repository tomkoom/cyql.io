import React, { FC } from "react"
import styled from "styled-components"
import useNav from "@/hooks/useNav"

// components
import {
  Header,
  HighlightedProjects,
  JoinCommunity,
  // ProjectProposals,
  Promo,
  StaffPicks,
} from "./_index"
import { Loading } from "@/components/ui/_index"
import { ViewAllBtn } from "@/components/btns/_index"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectAllProjects } from "@/state/projects"

const Home: FC = (): JSX.Element => {
  const { toProjects } = useNav()
  const projects = useAppSelector(selectAllProjects)
  const projectsExcludeNfts = projects.filter((p) => !p.category.includes("NFTs"))
  const projectsNfts = projects.filter((p) => p.category.includes("NFTs"))
  // const popularProjects = projects
  //   .filter((p) => p.upvotedBy)
  //   .filter((p) => !p.category.includes("NFTs"))
  //   .sort((a, b) => b.upvotedBy.length - a.upvotedBy.length)
  // const popularNfts = projects
  //   .filter((p) => p.upvotedBy)
  //   .filter((p) => p.category.includes("NFTs"))
  //   .sort((a, b) => b.upvotedBy.length - a.upvotedBy.length)

  if (projects.length < 1) {
    return <Loading />
  }

  return (
    <div>
      <Header />
      <Promo />
      <StaffPicks />
      {/* <ProjectProposals /> */}

      {/* newest projects */}
      <Section>
        <Title>
          <h3>new projects</h3>
          <ViewAllBtn route={toProjects} />
        </Title>
        <HighlightedProjects projects={projectsExcludeNfts} />
      </Section>

      {/* newest nfts */}
      <Section>
        <Title>
          <h3>new nfts</h3>
          <ViewAllBtn route={toProjects} />
        </Title>
        <HighlightedProjects projects={projectsNfts} />
      </Section>

      {/* popular projects */}
      {/* <Section>
        <Title>
          <h3>popular projects</h3>
          <ViewAllBtn route={toProjects} />
        </Title>
        <HighlightedProjects projects={popularProjects} />
      </Section> */}

      {/* popular nfts */}
      {/* <Section>
        <Title>
          <h3>popular nfts</h3>
          <ViewAllBtn route={toProjects} />
        </Title>
        <HighlightedProjects projects={popularNfts} />
      </Section> */}

      {/* wallets */}
      {/* <Section>
        <Title>
          <h3>wallets</h3>
          <ViewAllBtn route={toProjects} />
        </Title>
        <HighlightedByCategory filter="Wallets" />
      </Section>
      <Divider /> */}

      {/* explorers */}
      {/* <Section>
        <Title>
          <h3>explorers</h3>
          <ViewAllBtn route={toProjects} />
        </Title>
        <HighlightedByCategory filter="Explorers" />
      </Section>
      <Divider /> */}

      {/* social networks */}
      {/* <Section>
        <Title>
          <h3>social networks</h3>
          <ViewAllBtn route={toProjects} />
        </Title>
        <HighlightedByCategory filter="Social Networks" />
      </Section>
      <Divider /> */}

      {/* defi */}
      {/* <Section>
        <Title>
          <h3>defi</h3>
          <ViewAllBtn route={toProjects} />
        </Title>
        <HighlightedByCategory filter="DeFi" />
      </Section>
      <Divider /> */}

      {/* exchanges */}
      {/* <Section>
        <Title>
          <h3>exchanges</h3>
        </Title>
        <Exchanges />
      </Section>
      <Divider /> */}

      {/* join community */}
      <Section>
        <Title>
          <h3>join community</h3>
        </Title>
        <JoinCommunity />
      </Section>
    </div>
  )
}

const Section = styled.section`
  margin-bottom: 4rem;
`

const Title = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 1rem;

  > h3 {
    font-size: var(--fs4);
  }
`

const Divider = styled.div`
  height: 1px;
  box-shadow: 0 1px 0 0 var(--underlay1);
  margin-bottom: 4rem;
`

export default Home
