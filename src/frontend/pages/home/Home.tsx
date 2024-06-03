import React, { FC } from "react"
import styled from "styled-components"
import { useNav } from "@/hooks/_index"
// import { Btn } from "@/components/btns/_index"
// import { iPlus } from "@/components/icons/Icons"

// components
import { Header, HighlightedProjects, JoinCommunity, Promo, FlexBanner } from "./_index"
import { Loading } from "@/components/ui/_index"
import { ViewAllBtn } from "@/components/btns/_index"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectHome } from "@/state/home/home"

const Home: FC = (): JSX.Element => {
  const { toProjects, toList } = useNav()
  const home = useAppSelector(selectHome)
  const newProjects = home.new
  const tokens = home.highlighted.tokens
  const dapps = home.highlighted.dapps
  const socialNetworks = home.highlighted.social_networks
  const games = home.highlighted.games
  const defi = home.highlighted.defi
  const nfts = home.highlighted.nfts
  console.log(home.highlighted)

  return (
    <HomeStyled>
      <Header />
      {/* <Btn btnType={"secondary"} text={"List Project"} icon={iPlus} onClick={toList} /> */}
      <FlexBanner />
      <Promo />

      <Section>
        <Title>
          <h3>Latest Projects</h3>
          <ViewAllBtn route={toProjects} />
        </Title>

        {newProjects.length > 0 ? <HighlightedProjects projects={newProjects} /> : <Loading />}
      </Section>
      <Divider />

      <Section>
        <Title>
          <h3>Latest Tokens</h3>
          <ViewAllBtn route={toProjects} />
        </Title>

        {tokens.length > 0 ? <HighlightedProjects projects={tokens} /> : <Loading />}
      </Section>
      <Divider />

      <Section>
        <Title>
          <h3>Latest dApps</h3>
          <ViewAllBtn route={toProjects} />
        </Title>

        {tokens.length > 0 ? <HighlightedProjects projects={dapps} /> : <Loading />}
      </Section>
      <Divider />

      <Section>
        <Title>
          <h3>Latest Social Networks</h3>
          <ViewAllBtn route={toProjects} />
        </Title>

        {tokens.length > 0 ? <HighlightedProjects projects={socialNetworks} /> : <Loading />}
      </Section>
      <Divider />

      <Section>
        <Title>
          <h3>Latest Games</h3>
          <ViewAllBtn route={toProjects} />
        </Title>

        {tokens.length > 0 ? <HighlightedProjects projects={games} /> : <Loading />}
      </Section>
      <Divider />

      <Section>
        <Title>
          <h3>Latest DeFi Projects</h3>
          <ViewAllBtn route={toProjects} />
        </Title>

        {tokens.length > 0 ? <HighlightedProjects projects={defi} /> : <Loading />}
      </Section>
      <Divider />

      <Section>
        <Title>
          <h3>Latest NFTs</h3>
          <ViewAllBtn route={toProjects} />
        </Title>

        {nfts.length > 0 ? <HighlightedProjects projects={nfts} /> : <Loading />}
      </Section>
      <Divider />

      <Section>
        <Title style={{ justifyContent: "center" }}>
          <h3>Follow</h3>
        </Title>
        <JoinCommunity />
      </Section>

      <span className="inf">♾️♾️♾️</span>
    </HomeStyled>
  )
}

const HomeStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  > span.inf {
    text-align: center;
  }
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
  margin: 2rem 0;
`

export default Home
