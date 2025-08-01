import { API_KEY } from "@/constants/constants"
import { useAuth } from "@/context/Auth"
import { useQueryParams } from "@/hooks"
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { selectAdmin, setAdminAllProjects } from "@/state/admin/admin"
import { setCategoriesWithSize } from "@/state/categories/categories"
import { setActiveProjectsNum } from "@/state/curatedProjects"
import { setHomeHighlighted, setHomeMostUpvoted, setHomeNew } from "@/state/home/home"
import { setIsLoading } from "@/state/loading"
import { setProfileUpvotedProjects } from "@/state/profile/profile"
import { setProject } from "@/state/project"
import { setPaginated, setPaginatedIsLoading } from "@/state/projects/paginated"
import { setQueryParams } from "@/state/projects/queryParams"
import type { Paginated, Project, ProjectId, QueryParams } from "@/state/types/Project"
import { bigintToNumber, bigintToString, filterToSearchParam, sortCategoriesByNum, sortToSearchParam, verifyAdmin } from "@/utils/index"
import { useLocation } from "react-router-dom"

interface UseBackend {
  refreshUserUpvotedProjects: () => Promise<void>
  refreshCategories: () => Promise<void>
  refreshAll: () => Promise<void>
  refreshPaginated: (queryParams: QueryParams) => Promise<void>

  // home
  refreshNew: (length?: number) => Promise<void>
  refreshMostUpvoted: (length?: number) => Promise<void>
  refreshHighligted: (category: string, length?: number) => Promise<void>

  // project
  refreshById: (id: ProjectId) => Promise<Project>
  getRelated: (projectId: ProjectId, length?: number) => Promise<Project[]>

  // ...
  refreshActiveNum: () => Promise<void>
  addCuratedProject: (project: Project) => Promise<void>
  editCuratedProject: (project: Project) => Promise<void>
  removeCuratedProject: (projectId: ProjectId) => Promise<void>
  updateCuratedProjectUpvote: (id: ProjectId) => Promise<string>
}

export const useProjects = (): UseBackend => {
  const dispatch = useAppDispatch()
  const locationPathname = useLocation().pathname
  const { actor, userId } = useAuth()
  const { updateQueryParams } = useQueryParams()
  const { projectId } = useAppSelector(selectAdmin)

  const refreshUserUpvotedProjects = async (): Promise<void> => {
    if (!actor) return

    try {
      const res = await actor.getUserUpvotedProjects(API_KEY)
      const serialized = res.map((p) => ({ ...p, id: p.id.toString() }))
      dispatch(setProfileUpvotedProjects(serialized))
    } catch (error) {
      throw new Error(error)
    }
  }

  const refreshCategories = async (): Promise<void> => {
    if (!actor) return

    try {
      const res = await actor.getCategoriesWithSize(API_KEY)
      const sorted = sortCategoriesByNum(bigintToNumber(res))
      dispatch(setCategoriesWithSize(bigintToNumber(sorted)))
    } catch (error) {
      throw new Error(error)
    }
  }

  const refreshAll = async (): Promise<void> => {
    if (!actor) return

    try {
      const res = await actor.getAllProjects(API_KEY)
      const serialized = res.map((p) => ({ ...p, id: p.id.toString() }))
      dispatch(setAdminAllProjects(serialized))
    } catch (error) {
      throw new Error(error)
    }
  }

  // get paginated
  const refreshPaginated = async (queryParams: QueryParams): Promise<void> => {
    if (!actor) return

    dispatch(setPaginatedIsLoading(true))
    try {
      const res = await actor.getProjects({
        secret: API_KEY,
        ...queryParams,
        selectedPage: BigInt(queryParams.selectedPage),
        itemsPerPage: BigInt(queryParams.itemsPerPage),
      })

      if (res.length > 0) {
        const serializedData = bigintToString(res[0].data)
        const selectedPage = Number(res[0].selectedPage)
        const itemsPerPage = Number(res[0].itemsPerPage)

        const paginated: Paginated = {
          data: serializedData,

          // pagination
          selectedPage,
          itemsPerPage,
          startIndex: Number(res[0].startIndex),
          endIndex: Number(res[0].endIndex),
          totalItems: Number(res[0].totalItems),
          totalPages: Number(res[0].totalPages),
        }

        // set query params if on /projects page
        if (locationPathname === "/projects") {
          const q = res[0].q
          const category = res[0].category
          const openSource = filterToSearchParam(res[0].openSource)
          const onChain = filterToSearchParam(res[0].onChain)
          const sort = sortToSearchParam(res[0].sort)
          updateQueryParams({
            q,
            selectedPage: selectedPage.toString(),
            itemsPerPage: itemsPerPage.toString(),
            category,
            openSource,
            onChain,
            sort,
          })

          // set params state
          dispatch(
            setQueryParams({
              q,
              selectedPage: selectedPage,
              itemsPerPage: itemsPerPage,
              category,
              openSource: res[0].openSource,
              onChain: res[0].onChain,
              sort: res[0].sort,
            })
          )
        }

        // set paginated data
        dispatch(setPaginated(paginated))
      } else {
        console.log(res)
      }
    } catch (error) {
      throw new Error(error)
    } finally {
      dispatch(setPaginatedIsLoading(false))
    }
  }

  // homepage

  const refreshNew = async (length: number = 15): Promise<void> => {
    if (!actor) return

    try {
      const res = await actor.getNewProjects(API_KEY, BigInt(length))
      const serialized = res.map((p) => ({ ...p, id: p.id.toString() }))
      dispatch(setHomeNew(serialized))
    } catch (error) {
      throw new Error(error)
    }
  }

  const refreshMostUpvoted = async (length: number = 10): Promise<void> => {
    if (!actor) return

    try {
      const res = await actor.getMostUpvotedProjects(API_KEY, BigInt(length))
      const serialized = res.map((p) => ({ ...p, id: p.id.toString() }))
      dispatch(setHomeMostUpvoted(serialized))
    } catch (error) {
      throw new Error(error)
    }
  }

  const refreshHighligted = async (category: string, length: number = 16): Promise<void> => {
    if (!actor) return

    try {
      const str = category
      const replacement = "_"
      var key = str.replace(/\//g, replacement).toLowerCase() // change slashes to underscores
      key = key.replace(" ", "_") // change spaces to underscores
      const res = await actor.getHighlightedProjects(API_KEY, category, BigInt(length))
      const serialized = res.map((p) => ({ ...p, id: p.id.toString() }))
      dispatch(setHomeHighlighted({ [key as string]: serialized }))
    } catch (error) {
      throw new Error(error)
    }
  }

  // ...

  const refreshActiveNum = async (): Promise<void> => {
    if (!actor) return

    try {
      const res = await actor.getActiveProjectsNum(API_KEY)
      dispatch(setActiveProjectsNum(Number(res)))
    } catch (error) {
      throw new Error(error)
    }
  }

  // project page

  const refreshById = async (id: string): Promise<Project> => {
    if (!actor) return

    try {
      dispatch(setIsLoading(true))
      const res = await actor.getProjectById(API_KEY, BigInt(id))
      if (res.length > 0) {
        const project = { ...res[0], id: res[0].id.toString() }
        dispatch(setProject({ ...project, id: project.id.toString() }))
        return project
      }
    } catch (error) {
      throw new Error(error)
    } finally {
      dispatch(setIsLoading(false))
    }
  }

  const getRelated = async (id: ProjectId, length: number = 16): Promise<Project[]> => {
    if (!actor) return

    try {
      dispatch(setIsLoading(true))
      const res = await actor.getRelatedProjects(API_KEY, BigInt(id), BigInt(length))
      const serialized = res.map((p) => ({ ...p, id: p.id.toString() }))
      // dispatch(setProjectRelated(serialized))
      return serialized
    } catch (error) {
      throw new Error(error)
    } finally {
      dispatch(setIsLoading(false))
    }
  }

  const addCuratedProject = async (project: Project): Promise<void> => {
    if (!actor) return
    if (!verifyAdmin(userId)) return

    // Use projectId from state if available, otherwise generate one
    const finalProjectId = projectId ? parseInt(projectId) : Date.now()

    try {
      await actor.addProject({
        ...project,
        id: BigInt(finalProjectId),
        createdAt: String(Date.now()),
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  const editCuratedProject = async (project: Project): Promise<void> => {
    if (!actor) return
    if (!verifyAdmin(userId)) return
    if (!project.id) return

    try {
      const id = BigInt(project.id)
      const p = {
        ...project,
        id,
        updatedAt: String(Date.now()),
      }
      await actor.editProject(id, p)
    } catch (error) {
      throw new Error(error)
    }
  }

  const removeCuratedProject = async (projectId: ProjectId): Promise<void> => {
    if (!actor) return
    if (!verifyAdmin(userId)) return

    try {
      const id = BigInt(projectId)
      await actor.removeProjectWithLogo(id)
    } catch (error) {
      throw new Error(error)
    }
  }

  const updateCuratedProjectUpvote = async (projectId: ProjectId): Promise<string> => {
    if (!actor) return

    try {
      const id = BigInt(projectId)
      const res = await actor.updateUpvote(API_KEY, id)
      return res
    } catch (error) {
      throw new Error(error)
    }
  }

  return {
    refreshUserUpvotedProjects,
    refreshCategories,
    refreshAll,
    refreshPaginated,

    // home
    refreshNew,
    refreshMostUpvoted,
    refreshHighligted,

    // project
    refreshById,
    getRelated,

    // ...
    refreshActiveNum,
    addCuratedProject,
    editCuratedProject,
    removeCuratedProject,
    updateCuratedProjectUpvote,
  }
}
