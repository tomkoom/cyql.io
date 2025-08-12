import { ProjectLogo } from "@/components"
import { UpvoteBtn } from "@/components/btns"
import { useNavigation, useProjectsQuery, useQueryParams } from "@/hooks"
import { useProjectsByIdsQuery } from "@/hooks/queries/useProjectsQuery"
import type { Project } from "@/state/types/Project"
import { useMemo } from "react"
import { PromotionalBanner, SocialLinks, Tags, Title } from "."
import { filterBySearch } from "../utils"

interface ProjectListItemProps {
  project: Project
  index: number
  onProjectClick: (id: string) => void
}

const HIGHLIGHTED_PROJECT_IDS = ["1754974310201"]

const FEATURED_TAGLINES: Record<string, string> = {
  // Kairos
  "1754974310201": "Bitcoin prediction markets",
}

const HighlightedProjects = ({ projects, onProjectClick }: { projects: Project[]; onProjectClick: (id: string) => void }) => {
  if (!projects || projects.length === 0) return null

  return (
    <div className="border-coolgray-950 bg-coolgray-950/40 mb-2 flex items-center gap-2 overflow-x-auto rounded-lg border px-3 py-2">
      <span className="text-coolgray-400 shrink-0 text-xs font-medium">Featured:</span>
      <div className="flex items-center gap-2">
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => onProjectClick(project.id.toString())}
            className="border-coolgray-900 hover:border-coolgray-800 hover:bg-coolgray-900/50 group inline-flex cursor-pointer items-center gap-2 rounded-full border px-2 py-1 transition-colors"
          >
            <ProjectLogo project={project} sizeRem="1.25rem" borderRadiusRem="0.375rem" />
            <span className="text-coolgray-100 max-w-[10rem] truncate text-xs font-medium group-hover:text-white">{project.name}</span>
            {FEATURED_TAGLINES[project.id] && (
              <span className="text-coolgray-400 -ml-1 hidden max-w-[12rem] truncate text-[11px] md:inline" title={FEATURED_TAGLINES[project.id]}>
                — {FEATURED_TAGLINES[project.id]}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

// Shared column classes for consistent spacing
const columnClasses = {
  index: "hidden md:flex md:w-12 justify-center",
  name: "flex-auto sm:flex-[calc(60%-1rem)] md:flex-[50%]",
  category: "hidden sm:flex sm:flex-[calc(40%-1rem)] md:flex-[25%]",
  socials: "hidden md:flex md:flex-[20%]",
  votes: "w-16 flex justify-center shrink-0",
}

const ProjectListItem = ({ project, index, onProjectClick }: ProjectListItemProps) => (
  <li
    role="button"
    tabIndex={0}
    onKeyDown={(e) => e.key === "Enter" && onProjectClick(project.id.toString())}
    onClick={() => onProjectClick(project.id.toString())}
    className="border-coolgray-950 hover:bg-coolgray-950 focus:bg-coolgray-950 flex cursor-pointer items-center gap-4 border-b py-2 transition-colors focus:outline-none"
  >
    <div className={`${columnClasses.index} text-coolgray-500 text-sm`}>{index}</div>

    <div className={columnClasses.name}>
      <div className="flex items-center gap-4">
        <ProjectLogo project={project} sizeRem="3.25rem" borderRadiusRem="1.125rem" />
        <Title project={project} />
      </div>
    </div>

    <div className={columnClasses.category}>
      <Tags category={project.category} />
    </div>

    <div className={columnClasses.socials}>
      <SocialLinks project={project} />
    </div>

    <div className={columnClasses.votes} onClick={(e) => e.stopPropagation()}>
      <UpvoteBtn projectId={project.id.toString()} btnLocation="project_list" upvotedBy={project.upvotedBy} />
    </div>
  </li>
)

const ProjectsListHeader = () => (
  <div className="border-coolgray-950 text-coolgray-500 flex items-center gap-4 border-b py-3 text-sm font-medium">
    <div className={columnClasses.index}>#</div>
    <div className={columnClasses.name}>Name</div>
    <div className={columnClasses.category}>Category</div>
    <div className={columnClasses.socials}>Links</div>
    <div className={columnClasses.votes}>Votes</div>
  </div>
)

export default function ProjectsList() {
  const { toProject } = useNavigation()
  const { queryParams } = useQueryParams()
  const { data: projectsData, isLoading, error } = useProjectsQuery()
  const { data: highlightedProjects = [] } = useProjectsByIdsQuery(HIGHLIGHTED_PROJECT_IDS)

  const projects = projectsData?.data || []
  const startIndex = projectsData?.startIndex || 0
  const filteredProjects = useMemo(() => projects.filter((project) => filterBySearch(project, queryParams.q)), [projects, queryParams.q])
  const blankStyle = "text-coolgray-400 flex justify-center text-sm"

  if (isLoading) return <div className={blankStyle}>Loading...</div>
  if (error) return <div className={blankStyle}>Error loading projects. Please try again.</div>
  if (filteredProjects.length < 1) return <div className={blankStyle}>No projects found.</div>

  return (
    <main>
      <div className="mb-2 flex flex-col gap-2">
        <PromotionalBanner />
        <HighlightedProjects projects={highlightedProjects} onProjectClick={toProject} />
      </div>
      <ProjectsListHeader />
      <ul className="flex flex-col" role="list">
        {filteredProjects.map((project, idx) => (
          <ProjectListItem key={project.id} project={project} index={startIndex + idx + 1} onProjectClick={toProject} />
        ))}
      </ul>
    </main>
  )
}
