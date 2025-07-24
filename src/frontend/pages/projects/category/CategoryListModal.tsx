import CrossIcon from "@/components/icons/CrossIcon"
import { Spinner } from "@/components/ui"
import { Button } from "@/components/ui/button"
import { useProjects, useQueryParams } from "@/hooks"
import { useCategoriesWithSizeQuery } from "@/hooks/queries/useCategoriesQuery"
import Modal from "@/modals/Modal"
import { Dispatch, SetStateAction } from "react"

interface CategoryListModalProps {
  openCategoryList: boolean
  setOpenCategoryList: Dispatch<SetStateAction<boolean>>
}

export default function CategoryListModal({ openCategoryList, setOpenCategoryList }: CategoryListModalProps) {
  const { refreshPaginated } = useProjects()
  const { queryParams } = useQueryParams()
  const { data: categoriesWithSize = [], isLoading } = useCategoriesWithSizeQuery()

  const closeModal = () => {
    setOpenCategoryList(false)
  }

  const setCategory = async (updatedCategory: string): Promise<void> => {
    try {
      await refreshPaginated({
        ...queryParams,
        category: updatedCategory,
      })
      closeModal()
    } catch (error) {
      console.error("Failed to update category:", error)
    }
  }

  const resetFilter = async (): Promise<void> => {
    await setCategory("All")
  }

  return (
    <Modal isOpen={openCategoryList} onClose={closeModal} showCloseIcon={false}>
      <div className="w-full space-y-4 md:max-w-lg lg:max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-lg font-semibold text-white sm:text-xl">Filter by Category</h3>
          <CrossIcon onClick={closeModal} />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <span className="text-coolgray-400 text-sm">Loading categories...</span>
            <Spinner />
          </div>
        ) : (
          <>
            <div className="">
              <p className="text-coolgray-400 text-sm">
                Currently showing <span className="bg-coolgray-950 rounded-md px-2 py-1 font-medium text-white">{queryParams.category}</span>
              </p>
            </div>

            <div className="max-h-64 overflow-y-auto sm:max-h-72 md:max-h-80 lg:max-h-none">
              <div className="flex flex-wrap gap-1.5 p-1">
                {categoriesWithSize.map((c) => {
                  const isActive = queryParams.category.toLowerCase() === c.category.lbl.toLowerCase()
                  return (
                    <button
                      key={c.category.id}
                      onClick={() => setCategory(c.category.lbl)}
                      className={`inline-flex cursor-pointer items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-medium transition-all sm:px-3 sm:py-2 sm:text-sm ${
                        isActive ? "bg-accent-2 text-white" : "bg-coolgray-950 text-coolgray-300 hover:bg-coolgray-900/80 hover:text-white"
                      }`}
                    >
                      <span>{c.category.lbl}</span>
                      <span
                        className={`rounded px-1 text-[10px] sm:px-1.5 sm:text-xs ${
                          isActive ? "bg-accent-3 text-blue-100" : "bg-coolgray-900 text-coolgray-500"
                        }`}
                      >
                        {c.size}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="border-coolgray-950 flex items-center justify-between border-t pt-3">
              <span className="text-coolgray-500 text-xs sm:text-sm">{categoriesWithSize.length} categories</span>

              <div className="flex gap-2">
                {queryParams.category !== "All" && (
                  <Button variant="secondary" onClick={resetFilter} className="cursor-pointer">
                    Reset
                  </Button>
                )}
                <Button variant="accent" onClick={closeModal} className="cursor-pointer">
                  Done
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}
