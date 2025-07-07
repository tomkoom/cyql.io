import { ViewAllBtn } from "@/components/btns"
import { Loading } from "@/components/ui/_index"
import { useNav } from "@/hooks"
import { useAppSelector } from "@/hooks/useRedux"
import { selectHome } from "@/state/home/home"
import { Header, HighlightedProjects, JoinCommunity, Promo } from "."

export default function Home() {
  const { toProjects, toMostUpvoted } = useNav()
  const home = useAppSelector(selectHome)
  const newProjects = home.new
  const mostUpvoted = home.mostUpvoted
  const dapps = home.highlighted.dapps
  const socialNetworks = home.highlighted.social_networks
  const marketplace = home.highlighted.marketplace
  const games = home.highlighted.games
  const defi = home.highlighted.defi
  const tokens = home.highlighted.tokens
  const nfts = home.highlighted.nfts

  return (
    <div className="flex flex-col gap-8">
      <Header />
      <Promo />

      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="!text-2xl">New Listings</h3>
          <ViewAllBtn route={toProjects} />
        </div>

        {newProjects.length > 0 ? <HighlightedProjects projects={newProjects} /> : <Loading />}
      </section>
      <div className="h-px bg-coolgray-950 my-4" />

      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="!text-2xl">New in dApps</h3>
          <ViewAllBtn route={toProjects} />
        </div>

        {tokens.length > 0 ? <HighlightedProjects projects={dapps} /> : <Loading />}
      </section>
      <div className="h-px bg-coolgray-950 my-4" />

      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="!text-2xl">New in Social Networks</h3>
          <ViewAllBtn route={toProjects} />
        </div>

        {tokens.length > 0 ? <HighlightedProjects projects={socialNetworks} /> : <Loading />}
      </section>
      <div className="h-px bg-coolgray-950 my-4" />

      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="!text-2xl">New in Marketplaces</h3>
          <ViewAllBtn route={toProjects} />
        </div>

        {tokens.length > 0 ? <HighlightedProjects projects={marketplace} /> : <Loading />}
      </section>
      <div className="h-px bg-coolgray-950 my-4" />

      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="!text-2xl">New in Games</h3>
          <ViewAllBtn route={toProjects} />
        </div>

        {tokens.length > 0 ? <HighlightedProjects projects={games} /> : <Loading />}
      </section>
      <div className="h-px bg-coolgray-950 my-4" />

      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="!text-2xl">New in DeFi</h3>
          <ViewAllBtn route={toProjects} />
        </div>

        {tokens.length > 0 ? <HighlightedProjects projects={defi} /> : <Loading />}
      </section>
      <div className="h-px bg-coolgray-950 my-4" />

      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="!text-2xl">New in Tokens</h3>
          <ViewAllBtn route={toProjects} />
        </div>

        {tokens.length > 0 ? <HighlightedProjects projects={tokens} /> : <Loading />}
      </section>
      <div className="h-px bg-coolgray-950 my-4" />

      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="!text-2xl">New in NFTs</h3>
          <ViewAllBtn route={toProjects} />
        </div>

        {nfts.length > 0 ? <HighlightedProjects projects={nfts} /> : <Loading />}
      </section>
      <div className="h-px bg-coolgray-950 my-4" />

      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="!text-2xl">Most Upvoted</h3>
          <ViewAllBtn route={toProjects} />
        </div>

        {mostUpvoted.length > 0 ? <HighlightedProjects projects={mostUpvoted} btnText="View All Most Upvoted" route={toMostUpvoted} /> : <Loading />}
      </section>
      <div className="h-px bg-coolgray-950 my-4" />

      <section className="mb-8">
        <div className="flex items-center justify-center mb-4">
          <h3 className="!text-3xl">Follow</h3>
        </div>
        <JoinCommunity />
      </section>
    </div>
  )
}
