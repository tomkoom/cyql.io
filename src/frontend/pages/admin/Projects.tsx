import { Loading } from "@/components/ui"
import { useProjectsQuery } from "@/hooks/queries/useProjectsQuery"
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { AdminModal } from "@/modals"
import { selectAdmin, setAdminIsModalOpen, setAdminMode, setAdminProject } from "@/state/admin/admin"
import type { Project } from "@/state/types/curated_projects_types"
import { formatDiscord, formatStr16, formatWebsite, twitterUsername } from "@/utils/index"
import { memo } from "react"

interface Column {
  key: string
  label: string
  width?: string
}

const COLUMNS: Column[] = [
  { key: "number", label: "#", width: "w-8" },
  { key: "id", label: "id" },
  { key: "name", label: "name" },
  { key: "archived", label: "archived" },
  { key: "category", label: "category" },
  { key: "logoUrl", label: "logoUrl" },
  { key: "twitter", label: "twitter" },
  { key: "discord", label: "discord" },
]

// Memoized table row component
const ProjectRow = memo(({ project, index, onEdit }: { project: Project; index: number; onEdit: (project: Project) => void }) => {
  const formatValue = (key: string, value: any) => {
    switch (key) {
      case "name":
        return formatStr16(value)
      case "logoUrl":
        return formatWebsite(value)
      case "twitter":
        return twitterUsername(value)
      case "discord":
        return formatDiscord(value)
      case "category":
        return Array.isArray(value) ? value.join(", ").toLowerCase() : value
      case "archived":
        return value.toString()
      default:
        return value
    }
  }

  return (
    <div
      onClick={() => onEdit(project)}
      className="flex cursor-pointer items-center gap-4 py-3 transition-colors even:bg-[var(--underlay1)] hover:bg-[var(--underlay2)]"
    >
      <span className="w-8">{index + 1}</span>
      {COLUMNS.slice(1).map((col) => (
        <span key={col.key} className="flex-1 text-[0.9rem]">
          {formatValue(col.key, project[col.key as keyof Project])}
        </span>
      ))}
    </div>
  )
})

const TableHeader = () => (
  <div className="flex items-center gap-4 py-3 font-bold">
    {COLUMNS.map((col) => (
      <span key={col.key} className={`${col.width || "flex-1"} text-[0.9rem]`}>
        {col.label}
      </span>
    ))}
  </div>
)

export default function Projects() {
  const dispatch = useAppDispatch()
  const { isModalOpen, searchQProjects } = useAppSelector(selectAdmin)
  const { data: projectsData, isLoading } = useProjectsQuery()

  const handleEditProject = (project: Project): void => {
    dispatch(setAdminProject(project))
    dispatch(setAdminMode("edit"))
    dispatch(setAdminIsModalOpen(true))
  }

  const projects = searchQProjects.length > 0 ? searchQProjects : projectsData?.data || []

  if (isLoading || !projects) {
    return <Loading />
  }

  return (
    <>
      <AdminModal isOpen={isModalOpen} />
      <div className="mt-4 w-full text-base">
        <TableHeader />
        {projects.map((project, i) => (
          <ProjectRow key={project.id} project={project} index={i} onEdit={handleEditProject} />
        ))}
      </div>
    </>
  )
}
