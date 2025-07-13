import { Loading } from "@/components/ui"
import { Button } from "@/components/ui/button"
import { useHomeQuery, useNav } from "@/hooks"
import { Header, HighlightedProjects, JoinCommunity } from "."

export default function Home() {
  const { toProjects } = useNav()
  const { data: homeData, isLoading, isError, error } = useHomeQuery()

  if (isError || (!isLoading && !homeData)) {
    return (
      <div className="mx-auto flex max-w-[1920px] flex-col gap-8">
        <Header />
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="mb-4 text-xl">Something went wrong. Please try again.</h2>
          <p className="text-coolgray-500 mb-4">{error?.message || "Unable to load homepage data"}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  const {
    new: newProjects,
    mostUpvoted,
    highlighted,
    isNewLoading,
    isMostUpvotedLoading,
    isHighlightedLoading,
  } = homeData || {
    new: [],
    mostUpvoted: [],
    highlighted: [],
    isNewLoading: true,
    isMostUpvotedLoading: true,
    isHighlightedLoading: true,
  }

  return (
    <div className="mx-auto flex max-w-[1920px] flex-col gap-8">
      <Header />

      {/* New Projects Section */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl">Newly Listed</h3>
          <Button variant="secondary" size="sm" onClick={toProjects}>
            View All
          </Button>
        </div>

        {isNewLoading ? (
          <Loading />
        ) : newProjects.length > 0 ? (
          <HighlightedProjects projects={newProjects} />
        ) : (
          <div className="text-coolgray-400 flex justify-center text-sm">No new projects found</div>
        )}
      </section>
      <div className="bg-coolgray-950 my-4 h-px" />

      {/* Highlighted Categories */}
      {isHighlightedLoading ? (
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl">Loading Categories...</h3>
          </div>
          <Loading />
        </section>
      ) : (
        highlighted.map((categoryData) => (
          <div key={categoryData.categoryId}>
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl">New in {categoryData.categoryLabel}</h3>
                <Button variant="secondary" size="sm" onClick={toProjects}>
                  View All
                </Button>
              </div>

              {categoryData.projects.length > 0 ? (
                <HighlightedProjects projects={categoryData.projects} />
              ) : (
                <div className="text-coolgray-400 flex justify-center text-sm">No projects found in {categoryData.categoryLabel}</div>
              )}
            </section>
            <div className="bg-coolgray-950 my-4 h-px" />
          </div>
        ))
      )}

      {/* Most Upvoted Section */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl">Most Upvoted</h3>
          <Button variant="secondary" size="sm" onClick={toProjects}>
            View All
          </Button>
        </div>

        {isMostUpvotedLoading ? (
          <Loading />
        ) : mostUpvoted.length > 0 ? (
          <HighlightedProjects projects={mostUpvoted} />
        ) : (
          <div className="text-coolgray-400 flex justify-center text-sm">No upvoted projects found</div>
        )}
      </section>
      <div className="bg-coolgray-950 my-4 h-px" />

      <JoinCommunity />
    </div>
  )
}
