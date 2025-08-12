import { Icon } from "@/components/Icon"
import ProjectLogoLetter from "@/components/ProjectLogoLetter"
import { useState } from "react"

interface ProjectLogo {
  id: string
  logoUrl: string
  name: string
}

interface Collection {
  categoryId: string
  projectIds: string[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface CollectionStats {
  totalUpvotes: number
  onChainCount: number
  openSourceCount: number
}

interface CollectionBlockProps {
  collection: Collection
  categoryLabel: string
  projectLogos: ProjectLogo[]
  collectionStats: CollectionStats
  isRecentlyUpdated: boolean
  onClick: () => void
}

const ProjectLogo = ({ project }: { project: ProjectLogo }) => {
  const [imageError, setImageError] = useState(false)
  const hasLogo = project.logoUrl && project.logoUrl.trim() !== ""

  if (!hasLogo || imageError) {
    return (
      <div className="border-coolgray-900 h-12 w-12 rounded-full border">
        <ProjectLogoLetter size="46px" name={project.name} />
      </div>
    )
  }

  return (
    <img
      src={project.logoUrl}
      alt={project.name}
      className="bg-coolgray-950 border-coolgray-900 h-12 w-12 rounded-full border object-cover"
      onError={() => setImageError(true)}
    />
  )
}

export default function CollectionBlock({ collection, categoryLabel, projectLogos, collectionStats, isRecentlyUpdated, onClick }: CollectionBlockProps) {
  const remainingCount = Math.max(0, collection.projectIds.length - projectLogos.length)

  return (
    <div className="bg-coolgray-950/80 hover:bg-coolgray-900 cursor-pointer rounded-3xl p-5 transition-colors" onClick={onClick}>
      <div className="mb-3 flex items-baseline justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-3xl font-bold text-white">{categoryLabel}</h3>
          {isRecentlyUpdated && <span className="rounded-full bg-green-900/30 px-2 py-1 text-xs text-green-400">New</span>}
        </div>

        <p className="text-coolgray-400 text-sm">
          {collection.projectIds.length} {collection.projectIds.length === 1 ? "project" : "projects"}
        </p>
      </div>

      {/* Project logos preview */}
      {projectLogos.length > 0 && (
        <div className="mb-3 flex items-center gap-1">
          <div className="flex -space-x-2">
            {projectLogos.slice(0, 12).map((project, index) => (
              <div key={project.id} className="relative" style={{ zIndex: index + 1 }}>
                <ProjectLogo project={project} />
              </div>
            ))}
          </div>
          {remainingCount > 0 && <span className="text-coolgray-500 ml-2 text-xs">+{remainingCount} more</span>}
        </div>
      )}

      {/* Collection stats */}
      <div className="flex items-center justify-between">
        <div className="text-coolgray-400 flex items-center gap-1 text-xs">
          <span>
            <Icon lucideName="ArrowUp" size={16} strokeWidth={2.5} />
          </span>
          <span>{collectionStats.totalUpvotes} upvotes</span>
        </div>

        <div className="text-coolgray-500 flex items-center gap-3 text-xs">
          <span>{collectionStats.onChainCount} on-chain</span>
          <span>{collectionStats.openSourceCount} open-source</span>
        </div>
      </div>

      {/* <div className="text-coolgray-500 text-xs">Updated {new Date(parseInt(collection.updatedAt) / 1000000).toLocaleDateString()}</div> */}
    </div>
  )
}
