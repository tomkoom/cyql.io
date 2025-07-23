import { Spinner } from "@/components/ui"
import { useCategoriesQuery } from "@/hooks/queries/useCategoriesQuery"
import { useActiveCollectionsQuery } from "@/hooks/queries/useCollectionsQuery"
import { useSearchParams } from "react-router-dom"
import { CollectionBlock, CollectionDetail, CollectionsBreadcrumb } from "."

const TITLE = "Collections"
const DESCRIPTION = "Collections of projects Featured by category"

export default function Collections() {
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedCategoryId = searchParams.get("category")

  const { data: collections = [], isLoading, error } = useActiveCollectionsQuery()
  const { data: categories = [] } = useCategoriesQuery()

  const getCategoryLabel = (categoryId: string) => {
    const category = (categories as any[]).find((cat) => cat.id === categoryId)
    return category?.lbl || categoryId
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
        <div className="mb-6">
          <h1 className="text- 4xl mb-2 font-bold text-white">{TITLE}</h1>
          <p className="text-coolgray-400">{DESCRIPTION}</p>
        </div>
        <div className="flex items-center justify-center gap-2">
          Loading... <Spinner />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 py-8">
        <CollectionsBreadcrumb />
        <div className="mb-6">
          <h1 className="text- 4xl mb-2 font-bold text-white">{TITLE}</h1>
          <p className="text-coolgray-400">{DESCRIPTION}</p>
        </div>
        <div className="rounded-lg bg-red-950/20 p-6 text-center">
          <p className="mb-2 text-red-400">Failed to load collections</p>
          <p className="text-coolgray-500 text-sm">Please try again later</p>
        </div>
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

      <div className="mb-6">
        <h1 className="mb-2 text-4xl font-black text-white">{TITLE}</h1>
        <p className="text-coolgray-400">{DESCRIPTION}</p>
      </div>

      {activeCollections.length === 0 ? (
        <div className="bg-coolgray-950 rounded-lg p-12 text-center">
          <p className="text-coolgray-400 mb-2">No collections available</p>
          <p className="text-coolgray-500 text-sm">Collections will appear here once they are created and activated</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {activeCollections.map((collection: any) => (
            <CollectionBlock
              key={collection.categoryId}
              collection={collection}
              categoryLabel={getCategoryLabel(collection.categoryId)}
              onClick={() => handleCollectionClick(collection.categoryId)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
