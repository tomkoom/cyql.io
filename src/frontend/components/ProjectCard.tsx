import { Icon } from "@/components/Icon"
import { iCircleNodes, iGithub } from "@/components/icons/Icons"
import { useNavigation } from "@/hooks"
import type { Project as ProjectType } from "@/state/types/Project"
import { ProjectLogo } from "."

interface ProjectCardProps {
  project: ProjectType
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { toProject } = useNavigation()
  const { name, upvotedBy, category, frontendCanisterId, github, description } = project
  const upvotesNum = upvotedBy.length

  return (
    <div
      className="group bg-coolgray-950/50 hover:bg-coolgray-950 flex cursor-pointer flex-col gap-3 rounded-3xl p-4 transition-colors"
      onClick={() => toProject(project.id)}
    >
      <div className="flex items-start gap-3">
        <ProjectLogo project={project} sizeRem="4rem" />
        <div className="w-full">
          <div className="flex items-baseline justify-between gap-1">
            <h4 className="group-hover:text-accent-3 line-clamp-1 font-bold text-wrap transition-colors">{name}</h4>
            {upvotesNum > 0 && (
              <p className="flex items-center gap-1 rounded-sm bg-lime-500/10 px-1 py-0.5 text-xs font-bold text-lime-500 tabular-nums">
                <Icon lucideName="ArrowUp" size={14} strokeWidth={2} /> {upvotesNum}
              </p>
            )}
          </div>
          <p className="text-coolgray-500 line-clamp-2 text-sm font-light">{description}</p>
        </div>
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-1">
          <ul className="flex flex-wrap items-center gap-1">
            {category.map((category) => (
              <li key={category} className="bg-coolgray-900/60 text-coolgray-300 font-mono-default flex h-[22px] items-center rounded-sm px-1 text-xs">
                {category}
              </li>
            ))}
          </ul>

          {(frontendCanisterId || github) && (
            <ul className="flex flex-wrap items-center gap-1">
              {frontendCanisterId && (
                <li className="bg-coolgray-900/60 text-coolgray-300 font-mono-default flex h-[22px] items-center gap-1 rounded-sm px-1 text-xs">
                  <span className="text-sm">{iCircleNodes}</span> On-Chain
                </li>
              )}
              {github && (
                <li className="bg-coolgray-900/60 text-coolgray-300 font-mono-default flex h-[22px] items-center gap-1 rounded-sm px-1 text-xs">
                  <span className="text-sm">{iGithub}</span> Open-Source
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
