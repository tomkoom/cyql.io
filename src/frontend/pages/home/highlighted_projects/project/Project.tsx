import { useNav } from "@/hooks"
import type { Project as ProjectType } from "@/state/_types/curated_projects_types"
import { Logo, Main } from "./_index"

interface ProjectProps {
  project: ProjectType
}

export default function Project({ project }: ProjectProps) {
  const { toProject } = useNav()

  const openProject = (id: string) => {
    toProject(id)
  }

  return (
    <div className="flex cursor-pointer items-center gap-4" onClick={() => openProject(project.id)}>
      <Logo name={project.name} logo={project.logoDataUrl} />
      <Main project={project} />
    </div>
  )
}
