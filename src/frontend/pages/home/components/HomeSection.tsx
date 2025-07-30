import { Loading } from "@/components/ui"
import { Button } from "@/components/ui/button"
import type { Project } from "@/state/types/Project"
import { memo } from "react"
import { HighlightedProjects } from ".."

interface HomeSectionProps {
  title: string
  projects: Project[]
  isLoading: boolean
  onViewAll: () => void
  emptyMessage?: string
  className?: string
}

export const HomeSection = memo(({ title, projects, isLoading, onViewAll, emptyMessage = "No projects found", className = "" }: HomeSectionProps) => {
  return (
    <section className={className}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold">{title}</h3>
        <Button variant="secondary" size="sm" onClick={onViewAll} aria-label={`View all ${title.toLowerCase()} projects`}>
          View All
        </Button>
      </div>

      {isLoading ? (
        <Loading />
      ) : projects.length > 0 ? (
        <HighlightedProjects projects={projects} />
      ) : (
        <div className="text-coolgray-400 flex justify-center text-sm" role="status">
          {emptyMessage}
        </div>
      )}
    </section>
  )
})
