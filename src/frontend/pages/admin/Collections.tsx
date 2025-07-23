import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCategoriesQuery } from "@/hooks/queries/useCategoriesQuery"
import {
  useAddCollectionMutation,
  useCollectionsQuery,
  useRemoveCollectionMutation,
  useToggleCollectionStatusMutation,
  useUpdateCollectionMutation,
} from "@/hooks/queries/useCollectionsQuery"
import { Plus, ToggleLeft, ToggleRight, Trash2 } from "lucide-react"
import React, { useState } from "react"

export default function Collections() {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [projectIds, setProjectIds] = useState("")
  const [editingCollection, setEditingCollection] = useState<string | null>(null)

  const { data: collections = [], refetch } = useCollectionsQuery()
  const { data: categories = [] } = useCategoriesQuery()
  const addCollectionMutation = useAddCollectionMutation()
  const updateCollectionMutation = useUpdateCollectionMutation()
  const removeCollectionMutation = useRemoveCollectionMutation()
  const toggleStatusMutation = useToggleCollectionStatusMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedCategory || !projectIds.trim()) return

    const projectIdArray = projectIds
      .split(",")
      .map((id) => parseInt(id.trim()))
      .filter((id) => !isNaN(id))

    if (projectIdArray.length === 0) return

    try {
      if (editingCollection) {
        await updateCollectionMutation.mutateAsync({
          categoryId: selectedCategory,
          projectIds: projectIdArray,
        })
        setEditingCollection(null)
      } else {
        await addCollectionMutation.mutateAsync({
          categoryId: selectedCategory,
          projectIds: projectIdArray,
        })
      }

      setSelectedCategory("")
      setProjectIds("")
      refetch()
    } catch (error) {
      console.error("Error saving collection:", error)
    }
  }

  const handleEdit = (collection: any) => {
    setSelectedCategory(collection.categoryId)
    setProjectIds(collection.projectIds.join(", "))
    setEditingCollection(collection.categoryId)
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

  const getCategoryLabel = (categoryId: string) => {
    return categories.find((cat) => cat.id === categoryId)?.lbl || categoryId
  }

  return (
    <div className="space-y-6">
      {/* Add/Edit Collection Form */}
      <div className="bg-coolgray-900 border-coolgray-800 rounded-lg border p-6">
        <div className="mb-4">
          <h3 className="mb-2 text-lg font-semibold text-white">{editingCollection ? "Edit Collection" : "Add Collection"}</h3>
          <p className="text-coolgray-400 text-sm">Add projects to collections by category. Enter project IDs separated by commas.</p>
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
                placeholder="e.g., 123, 456, 789"
                value={projectIds}
                onChange={(e) => setProjectIds(e.target.value)}
                className="bg-coolgray-800 border-coolgray-700 text-white"
              />
              <p className="text-coolgray-500 text-xs">Enter project IDs separated by commas</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={!selectedCategory || !projectIds.trim()} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              {editingCollection ? "Update Collection" : "Add Collection"}
            </Button>

            {editingCollection && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditingCollection(null)
                  setSelectedCategory("")
                  setProjectIds("")
                }}
                className="border-coolgray-600 text-coolgray-300 hover:bg-coolgray-800"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </div>

      {/* Existing Collections */}
      <div className="bg-coolgray-900 border-coolgray-800 rounded-lg border p-6">
        <div className="mb-4">
          <h3 className="mb-2 text-lg font-semibold text-white">Existing Collections</h3>
          <p className="text-coolgray-400 text-sm">Manage existing collections and their status.</p>
        </div>

        {collections.length === 0 ? (
          <p className="text-coolgray-500 py-8 text-center">No collections found. Create your first collection above.</p>
        ) : (
          <div className="space-y-4">
            {collections.map((collection: any) => (
              <div key={collection.categoryId} className="bg-coolgray-800 border-coolgray-700 flex items-center justify-between rounded-lg border p-4">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <h4 className="font-medium text-white">{getCategoryLabel(collection.categoryId)}</h4>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        collection.isActive ? "border border-green-800 bg-green-900/50 text-green-400" : "border border-gray-800 bg-gray-900/50 text-gray-400"
                      }`}
                    >
                      {collection.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <p className="text-coolgray-400 text-sm">
                    Projects: {collection.projectIds.join(", ")} ({collection.projectIds.length} total)
                  </p>
                  <p className="text-coolgray-500 mt-1 text-xs">Updated: {new Date(parseInt(collection.updatedAt) / 1000000).toLocaleDateString()}</p>
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
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(collection)}
                    className="border-coolgray-600 text-coolgray-300 hover:bg-coolgray-700"
                  >
                    Edit
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
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
