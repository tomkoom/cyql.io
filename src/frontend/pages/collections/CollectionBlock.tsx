interface CollectionBlockProps {
  collection: {
    categoryId: string
    projectIds: string[]
    isActive: boolean
    createdAt: string
    updatedAt: string
  }
  categoryLabel: string
  onClick: () => void
}

export default function CollectionBlock({ collection, categoryLabel, onClick }: CollectionBlockProps) {
  return (
    <div className="bg-coolgray-950 hover:bg-coolgray-900 cursor-pointer rounded-lg p-4 transition-colors" onClick={onClick}>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{categoryLabel}</h3>
      </div>

      <p className="text-coolgray-400 mb-3 text-sm">
        {collection.projectIds.length} {collection.projectIds.length === 1 ? "project" : "projects"}
      </p>

      <div className="text-coolgray-500 text-xs">Updated {new Date(parseInt(collection.updatedAt) / 1000000).toLocaleDateString()}</div>
    </div>
  )
}
