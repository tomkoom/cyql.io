import { UpvoteBtn } from "@/components/btns"
import { useNav, useProjectsQuery, useQueryParams } from "@/hooks"
import type { Project } from "@/state/types/Project"
import { useMemo } from "react"
import { Main, Socials, SocialsIc, Tags } from "."
import { filterBySearch } from "../utils"

interface ProjectListItemProps {
  project: Project
  onProjectClick: (id: string) => void
}

const ProjectListItem = ({ project, onProjectClick }: ProjectListItemProps) => (
  <li
    role="button"
    tabIndex={0}
    onKeyDown={(e) => e.key === "Enter" && onProjectClick(project.id.toString())}
    onClick={() => onProjectClick(project.id.toString())}
    className="border-coolgray-950 hover:bg-coolgray-950 focus:bg-coolgray-950 flex cursor-pointer items-center justify-between gap-4 border-b py-2 transition-colors focus:outline-none"
  >
    <div className="flex-auto sm:flex-[calc(70%-1rem)] md:flex-[50%]">
      <Main project={project} />
    </div>

    <div className="hidden sm:flex sm:flex-[calc(30%-1rem)] md:flex-[20%]">
      <Tags category={project.category} />
    </div>

    <div className="hidden md:flex md:flex-[15%]">
      <Socials project={project} />
    </div>

    <div className="hidden md:flex md:flex-[15%]">
      <SocialsIc project={project} />
    </div>

    <div onClick={(e) => e.stopPropagation()}>
      <UpvoteBtn projectId={project.id.toString()} btnLocation={"project_list"} upvotedBy={project.upvotedBy} />
    </div>
  </li>
)

export default function ProjectsList() {
  const { toProject } = useNav()
  const { queryParams } = useQueryParams()
  const { data: projectsData, isLoading, error } = useProjectsQuery()

  const projects = projectsData?.data || []
  const filteredProjects = useMemo(() => projects.filter((project) => filterBySearch(project, queryParams.q)), [projects, queryParams.q])

  if (isLoading) return <div className="text-coolgray-400 flex justify-center text-sm">Loading...</div>
  if (error) return <div className="text-coolgray-400 flex justify-center text-sm">Error loading projects. Please try again.</div>
  if (filteredProjects.length < 1) return <div className="text-coolgray-400 flex justify-center text-sm">No projects found.</div>

  return (
    <main>
      <ul className="mt-2 flex flex-col" role="list">
        {filteredProjects.map((project) => (
          <ProjectListItem key={project.id} project={project} onProjectClick={toProject} />
        ))}
      </ul>
    </main>
  )
}
