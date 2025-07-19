import { Loading } from "@/components/ui"
import type { Project as ProjectType } from "@/state/types/Project"
import { Project } from "."

interface HighlightedProjectsProps {
  projects: ProjectType[]
}

export default function HighlightedProjects({ projects }: HighlightedProjectsProps) {
  if (!projects || projects.length === 0) {
    return <Loading />
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-4 max-[480px]:grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]">
      {projects.slice(0, 15).map((p) => (
        <Project key={p.id.toString()} project={p} />
      ))}
    </div>
  )
}
