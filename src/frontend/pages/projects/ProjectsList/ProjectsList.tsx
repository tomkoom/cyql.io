import { ProjectLogo } from "@/components"
import { UpvoteBtn } from "@/components/btns"
import { Icon } from "@/components/Icon"
import { useNavigation, useProjectsQuery, useQueryParams } from "@/hooks"
import type { Project } from "@/state/types/Project"
import { useMemo } from "react"
import { Link } from "react-router-dom"
import { SocialLinks, Tags, Title } from "."
import { filterBySearch } from "../utils"

interface ProjectListItemProps {
  project: Project
  index: number
  onProjectClick: (id: string) => void
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
  <div className="border-coolgray-900 text-coolgray-500 flex items-center gap-4 border-b py-3 text-sm font-medium">
    <div className={columnClasses.index}>#</div>
    <div className={columnClasses.name}>Name</div>
    <div className={columnClasses.category}>Category</div>
    <div className={columnClasses.socials}>Links</div>
    <div className={columnClasses.votes}>Votes</div>
  </div>
)

const PromotionalBanner = () => (
  <Link
    to="/promote"
    className="group border-coolgray-950 to-accent-1/10 hover:to-accent-1/20 flex items-center justify-between border-b bg-gradient-to-r from-blue-950/30 px-4 py-3 transition-all duration-200 hover:from-blue-950/40 hover:shadow-sm"
  >
    <div className="flex items-center gap-3">
      <div className="to-accent-1 flex h-8 w-8 flex-nowrap items-center justify-center rounded-full bg-gradient-to-tr from-blue-500">
        <Icon lucideName="Star" className="h-4 w-4 text-white" strokeWidth={2} fill="currentColor" />
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="text-sm font-medium text-white">Boost Your Project's Visibility</p>
        <p className="text-coolgray-400 text-xs">Get featured at the top of the projects list and reach more users</p>
      </div>
    </div>
    <div className="text-accent-2 group-hover:text-accent-3 flex items-center gap-2 transition-colors">
      <span className="hidden text-sm font-medium sm:inline">Learn More</span>
      <Icon lucideName="ArrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </div>
  </Link>
)

export default function ProjectsList() {
  const { toProject } = useNavigation()
  const { queryParams } = useQueryParams()
  const { data: projectsData, isLoading, error } = useProjectsQuery()

  const projects = projectsData?.data || []
  const startIndex = projectsData?.startIndex || 0
  const filteredProjects = useMemo(() => projects.filter((project) => filterBySearch(project, queryParams.q)), [projects, queryParams.q])
  const blankStyle = "text-coolgray-400 flex justify-center text-sm"

  if (isLoading) return <div className={blankStyle}>Loading...</div>
  if (error) return <div className={blankStyle}>Error loading projects. Please try again.</div>
  if (filteredProjects.length < 1) return <div className={blankStyle}>No projects found.</div>

  return (
    <main>
      <ProjectsListHeader />
      <PromotionalBanner />
      <ul className="flex flex-col" role="list">
        {filteredProjects.map((project, idx) => (
          <ProjectListItem key={project.id} project={project} index={startIndex + idx + 1} onProjectClick={toProject} />
        ))}
      </ul>
    </main>
  )
}
