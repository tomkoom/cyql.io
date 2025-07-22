import { ProjectCard } from "@/components"
import { useRelatedProjectsQuery } from "@/hooks"
import { shuffle } from "@/utils/index"
import { useMemo } from "react"
import { useParams } from "react-router-dom"

export default function RelatedProjects() {
  const { id } = useParams<{ id: string }>()
  const { data: relatedProjects, isLoading, isError } = useRelatedProjectsQuery(id)

  const filteredAndShuffled = useMemo(() => {
    if (!relatedProjects) return []

    const filtered = relatedProjects.filter((p) => p.id !== id)
    return shuffle(filtered.slice())
  }, [relatedProjects, id])

  const displayedProjects = useMemo(() => filteredAndShuffled.slice(0, 12), [filteredAndShuffled])

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

      <div className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-4" role="list">
        {displayedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
