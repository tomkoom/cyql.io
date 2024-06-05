import { useAuth } from "@/context/Auth"
import { verifyAdmin, serializeProjectsToString, filterToSearchParam, sortToSearchParam } from "@/utils/_index"
import type { Project, ProjectId, Paginated, QueryParams } from "@/state/_types/curated_projects_types"
import { KEY } from "@/constants/constants"
import { useQueryParams } from "@/hooks/_index"
import { useLocation } from "react-router-dom"
import { bigintToNumber, sortCategoriesByNum } from "@/utils/_index"

// state
import { useAppDispatch } from "@/hooks/useRedux"
import { setActiveProjectsNum } from "@/state/curatedProjects"
import { setPaginated, setPaginatedIsLoading } from "@/state/projects/paginated"
import { setHomeHighlighted, setHomeNew } from "@/state/home/home"
import { setProject } from "@/state/project"
import { setQueryParams } from "@/state/projects/queryParams"
import { setAdminAllProjects } from "@/state/admin/admin"
import { setCategoriesWithSize } from "@/state/categories/categories"
import { setProfileUpvotedProjects } from "@/state/profile/profile"

interface UseBackend {
  refreshUserUpvotedProjects: () => Promise<void>
  refreshCategories: () => Promise<void>
  refreshAll: () => Promise<void>
  refreshPaginated: (queryParams: QueryParams) => Promise<void>
  refreshNew: () => Promise<void>
  refreshHighligted: (category: string, length: number) => Promise<void>
  refreshActiveNum: () => Promise<void>
  refreshById: (id: string) => Promise<void>
  addCuratedProject: (project: Project) => Promise<void>
  editCuratedProject: (project: Project) => Promise<void>
  updateCuratedProjectUpvote: (projectId: ProjectId) => Promise<string>
}

export const useProjects = (): UseBackend => {
  const dispatch = useAppDispatch()
  const locationPathname = useLocation().pathname
  const { actor, userId } = useAuth()
  const { updateQueryParams } = useQueryParams()

  const refreshUserUpvotedProjects = async (): Promise<void> => {
    if (!actor) return

    try {
      const res = await actor.getUserUpvotedProjects(KEY)
      const serialized = res.map((p) => ({ ...p, id: p.id.toString() }))
      dispatch(setProfileUpvotedProjects(serialized))
    } catch (error) {
      throw new Error(error)
    }
  }

  const refreshCategories = async (): Promise<void> => {
    if (!actor) return

    try {
      const res = await actor.getCategoriesWithSize(KEY)
      const sorted = sortCategoriesByNum(bigintToNumber(res))
      dispatch(setCategoriesWithSize(bigintToNumber(sorted)))
    } catch (error) {
      throw new Error(error)
    }
  }

  const refreshAll = async (): Promise<void> => {
    if (!actor) return

    try {
      const res = await actor.getAllProjects(KEY)
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
        secret: KEY,
        ...queryParams,
        selectedPage: BigInt(queryParams.selectedPage),
        itemsPerPage: BigInt(queryParams.itemsPerPage),
      })

      if (res.length > 0) {
        const serializedData = serializeProjectsToString(res[0].data)
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

  const refreshNew = async (): Promise<void> => {
    if (!actor) return

    try {
      const res = await actor.getNewProjects(KEY, BigInt(24))
      const serialized = res.map((p) => ({ ...p, id: p.id.toString() }))
      dispatch(setHomeNew(serialized))
    } catch (error) {
      throw new Error(error)
    }
  }

  const refreshHighligted = async (category: string, length: number): Promise<void> => {
    if (!actor) return

    try {
      const str = category
      const replacement = "_"
      var key = str.replace(/\//g, replacement).toLowerCase() // change slashes to underscores
      key = key.replace(" ", "_") // change spaces to underscores
      const res = await actor.getHighlightedProjects(KEY, category, BigInt(length))
      const serialized = res.map((p) => ({ ...p, id: p.id.toString() }))
      dispatch(setHomeHighlighted({ [key as string]: serialized }))
    } catch (error) {
      throw new Error(error)
    }
  }

  const refreshActiveNum = async (): Promise<void> => {
    if (!actor) return

    try {
      const res = await actor.getActiveProjectsNum(KEY)
      dispatch(setActiveProjectsNum(Number(res)))
    } catch (error) {
      throw new Error(error)
    }
  }

  const refreshById = async (id: string): Promise<void> => {
    if (!actor) return

    try {
      const res = await actor.getProjectById(KEY, BigInt(id))
      if (res.length > 0) {
        dispatch(setProject({ ...res[0], id: res[0].id.toString() }))
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  const addCuratedProject = async (project: Project): Promise<void> => {
    if (!actor) return
    if (!verifyAdmin(userId)) return
    if (project.id) return

    try {
      await actor.addProject({
        ...project,
        id: BigInt(0), // placeholder id
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

  const updateCuratedProjectUpvote = async (projectId: ProjectId): Promise<string> => {
    if (!actor) return

    try {
      const id = BigInt(projectId)
      const res = await actor.updateUpvote(KEY, id)
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
    refreshNew,
    refreshHighligted,
    refreshActiveNum,
    refreshById,

    // ...
    addCuratedProject,
    editCuratedProject,
    updateCuratedProjectUpvote,
  }
}
