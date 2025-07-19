import { Btn } from "@/components/btns"
import { useProjects } from "@/hooks"
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { selectAdmin, setAdminClearProject, setAdminCloseModal, setAdminIsLoading } from "@/state/admin/admin"
import { Project } from "@/state/types/Project"

export default function Controls() {
  const dispatch = useAppDispatch()
  const { addCuratedProject, editCuratedProject, refreshAll, refreshById } = useProjects()
  const { project, mode } = useAppSelector(selectAdmin)

  const refresh = async (project: Project): Promise<void> => {
    try {
      await refreshById(project.id)
      // await refreshAll()
    } catch (error) {
      console.error(error)
    }
  }

  const add = async (): Promise<void> => {
    dispatch(setAdminIsLoading(true))

    try {
      await addCuratedProject(project)
      await refresh(project)
      dispatch(setAdminClearProject())
      closeModal()
    } catch (error) {
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

  const closeModal = (): void => {
    dispatch(setAdminCloseModal())
  }

  return (
    <div className="mt-8 flex items-start gap-2">
      <Btn className="flex-1" btnType="secondary" text="Cancel" onClick={closeModal} />
      {mode === "add" ? (
        <Btn className="flex-1" btnType="primary" text="Add" onClick={add} />
      ) : mode === "edit" ? (
        <Btn className="flex-1" btnType="primary" text="Save" onClick={edit} />
      ) : null}
    </div>
  )
}
