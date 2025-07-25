import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { useProjects, useQueryParams } from "@/hooks"
import { Option } from "@/state/types/Project"

interface FilterProps {
  filterId: string
  label: string
  filter: Option
}

const filterOptions = [
  { label: "All", value: "all" },
  { label: "True", value: "true" },
  { label: "False", value: "false" },
]

export default function Filter({ filterId, label, filter }: FilterProps) {
  const { refreshPaginated } = useProjects()
  const { queryParams } = useQueryParams()

  const getCurrentValue = (): string => {
    if (filter.length === 0) return "all"
    return filter[0] === true ? "true" : "false"
  }

  const convertToOption = (value: string): Option => {
    switch (value) {
      case "true":
        return [true]
      case "false":
        return [false]
      default:
        return []
    }
  }

  const handleFilterChange = async (value: string) => {
    const filterValue = convertToOption(value)

    try {
      await refreshPaginated({
        ...queryParams,
        [filterId]: filterValue,
      })
    } catch (error) {
      console.error("Failed to update filter:", error)
    }
  }

  const currentValue = getCurrentValue()
  const displayValue = currentValue === "all" ? "all" : currentValue

  return (
    <Select value={currentValue} onValueChange={handleFilterChange}>
      <SelectTrigger className="flex h-10 cursor-pointer items-center gap-1 rounded-md px-2 text-sm transition-colors">
        <span>{label}</span>
        <span className="bg-accent-1 flex h-5 items-center rounded-sm px-1 text-xs">{displayValue}</span>
      </SelectTrigger>
      <SelectContent className="border-coolgray-800 bg-coolgray-950">
        {filterOptions.map((option) => (
          <SelectItem key={option.value} value={option.value} className="text-coolgray-300 hover:bg-coolgray-900 focus:bg-coolgray-900">
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
