import { useAppSelector } from "@/hooks/useRedux"
import { selectAdmin } from "@/state/admin/admin"

export default function Header() {
  const project = useAppSelector(selectAdmin).project

  return (
    <div className="flex items-center">
      {project.id ? (
        <div className="flex items-center gap-2">
          <h5>Edit {project.name}</h5>
          <span className="bg-coolgray-950 rounded-md p-2 text-sm">id: {project.id}</span>
        </div>
      ) : (
        <div className="flex items-center">
          <h5>Add new project</h5>
        </div>
      )}
    </div>
  )
}
