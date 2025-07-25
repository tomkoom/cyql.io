import { Icon } from "@/components/Icon"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useProjects, useQueryParams } from "@/hooks"

const sortOptions = [
  { label: "Newest first", value: "newest_first" },
  { label: "Oldest first", value: "oldest_first" },
  { label: "Most upvoted", value: "most_upvoted" },
  { label: "Least upvoted", value: "least_upvoted" },
  { label: "Recently updated", value: "recently_updated" },
]

export default function Sort() {
  const { refreshPaginated } = useProjects()
  const { queryParams } = useQueryParams()
  const currentSortKey = Object.keys(queryParams.sort)[0] || sortOptions[0].value

  const handleSortChange = async (value: string) => {
    const sortValue = { [value]: null } as any

    try {
      await refreshPaginated({
        ...queryParams,
        sort: sortValue,
      })
    } catch (error) {
      console.error("Failed to update sort:", error)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Icon lucideName="ArrowUpDown" size={16} className="text-coolgray-500" />
      <span className="text-coolgray-300 text-sm">Order by:</span>

      <Select value={currentSortKey} onValueChange={handleSortChange}>
        <SelectTrigger className="border-coolgray-900 bg-coolgray-950 text-coolgray-300 hover:bg-coolgray-900 w-[140px] cursor-pointer">
          <SelectValue placeholder="Select sort" />
        </SelectTrigger>
        <SelectContent className="border-coolgray-800 bg-coolgray-950">
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value} className="text-coolgray-300 hover:bg-coolgray-900 focus:bg-coolgray-900 cursor-pointer">
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
