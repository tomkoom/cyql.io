import { Button } from "@/components/ui/button"
import { useAppDispatch } from "@/hooks/useRedux"
import { setAdminIsModalOpen, setAdminMode } from "@/state/admin/admin"
import { Projects, Search } from "."

export default function Admin() {
  const dispatch = useAppDispatch()

  const openAdminModal = () => {
    dispatch(setAdminMode("add"))
    dispatch(setAdminIsModalOpen(true))
  }

  return (
    <div className="laptop:px-4">
      <header className="flex flex-col">
        <div className="flex items-center justify-between">
          <h2 className="pageTitle">Admin</h2>
          <Button variant="accent" className="h-11 font-bold" onClick={openAdminModal}>
            Add Project
          </Button>
        </div>
        <Search />
      </header>
      <main>
        <Projects />
      </main>
    </div>
  )
}
