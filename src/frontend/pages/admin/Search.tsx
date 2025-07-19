import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { API_KEY } from "@/constants/constants"
import { useAuth } from "@/context/Auth"
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { selectAdmin, setAdminSearchQ, setAdminSearchQProjects } from "@/state/admin/admin"
import { ChangeEvent } from "react"

export default function Search() {
  const dispatch = useAppDispatch()
  const { actor } = useAuth()
  const searchQ = useAppSelector(selectAdmin).searchQ

  const setSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setAdminSearchQ(e.target.value))
  }

  const getBySearchQ = async (searchQ: string): Promise<void> => {
    try {
      if (searchQ) {
        const res = await actor.getProjectsBySearchQ(API_KEY, searchQ)
        const serialized = res.map((p) => ({ ...p, id: String(p.id) }))
        dispatch(setAdminSearchQProjects(serialized))
      } else {
        dispatch(setAdminSearchQProjects([]))
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Input className="h-12 max-w-md" placeholder="Search by name" value={searchQ} onChange={setSearch} />
      <Button variant="secondary" className="h-12 font-bold" onClick={() => getBySearchQ(searchQ)}>
        Search
      </Button>
    </div>
  )
}
