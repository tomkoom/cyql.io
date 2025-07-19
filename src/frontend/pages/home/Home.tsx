import { useHomeQuery, useNav } from "@/hooks"
import { memo, useCallback, useMemo } from "react"
import { Header, JoinCommunity } from "."
import { ErrorState, HighlightedSection, HomeSection } from "./components"
import { HOME_CONSTANTS } from "./constants"

const SectionDivider = memo(() => <div className="bg-coolgray-950 my-4 h-px" />)

export default function Home() {
  const { toProjects } = useNav()
  const { data: homeData, isError, error } = useHomeQuery()

  const handleViewAll = useCallback(() => {
    toProjects()
  }, [toProjects])

  const handleRetry = useCallback(() => {
    window.location.reload()
  }, [])

  // Memoize data extraction to prevent unnecessary processing
  const { newProjects, mostUpvoted, highlighted, isNewLoading, isMostUpvotedLoading, isHighlightedLoading } = useMemo(() => {
    if (!homeData) {
      return {
        newProjects: [],
        mostUpvoted: [],
        highlighted: [],
        isNewLoading: true,
        isMostUpvotedLoading: true,
        isHighlightedLoading: true,
      }
    }

    return {
      newProjects: homeData.new,
      mostUpvoted: homeData.mostUpvoted,
      highlighted: homeData.highlighted,
      isNewLoading: homeData.isNewLoading || false,
      isMostUpvotedLoading: homeData.isMostUpvotedLoading || false,
      isHighlightedLoading: homeData.isHighlightedLoading || false,
    }
  }, [homeData])

  // Show error state if there's an error and no data
  if (isError && !homeData) {
    return (
      <div className="mx-auto flex max-w-[1920px] flex-col gap-8">
        <Header />
        <ErrorState error={error} onRetry={handleRetry} />
      </div>
    )
  }

  return (
    <div className="mx-auto flex max-w-[1920px] flex-col gap-8">
      <Header />

      {/* New Projects Section */}
      <HomeSection
        title={HOME_CONSTANTS.SECTIONS.NEW}
        projects={newProjects}
        isLoading={isNewLoading}
        onViewAll={handleViewAll}
        emptyMessage={HOME_CONSTANTS.ERRORS.NO_NEW_PROJECTS}
      />
      <SectionDivider />

      {/* Highlighted Categories */}
      <HighlightedSection highlighted={highlighted} isLoading={isHighlightedLoading} onViewAll={handleViewAll} />
      <SectionDivider />

      {/* Most Upvoted Section */}
      <HomeSection
        title={HOME_CONSTANTS.SECTIONS.MOST_UPVOTED}
        projects={mostUpvoted}
        isLoading={isMostUpvotedLoading}
        onViewAll={handleViewAll}
        emptyMessage={HOME_CONSTANTS.ERRORS.NO_UPVOTED_PROJECTS}
      />
      <SectionDivider />
      <JoinCommunity />
    </div>
  )
}
