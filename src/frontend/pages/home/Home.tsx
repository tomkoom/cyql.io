import { Loading } from "@/components/ui"
import { Button } from "@/components/ui/button"
import { useNav } from "@/hooks"
import { useAppSelector } from "@/hooks/useRedux"
import { selectHome } from "@/state/home/home"
import { Header, HighlightedProjects, JoinCommunity } from "."

export default function Home() {
  const { toProjects } = useNav()
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
    <div className="mx-auto flex max-w-[1920px] flex-col gap-8">
      <Header />

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl">Newly Listed</h3>
          <Button variant="secondary" size="sm" onClick={toProjects}>
            View All
          </Button>
        </div>

        {newProjects.length > 0 ? <HighlightedProjects projects={newProjects} /> : <Loading />}
      </section>
      <div className="bg-coolgray-950 my-4 h-px" />

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl">New in dApps</h3>
          <Button variant="secondary" size="sm" onClick={toProjects}>
            View All
          </Button>
        </div>

        {tokens.length > 0 ? <HighlightedProjects projects={dapps} /> : <Loading />}
      </section>
      <div className="bg-coolgray-950 my-4 h-px" />

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl">New in Social Networks</h3>
          <Button variant="secondary" size="sm" onClick={toProjects}>
            View All
          </Button>
        </div>

        {tokens.length > 0 ? <HighlightedProjects projects={socialNetworks} /> : <Loading />}
      </section>
      <div className="bg-coolgray-950 my-4 h-px" />

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl">New in Marketplaces</h3>
          <Button variant="secondary" size="sm" onClick={toProjects}>
            View All
          </Button>
        </div>

        {tokens.length > 0 ? <HighlightedProjects projects={marketplace} /> : <Loading />}
      </section>
      <div className="bg-coolgray-950 my-4 h-px" />

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl">New in Games</h3>
          <Button variant="secondary" size="sm" onClick={toProjects}>
            View All
          </Button>
        </div>

        {tokens.length > 0 ? <HighlightedProjects projects={games} /> : <Loading />}
      </section>
      <div className="bg-coolgray-950 my-4 h-px" />

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl">New in DeFi</h3>
          <Button variant="secondary" size="sm" onClick={toProjects}>
            View All
          </Button>
        </div>

        {tokens.length > 0 ? <HighlightedProjects projects={defi} /> : <Loading />}
      </section>
      <div className="bg-coolgray-950 my-4 h-px" />

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl">New in Tokens</h3>
          <Button variant="secondary" size="sm" onClick={toProjects}>
            View All
          </Button>
        </div>

        {tokens.length > 0 ? <HighlightedProjects projects={tokens} /> : <Loading />}
      </section>
      <div className="bg-coolgray-950 my-4 h-px" />

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl">New in NFTs</h3>
          <Button variant="secondary" size="sm" onClick={toProjects}>
            View All
          </Button>
        </div>

        {nfts.length > 0 ? <HighlightedProjects projects={nfts} /> : <Loading />}
      </section>
      <div className="bg-coolgray-950 my-4 h-px" />

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl">Most Upvoted</h3>
          <Button variant="secondary" size="sm" onClick={toProjects}>
            View All
          </Button>
        </div>

        {mostUpvoted.length > 0 ? <HighlightedProjects projects={mostUpvoted} /> : <Loading />}
      </section>
      <div className="bg-coolgray-950 my-4 h-px" />

      <JoinCommunity />
    </div>
  )
}
