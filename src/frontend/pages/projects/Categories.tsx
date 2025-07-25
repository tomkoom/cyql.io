import { Icon } from "@/components/Icon"
import { Spinner } from "@/components/ui"
import { useProjects, useQueryParams, useScrollLock } from "@/hooks"
import { useCategoriesWithSizeQuery } from "@/hooks/queries/useCategoriesQuery"
import { useEffect, useState } from "react"
import CategoriesModal from "./CategoriesModal"

export default function Categories() {
  const { refreshPaginated } = useProjects()
  const { queryParams } = useQueryParams()
  const { data: categoriesWithSize = [], isLoading } = useCategoriesWithSizeQuery()
  const { lockScroll, unlockScroll } = useScrollLock()
  const [openCategoryList, setOpenCategoryList] = useState(false)

  const topCategories = categoriesWithSize.sort((a, b) => b.size - a.size).slice(0, 12)

  useEffect(() => {
    if (openCategoryList) {
      lockScroll()
    } else {
      unlockScroll()
    }
  }, [openCategoryList])

  const setCategory = async (updatedCategory: string): Promise<void> => {
    try {
      await refreshPaginated({
        ...queryParams,
        category: updatedCategory,
      })
    } catch (error) {
      console.error("Failed to update category:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-coolgray-400 text-sm">Loading categories...</span>
        <Spinner />
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-1.5">
        {topCategories.map((c) => {
          const isActive = queryParams.category.toLowerCase() === c.category.lbl.toLowerCase()
          return (
            <button
              key={c.category.id}
              onClick={() => setCategory(c.category.lbl)}
              className={`inline-flex cursor-pointer items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-medium transition-all ${
                isActive ? "bg-accent-2 text-white" : "bg-coolgray-950 text-coolgray-300 hover:bg-coolgray-900/80 hover:text-white"
              }`}
            >
              <span>{c.category.lbl}</span>
              <span className={`rounded px-1 text-[10px] ${isActive ? "bg-accent-3 text-blue-100" : "bg-coolgray-900 text-coolgray-500"}`}>{c.size}</span>
            </button>
          )
        })}

        {categoriesWithSize.length > 12 && (
          <button
            onClick={() => setOpenCategoryList(true)}
            className="bg-coolgray-900 text-coolgray-400 hover:bg-coolgray-800 inline-flex cursor-pointer items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-medium transition-all hover:text-white"
          >
            <Icon lucideName="Ellipsis" size={14} />
            <span>More</span>
          </button>
        )}
      </div>

      {openCategoryList && <CategoriesModal openCategoryList={openCategoryList} setOpenCategoryList={setOpenCategoryList} />}
    </>
  )
}
