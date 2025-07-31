import { Button } from "@/components/ui/button"
import { useAppDispatch } from "@/hooks/useRedux"
import { setAdminIsModalOpen, setAdminMode } from "@/state/admin/admin"
import { Projects, Search } from "."

export default function AdminProjects() {
  const dispatch = useAppDispatch()

  const openAdminModal = () => {
    dispatch(setAdminMode("add"))
    dispatch(setAdminIsModalOpen(true))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Projects</h3>
        <Button variant="accent" className="h-11 font-bold" onClick={openAdminModal}>
          Add Project
        </Button>
      </div>

      <Search />
      <Projects />
    </div>
  )
}
