import { CollectionsBreadcrumb } from "."

export default function CollectionDetail({ categoryId, categoryLabel }: { categoryId: string; categoryLabel: string }) {
  return (
    <div>
      <CollectionsBreadcrumb categoryId={categoryId} categoryLabel={categoryLabel} />

      <div className="mb-6">
        {/* <h1 className="mb-2 text-4xl font-bold text-white">Featured in {categoryLabel}</h1> */}
        <h1 className="mb-2 text-4xl font-bold text-white">{categoryLabel} Collection</h1>
        <p className="text-coolgray-400">Projects in this collection</p>
      </div>

      {/* Placeholder for project grid */}
      <div className="bg-coolgray-950 rounded-lg p-8 text-center">
        <p className="text-coolgray-400 mb-2">Project grid will be displayed here</p>
        <p className="text-coolgray-500 text-sm">Integration with ProjectCard component coming soon</p>
      </div>
    </div>
  )
}
