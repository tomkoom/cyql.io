import { Dispatch, SetStateAction } from "react"
import { useAuth } from "@/context/Auth"
import { useBackend } from "@/hooks/_index"
import { SECRET } from "@/constants/constants"
import { updateInProjects, updateInHighlighted } from "@/utils/_index"

// state
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { setProject } from "@/state/project"
import { selectPaginated, setPaginatedData } from "@/state/projects/paginated"
import { selectHome, setHomeNew, setHomeHighlighted } from "@/state/home/home"

interface useUpvote {
  updateUpvote: (projectId: string, location: string, setIsExploding: Dispatch<SetStateAction<boolean>>, duration: number) => Promise<void>
}

export const useUpvote = () => {
  const dispatch = useAppDispatch()
  const { actor } = useAuth()
  const { updateCuratedProjectUpvote } = useBackend()

  // ...
  const paginatedProjects = useAppSelector(selectPaginated).data
  const newProjects = useAppSelector(selectHome).new
  const highligted = useAppSelector(selectHome).highlighted

  const updateUpvote = async (projectId: string, location: string, setIsExploding: Dispatch<SetStateAction<boolean>>, duration: number): Promise<void> => {
    try {
      await updateCuratedProjectUpvote(projectId)
      const project = await actor.getProjectById(SECRET, BigInt(projectId))

      if (project.length > 0) {
        const p = { ...project[0], id: String(project[0].id) }
        dispatch(setProject(p))

        // update paginated
        updateInProjects(p, paginatedProjects, setPaginatedData)

        // update home
        updateInProjects(p, newProjects, setHomeNew)
        updateInHighlighted(p, highligted, setHomeHighlighted)

        // confetti
        if (location === "project_page") {
          setIsExploding(true)
          setTimeout(() => {
            setIsExploding(false)
          }, duration)
        }
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  return { updateUpvote }
}
