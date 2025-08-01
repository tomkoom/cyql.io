import { ProjectCard, UnifiedBreadcrumb } from "@/components"
import { Spinner } from "@/components/ui"
import { ROUTES } from "@/constants"
import { useCollectionQuery } from "@/hooks/queries/useCollectionsQuery"
import { useProjectsByIdsQuery } from "@/hooks/queries/useProjectsQuery"

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

  const breadcrumbItems = [
    { label: "Collections", href: ROUTES.COLLECTIONS },
    { label: categoryLabel, isCurrentPage: true },
  ]

  return (
    <section>
      <UnifiedBreadcrumb items={breadcrumbItems} />

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
