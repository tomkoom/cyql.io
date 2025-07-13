import { Loading } from "@/components/ui"
import type { CategoryProjects } from "@/hooks/queries/useHomeQuery"
import { Fragment, memo } from "react"
import { HOME_CONSTANTS, getCategoryDisplayName } from "../constants"
import { HomeSection } from "./HomeSection"

interface HighlightedSectionProps {
  highlighted: CategoryProjects[]
  isLoading: boolean
  onViewAll: () => void
}

const SectionDivider = memo(() => <div className="bg-coolgray-950 my-4 h-px" />)

export const HighlightedSection = memo(({ highlighted, isLoading, onViewAll }: HighlightedSectionProps) => {
  if (isLoading) {
    return (
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl">{HOME_CONSTANTS.LOADING.CATEGORIES}</h3>
        </div>
        <Loading />
      </section>
    )
  }

  // Render each category section
  return (
    <>
      {highlighted.map((categoryData, index) => (
        <Fragment key={categoryData.categoryId}>
          <HomeSection
            title={`${HOME_CONSTANTS.SECTIONS.HIGHLIGHTED} ${getCategoryDisplayName(categoryData.categoryLabel)}`}
            projects={categoryData.projects}
            isLoading={false}
            onViewAll={onViewAll}
            emptyMessage={`${HOME_CONSTANTS.ERRORS.NO_CATEGORY_PROJECTS} ${categoryData.categoryLabel}`}
          />
          {index < highlighted.length - 1 && <SectionDivider />}
        </Fragment>
      ))}
    </>
  )
})
