import React, { FC } from "react"
import styled from "styled-components"
import { useNav } from "@/hooks/_index"
import { Btn } from "@/components/btns/_index"
import { iPlus } from "@/components/icons/Icons"

// components
import { Header, HighlightedProjects, JoinCommunity, Promo, StaffPicks, Banner } from "./_index"
import { Loading } from "@/components/ui/_index"
import { ViewAllBtn } from "@/components/btns/_index"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectAllProjects } from "@/state/projects"

const Home: FC = (): JSX.Element => {
  const { toProjects, toList } = useNav()
  const projects = useAppSelector(selectAllProjects)
  const projectsTokens = projects.filter((p) =>
    p.category.map((c) => c.toLowerCase()).includes("tokens")
  )
  const projectsNfts = projects.filter((p) =>
    p.category.map((c) => c.toLowerCase()).includes("nfts")
  )

  if (projects.length < 1) {
    return <Loading />
  }

  return (
    <HomeStyled>
      <Header />
      <Btn btnType={"secondary"} text={"List Project"} icon={iPlus} onClick={toList} />
      <StaffPicks />
      <Banner />
      <Promo />
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
