import { Spinner } from "@/components/ui"
import { useCategoriesQuery } from "@/hooks/queries/useCategoriesQuery"
import { useActiveCollectionsQuery } from "@/hooks/queries/useCollectionsQuery"
import { useProjectsByIdsQuery } from "@/hooks/queries/useProjectsQuery"
import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import { CollectionBlock, CollectionDetail, CollectionsBreadcrumb } from "."

const TITLE = "Collections"
const DESCRIPTION = "Collections of projects featured by category"

export default function Collections() {
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedCategoryId = searchParams.get("category")
  const { data: collections = [], isLoading, error } = useActiveCollectionsQuery()
  const { data: categories = [] } = useCategoriesQuery()

  // Get all unique project IDs from all collections for batch fetching
  const allProjectIds = useMemo(() => {
    const activeCollections = (collections as any[]).filter((collection) => collection.isActive)
    const allIds = activeCollections.flatMap((collection) => collection.projectIds.slice(0, 6)) // Limit to first 6 for preview
    return [...new Set(allIds)] // Remove duplicates
  }, [collections])

  // Fetch all projects in one batch query
  const { data: projects = [] } = useProjectsByIdsQuery(allProjectIds)

  // Create a lookup map for quick project access
  const projectsMap = useMemo(() => {
    return projects.reduce(
      (acc, project) => {
        acc[project.id] = project
        return acc
      },
      {} as Record<string, any>
    )
  }, [projects])

  const getCategoryLabel = (categoryId: string) => {
    const category = (categories as any[]).find((cat) => cat.id === categoryId)
    return category?.lbl || categoryId
  }

  const getCollectionLogos = (projectIds: string[]) => {
    return projectIds
      .slice(0, 6) // Show max 6 logos
      .map((id) => projectsMap[id])
      .filter(Boolean) // Remove undefined projects
      .map((project) => ({
        id: project.id,
        logoUrl: project.logoUrl,
        name: project.name,
      }))
  }

  const getCollectionStats = (projectIds: string[]) => {
    const collectionProjects = projectIds.map((id) => projectsMap[id]).filter(Boolean)

    const totalUpvotes = collectionProjects.reduce((sum, project) => sum + (project.upvotedBy?.length || 0), 0)
    const onChainCount = collectionProjects.filter((p) => p.frontendCanisterId && p.frontendCanisterId.trim() !== "").length
    const openSourceCount = collectionProjects.filter((p) => p.github && p.github.trim() !== "").length

    return {
      totalUpvotes,
      onChainCount,
      openSourceCount,
    }
  }

  const isRecentlyUpdated = (updatedAt: string) => {
    const updatedTime = parseInt(updatedAt) / 1000000 // Convert to milliseconds
    const now = Date.now()
    const daysDiff = (now - updatedTime) / (1000 * 60 * 60 * 24)
    return daysDiff <= 7 // Updated within last 7 days
  }

  const handleCollectionClick = (categoryId: string) => {
    setSearchParams({ category: categoryId })
  }

  const handleBackToCollections = () => {
    setSearchParams({})
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 py-8">
        <CollectionsBreadcrumb />
        <header className="mb-6">
          <h1 className="text- 4xl mb-2 font-bold text-white">{TITLE}</h1>
          <p className="text-coolgray-400">{DESCRIPTION}</p>
        </header>
        <main className="flex items-center justify-center gap-2">
          Loading... <Spinner />
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 py-8">
        <CollectionsBreadcrumb />
        <header className="mb-6">
          <h1 className="text- 4xl mb-2 font-bold text-white">{TITLE}</h1>
          <p className="text-coolgray-400">{DESCRIPTION}</p>
        </header>
        <main className="rounded-lg bg-red-950/20 p-6 text-center">
          <p className="mb-2 text-red-400">Failed to load collections</p>
          <p className="text-coolgray-500 text-sm">Please try again later</p>
        </main>
      </div>
    )
  }

  const activeCollections = (collections as any[]).filter((collection) => collection.isActive)

  // Show individual collection detail
  if (selectedCategoryId) {
    const categoryLabel = getCategoryLabel(selectedCategoryId)
    return (
      <div className="mx-auto max-w-[1440px] px-4 py-8">
        <CollectionDetail categoryId={selectedCategoryId} categoryLabel={categoryLabel} />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8">
      <CollectionsBreadcrumb />

      <header className="mb-6">
        <h1 className="mb-2 text-4xl font-black text-white">{TITLE}</h1>
        <p className="text-coolgray-400">{DESCRIPTION}</p>
      </header>

      {activeCollections.length === 0 ? (
        <main className="bg-coolgray-950 rounded-lg p-12 text-center">
          <p className="text-coolgray-400 mb-2">No collections available</p>
        </main>
      ) : (
        <main className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {activeCollections.map((collection: any) => (
            <CollectionBlock
              key={collection.categoryId}
              collection={collection}
              categoryLabel={getCategoryLabel(collection.categoryId)}
              projectLogos={getCollectionLogos(collection.projectIds)}
              collectionStats={getCollectionStats(collection.projectIds)}
              isRecentlyUpdated={isRecentlyUpdated(collection.updatedAt)}
              onClick={() => handleCollectionClick(collection.categoryId)}
            />
          ))}
        </main>
      )}
    </div>
  )
}
