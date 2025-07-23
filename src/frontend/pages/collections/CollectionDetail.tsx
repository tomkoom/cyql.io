import { ProjectCard } from "@/components"
import { Spinner } from "@/components/ui"
import { useCollectionQuery } from "@/hooks/queries/useCollectionsQuery"
import { useProjectsByIdsQuery } from "@/hooks/queries/useProjectsQuery"
import { CollectionsBreadcrumb } from "."

interface CollectionDetailProps {
  categoryId: string
  categoryLabel: string
}

export default function CollectionDetail({ categoryId, categoryLabel }: CollectionDetailProps) {
  const { data: collection, isLoading: isCollectionLoading, error: collectionError } = useCollectionQuery(categoryId)
  const projectIds = collection?.projectIds ? (collection.projectIds as string[]) : []
  const { data: projects = [], isLoading: isProjectsLoading, error: projectsError } = useProjectsByIdsQuery(projectIds)

  const isLoading = isCollectionLoading || isProjectsLoading
  const hasError = collectionError || projectsError

  return (
    <section>
      <CollectionsBreadcrumb categoryId={categoryId} categoryLabel={categoryLabel} />

      <div className="mb-6">
        <h1 className="mb-2 text-4xl font-bold text-white">{categoryLabel} Collection</h1>
        <p className="text-coolgray-400">
          {isLoading ? "Loading projects..." : `${projects.length} ${projects.length === 1 ? "project" : "projects"} in this collection`}
        </p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center gap-2 py-12">
          <span className="text-coolgray-400">Loading projects...</span>
          <Spinner />
        </div>
      )}

      {/* Error State */}
      {hasError && !isLoading && (
        <div className="rounded-lg bg-red-950/20 p-6 text-center">
          <p className="mb-2 text-red-400">Failed to load collection projects</p>
          <p className="text-coolgray-500 text-sm">Please try again later</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !hasError && projects.length === 0 && (
        <div className="bg-coolgray-950 rounded-lg p-12 text-center">
          <p className="text-coolgray-400 mb-2">No projects in this collection</p>
          <p className="text-coolgray-500 text-sm">Projects will appear here when added to the collection</p>
        </div>
      )}

      {/* Projects Grid */}
      {!isLoading && !hasError && projects.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-4 max-[480px]:grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  )
}
