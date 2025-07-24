import { useScrollLock } from "@/hooks"
import { useEffect, useState } from "react"
import { CategoryBtn, CategoryListModal } from "."

export default function Category() {
  const { lockScroll, unlockScroll } = useScrollLock()
  const [openCategoryList, setOpenCategoryList] = useState(false)

  useEffect(() => {
    if (openCategoryList) {
      lockScroll()
    } else {
      unlockScroll()
    }
  }, [openCategoryList])

  return (
    <div className="flex self-start">
      <div onClick={() => setOpenCategoryList((prev) => !prev)}>
        <CategoryBtn />
      </div>

      {openCategoryList && <CategoryListModal openCategoryList={openCategoryList} setOpenCategoryList={setOpenCategoryList} />}
    </div>
  )
}
