import { Icon } from "@/components/Icon"
import { useQueryParams } from "@/hooks"

export default function CategoryBtn() {
  const { queryParams } = useQueryParams()

  return (
    <button className="bg-coolgray-950 text-coolgray-300 hover:bg-coolgray-900 flex h-10 cursor-pointer items-center gap-1 rounded-md px-2 text-sm transition-colors">
      Category:
      <span className="bg-accent-1 flex h-5 items-center rounded-sm px-1 text-xs text-white">{queryParams.category}</span>
      <Icon lucideName="ChevronDown" className="text-coolgray-500" size={16} />
    </button>
  )
}
