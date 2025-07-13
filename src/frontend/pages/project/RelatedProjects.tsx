import { LogoLetter } from "@/components/ui"
import { useNav, useRelatedProjectsQuery } from "@/hooks"
import type { Project } from "@/state/types/curated_projects_types"
import { shuffle } from "@/utils/index"
import { useCallback, useMemo } from "react"
import { useParams } from "react-router-dom"

interface ProjectCardProps {
  project: Project
  onClick: () => void
}

function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <li onClick={onClick} className="group bg-coolgray-950/50 hover:bg-coolgray-950/80 cursor-pointer rounded-lg transition-all">
      <div className="flex items-center gap-4 p-4">
        {project.logoDataUrl ? (
          <img src={project.logoDataUrl} alt={`${project.name} logo`} className="h-18 w-18 shrink-0 rounded-3xl object-cover" />
        ) : (
          <LogoLetter size="4.5rem" borderRadius="2.25rem" name={project.name} />
        )}

        <div>
          <p className="group-hover:text-accent-3 line-clamp-1 leading-[150%] font-bold transition-all">{project.name}</p>
          <p className="text-coolgray-400 text-sm leading-[150%] font-medium">{project.category.join(", ").toLowerCase()}</p>
          <p className="text-coolgray-600 line-clamp-2 text-sm leading-[150%] break-words">{project.description}</p>
        </div>
      </div>
    </li>
  )
}

export default function RelatedProjects() {
  const { id } = useParams<{ id: string }>()
  const { toProject } = useNav()
  const { data: relatedProjects, isLoading, isError } = useRelatedProjectsQuery(id)

  const filteredAndShuffled = useMemo(() => {
    if (!relatedProjects) return []

    const filtered = relatedProjects.filter((p) => p.id !== id)
    return shuffle(filtered.slice())
  }, [relatedProjects, id])

  const displayedProjects = useMemo(() => filteredAndShuffled.slice(0, 12), [filteredAndShuffled])

  const handleProjectClick = useCallback(
    (projectId: string) => {
      toProject(projectId)
    },
    [toProject]
  )

  if (isLoading) {
    return (
      <div>
        <h4 className="mb-8 text-center text-2xl font-bold">More Projects Like This</h4>
        <div className="text-coolgray-500 p-8 text-center">Loading related projects...</div>
      </div>
    )
  }

  if (isError) {
    return (
      <div>
        <h4 className="mb-8 text-center text-2xl font-bold">More Projects Like This</h4>
        <div className="p-8 text-center text-red-500" role="alert">
          Unable to load related projects
        </div>
      </div>
    )
  }

  if (displayedProjects.length < 1) {
    return null
  }

  return (
    <section>
      <h4 className="mb-8 text-center text-2xl font-bold">More Projects Like This</h4>

      <ul className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-4" role="list">
        {displayedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} onClick={() => handleProjectClick(project.id)} />
        ))}
      </ul>
    </section>
  )
}
