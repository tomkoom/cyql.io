import { ProjectLogo } from "@/components"
import { useNavigation } from "@/hooks"
import { useProjectsByIdsQuery } from "@/hooks/queries/useProjectsQuery"

const HIGHLIGHTED_PROJECT_IDS = ["1754974310201"]

const FEATURED_TAGLINES: Record<string, string> = {
  // Kairos
  "1754974310201": "Bitcoin prediction markets",
}

export default function FeaturedProjectsBanner() {
  const { toProject } = useNavigation()
  const { data: projects = [] } = useProjectsByIdsQuery(HIGHLIGHTED_PROJECT_IDS)

  if (!projects || projects.length === 0) return null

  return (
    <div className="border-coolgray-950 bg-coolgray-950/40 mb-2 flex items-center gap-2 overflow-x-auto rounded-lg border px-3 py-2">
      <span className="text-coolgray-400 shrink-0 text-xs font-medium">Featured:</span>
      <div className="flex items-center gap-2">
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => toProject(project.id.toString())}
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
