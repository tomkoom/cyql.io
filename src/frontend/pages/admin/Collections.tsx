import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCategoriesQuery } from "@/hooks/queries/useCategoriesQuery"
import {
  useAddCollectionMutation,
  useCollectionsQuery,
  useRemoveCollectionMutation,
  useRemoveProjectFromCollectionMutation,
  useToggleCollectionStatusMutation,
  useUpdateCollectionMutation,
} from "@/hooks/queries/useCollectionsQuery"
import { ExternalLink, Plus, ToggleLeft, ToggleRight, Trash2, X } from "lucide-react"
import React, { useState } from "react"
import { Link } from "react-router-dom"

export default function Collections() {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [projectIds, setProjectIds] = useState("")

  const { data: collections = [], refetch } = useCollectionsQuery()
  const { data: categories = [] } = useCategoriesQuery()
  const addCollectionMutation = useAddCollectionMutation()
  const updateCollectionMutation = useUpdateCollectionMutation()
  const removeCollectionMutation = useRemoveCollectionMutation()
  const toggleStatusMutation = useToggleCollectionStatusMutation()
  const removeProjectMutation = useRemoveProjectFromCollectionMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedCategory || !projectIds.trim()) return

    // Simple conversion like useProjectQuery.ts: BigInt(projectId)
    const projectIdArray = projectIds
      .split(",")
      .map((id) => id.trim())
      .filter((id) => id.length > 0)
      .map((id) => BigInt(id))

    if (projectIdArray.length === 0) return

    try {
      // Backend will automatically create new collection or add to existing
      await addCollectionMutation.mutateAsync({
        categoryId: selectedCategory,
        projectIds: projectIdArray,
      })

      setSelectedCategory("")
      setProjectIds("")
      refetch()
    } catch (error) {
      console.error("Error adding to collection:", error)
    }
  }

  const handleRemove = async (categoryId: string) => {
    if (confirm(`Are you sure you want to remove the collection for ${categoryId}?`)) {
      try {
        await removeCollectionMutation.mutateAsync(categoryId)
        refetch()
      } catch (error) {
        console.error("Error removing collection:", error)
      }
    }
  }

  const handleToggleStatus = async (categoryId: string) => {
    try {
      await toggleStatusMutation.mutateAsync(categoryId)
      refetch()
    } catch (error) {
      console.error("Error toggling collection status:", error)
    }
  }

  const handleRemoveProject = async (categoryId: string, projectId: string) => {
    if (confirm(`Are you sure you want to remove project ${projectId} from this collection?`)) {
      try {
        await removeProjectMutation.mutateAsync({
          categoryId,
          projectId: BigInt(projectId),
        })
        refetch()
      } catch (error) {
        console.error("Error removing project from collection:", error)
      }
    }
  }

  const getCategoryLabel = (categoryId: string) => {
    return categories.find((cat) => cat.id === categoryId)?.lbl || categoryId
  }

  return (
    <div className="space-y-6">
      {/* Add Projects to Collection Form */}
      <div className="bg-coolgray-900 border-coolgray-800 rounded-lg border p-6">
        <div className="mb-4">
          <h3 className="mb-2 text-lg font-semibold text-white">Add Projects to Collection</h3>
          <p className="text-coolgray-400 text-sm">Add projects to a category collection. If the collection doesn't exist, it will be created automatically.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-coolgray-300 text-sm font-medium">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.lbl}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-coolgray-300 text-sm font-medium">Project IDs</label>
              <Input
                type="text"
                placeholder="e.g., 1752042275462426532, 456, 789"
                value={projectIds}
                onChange={(e) => setProjectIds(e.target.value)}
                className="bg-coolgray-800 border-coolgray-700 text-white"
              />
              <p className="text-coolgray-500 text-xs">Enter project IDs separated by commas (supports large numbers)</p>
            </div>
          </div>

          <Button type="submit" disabled={!selectedCategory || !projectIds.trim()} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            Add to Collection
          </Button>
        </form>
      </div>

      {/* Existing Collections */}
      <div className="bg-coolgray-900 border-coolgray-800 rounded-lg border p-6">
        <div className="mb-4">
          <h3 className="mb-2 text-lg font-semibold text-white">Collections</h3>
          <p className="text-coolgray-400 text-sm">
            Existing collections with clickable project IDs to visit project pages. Click the X to remove individual projects.
          </p>
        </div>

        {(collections as any[]).length === 0 ? (
          <p className="text-coolgray-500 py-8 text-center">No collections found. Create your first collection above.</p>
        ) : (
          <div className="space-y-4">
            {(collections as any[]).map((collection: any) => (
              <div key={collection.categoryId} className="bg-coolgray-800 border-coolgray-700 rounded-lg border p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-white">{getCategoryLabel(collection.categoryId)}</h4>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        collection.isActive ? "border border-green-800 bg-green-900/50 text-green-400" : "border border-gray-800 bg-gray-900/50 text-gray-400"
                      }`}
                    >
                      {collection.isActive ? "Active" : "Inactive"}
                    </span>
                    <span className="text-coolgray-500 text-xs">({(collection.projectIds as string[]).length} projects)</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleStatus(collection.categoryId)}
                      className="border-coolgray-600 text-coolgray-300 hover:bg-coolgray-700 flex items-center gap-1"
                    >
                      {collection.isActive ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
                      {collection.isActive ? "Disable" : "Enable"}
                    </Button>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemove(collection.categoryId)}
                      className="flex items-center gap-1 bg-red-600 hover:bg-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </Button>
                  </div>
                </div>

                {/* Clickable Project IDs with Remove Buttons */}
                <div className="space-y-2">
                  <p className="text-coolgray-400 text-sm">Projects:</p>
                  <div className="flex flex-wrap gap-2">
                    {(collection.projectIds as string[]).map((projectId: string) => (
                      <div
                        key={projectId}
                        className="bg-coolgray-700 hover:bg-coolgray-600 border-coolgray-600 group inline-flex items-center gap-1 rounded-md border px-3 py-1 text-sm transition-colors"
                      >
                        <Link to={`/projects/${projectId}`} className="text-blue-400 transition-colors hover:text-blue-300">
                          {projectId}
                        </Link>
                        <ExternalLink className="h-3 w-3 text-blue-400 group-hover:text-blue-300" />
                        <button
                          onClick={() => handleRemoveProject(collection.categoryId, projectId)}
                          className="ml-1 text-red-400 transition-colors hover:text-red-300"
                          title="Remove project from collection"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-coolgray-500 mt-3 text-xs">Updated: {new Date(parseInt(collection.updatedAt) / 1000000).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
