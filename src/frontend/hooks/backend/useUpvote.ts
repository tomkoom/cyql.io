import { API_KEY } from "@/constants/constants"
import { useAuth } from "@/context/Auth"
import { useProjects } from "@/hooks"
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { selectHome, setHomeHighlighted, setHomeMostUpvoted, setHomeNew } from "@/state/home/home"
import { setProject } from "@/state/project"
import { selectPaginated, setPaginatedData } from "@/state/projects/paginated"
import { notifySuccess, updateInHighlighted, updateInProjects } from "@/utils/index"
import { Dispatch, SetStateAction } from "react"

interface useUpvote {
  updateUpvote: (projectId: string, location: string, setIsExploding: Dispatch<SetStateAction<boolean>>, duration: number) => Promise<void>
}

export const useUpvote = () => {
  const dispatch = useAppDispatch()
  const { actor } = useAuth()
  const { updateCuratedProjectUpvote } = useProjects()

  // ...
  const paginatedProjects = useAppSelector(selectPaginated).data
  const newProjects = useAppSelector(selectHome).new
  const mostUpvoted = useAppSelector(selectHome).mostUpvoted
  const highligted = useAppSelector(selectHome).highlighted

  const updateUpvote = async (projectId: string, location: string, setIsExploding: Dispatch<SetStateAction<boolean>>, duration: number): Promise<void> => {
    try {
      const res = await updateCuratedProjectUpvote(projectId)
      const project = await actor.getProjectById(API_KEY, BigInt(projectId))

      if (project.length > 0) {
        const p = { ...project[0], id: String(project[0].id) }
        dispatch(setProject(p))

        // update paginated
        updateInProjects(p, paginatedProjects, setPaginatedData)

        // update home
        updateInProjects(p, newProjects, setHomeNew)
        updateInProjects(p, mostUpvoted, setHomeMostUpvoted)
        updateInHighlighted(p, highligted, setHomeHighlighted)

        // confetti
        notifySuccess(res)
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
