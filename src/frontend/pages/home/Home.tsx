import React, { FC } from "react"
import styled from "styled-components"
import { useNav } from "@/hooks/_index"
import { useNavigate } from "react-router-dom"
import { Btn } from "@/components/btns/_index"
import { iPlus } from "@/components/icons/Icons"

// components
import {
  Header,
  HighlightedProjects,
  JoinCommunity,
  // ProjectProposalData,
  Promo,
  StaffPicks,
  Banner,
} from "./_index"
import { Loading } from "@/components/ui/_index"
import { ViewAllBtn } from "@/components/btns/_index"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectAllProjects } from "@/state/projects"

const Home: FC = (): JSX.Element => {
  const { toProjects } = useNav()
  const navigate = useNavigate()
  const projects = useAppSelector(selectAllProjects)
  const projectsTokens = projects.filter((p) =>
    p.category.map((c) => c.toLowerCase()).includes("tokens")
  )
  const projectsNfts = projects.filter((p) =>
    p.category.map((c) => c.toLowerCase()).includes("nfts")
  )
  // const popularProjects = projects
  //   .filter((p) => p.upvotedBy)
  //   .filter((p) => !p.category.includes("NFTs"))
  //   .sort((a, b) => b.upvotedBy.length - a.upvotedBy.length)
  // const popularNfts = projects
  //   .filter((p) => p.upvotedBy)
  //   .filter((p) => p.category.includes("NFTs"))
  //   .sort((a, b) => b.upvotedBy.length - a.upvotedBy.length)

  const navigateToListProject = (): void => {
    navigate("list")
  }

  if (projects.length < 1) {
    return <Loading />
  }

  return (
    <HomeStyled>
      <Header />
      <Btn
        btnType={"secondary"}
        text={"List Project"}
        icon={iPlus}
        onClick={navigateToListProject}
      />
      <StaffPicks />
      <Banner />
      <Promo />
      {/* <ProjectProposalData /> */}

      <Divider />

      <Section>
        <Title>
          <h3>new projects</h3>
          <ViewAllBtn route={toProjects} />
        </Title>
        <HighlightedProjects projects={projects} />
      </Section>

      <Divider />

      <Section>
        <Title>
          <h3>new tokens</h3>
          <ViewAllBtn route={toProjects} />
        </Title>
        <HighlightedProjects projects={projectsTokens} />
      </Section>

      <Divider />

      <Section>
        <Title>
          <h3>new nfts</h3>
          <ViewAllBtn route={toProjects} />
        </Title>
        <HighlightedProjects projects={projectsNfts} />
      </Section>

      <Divider />

      <Section>
        <Title style={{ justifyContent: "center" }}>
          <h3>join community</h3>
        </Title>
        <JoinCommunity />
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
    </HomeStyled>
  )
}

const HomeStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 4rem;
`

const Section = styled.section``

const Title = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 1rem;

  > h3 {
    font-size: var(--fs5);
  }
`

const Divider = styled.div`
  height: 1px;
  box-shadow: 0 1px 0 0 var(--underlay1);
  margin-bottom: 3rem 0;
`

export default Home
