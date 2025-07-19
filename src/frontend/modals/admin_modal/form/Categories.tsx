import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { selectAdmin, setAdminProjectItemArray } from "@/state/admin/admin"
import { selectCategories } from "@/state/categories/categories"

const categoryKey = "category"

export default function Categories() {
  const dispatch = useAppDispatch()
  const categories = useAppSelector(selectCategories).categoriesWithSize
  const category = useAppSelector(selectAdmin).project.category
  const copy = category.slice()

  const setCategory = (label: string): void => {
    if (copy.includes(label)) {
      const index = copy.indexOf(label)
      copy.splice(index, 1)
    } else {
      copy.push(label)
    }
    dispatch(setAdminProjectItemArray({ [categoryKey]: copy }))
  }

  return (
    <div>
      <h6 className="mb-4">
        Category <span className="text-coolgray-500">one or multiple</span>
      </h6>
      <ul className="flex flex-wrap gap-1.5">
        {categories
          .filter((c) => c.category.id !== "all")
          .map((c) => (
            <li
              key={c.category.id}
              className={`bg-coolgray-950 text-coolgray-300 hover:bg-coolgray-800 cursor-pointer rounded-md px-3 py-2 text-sm transition-all ${
                copy.includes(c.category.lbl) ? "bg-coolgray-800 text-white" : ""
              }`}
              onClick={() => setCategory(c.category.lbl)}
            >
              {c.category.lbl} {c.size.toString()}
            </li>
          ))}
      </ul>
    </div>
  )
}
