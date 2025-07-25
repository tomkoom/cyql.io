import { Button } from "@/components/ui/button"
import { useProjects } from "@/hooks"
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { selectAdmin, setAdminClearProject, setAdminCloseModal, setAdminIsLoading } from "@/state/admin/admin"
import { Project } from "@/state/types/Project"
import { useState } from "react"

export default function Controls() {
  const dispatch = useAppDispatch()
  const { addCuratedProject, editCuratedProject, removeCuratedProject, refreshById } = useProjects()
  const { project, mode, projectId } = useAppSelector(selectAdmin)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const refresh = async (project: Project): Promise<void> => {
    try {
      await refreshById(project.id)
    } catch (error) {
      console.error(error)
    }
  }

  const add = async (): Promise<void> => {
    console.log("Adding project with ID:", projectId)
    console.log("Project data:", project)
    dispatch(setAdminIsLoading(true))

    try {
      await addCuratedProject(project)
      await refresh(project)
      dispatch(setAdminClearProject())
      closeModal()
    } catch (error) {
      console.error("Failed to add project:", error)
      throw new Error(error)
    } finally {
      dispatch(setAdminIsLoading(false))
    }
  }

  const edit = async (): Promise<void> => {
    dispatch(setAdminIsLoading(true))

    try {
      await editCuratedProject(project)
      await refresh(project)
      closeModal()
    } catch (error) {
      throw new Error(error)
    } finally {
      dispatch(setAdminIsLoading(false))
    }
  }

  const remove = async (): Promise<void> => {
    if (!project.id) return

    dispatch(setAdminIsLoading(true))

    try {
      await removeCuratedProject(project.id)
      dispatch(setAdminClearProject())
      closeModal()
    } catch (error) {
      console.error("Failed to remove project:", error)
      throw new Error(error)
    } finally {
      dispatch(setAdminIsLoading(false))
      setShowDeleteConfirm(false)
    }
  }

  const closeModal = (): void => {
    dispatch(setAdminCloseModal())
    setShowDeleteConfirm(false)
  }

  const canSubmit = project.name.trim() !== "" && project.description.trim() !== ""

  return (
    <div className="mt-8 flex flex-col gap-2">
      {mode === "add" && projectId && (
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Project ID: <span className="font-mono-default">{projectId}</span>
          </p>
          {project.logoUrl && <p className="text-sm text-green-600">✓ Logo uploaded to assets canister</p>}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="bg-coolgray-950/50 mb-4 flex w-full flex-col rounded-md p-4 text-center">
          <p className="mb-3 text-sm text-red-400">
            Are you sure you want to delete "<strong>{project.name}</strong>"? This action cannot be undone.
          </p>
          <div className="flex gap-2 self-center">
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
              Cancel
            </Button>
            <Button variant="accent" onClick={remove}>
              Delete Project
            </Button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-center gap-2">
        <Button variant="outline" onClick={closeModal}>
          Cancel
        </Button>

        {mode === "add" ? (
          <Button variant="accent" onClick={add} disabled={!canSubmit}>
            Add Project
          </Button>
        ) : mode === "edit" ? (
          <>
            <Button variant="outline" className="bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-600" onClick={() => setShowDeleteConfirm(true)}>
              Remove
            </Button>
            <Button variant="accent" onClick={edit}>
              Save
            </Button>
          </>
        ) : null}
      </div>

      {!canSubmit && mode === "add" && <p className="text-center text-sm text-orange-600">Please fill in at least the project name and description</p>}
    </div>
  )
}
