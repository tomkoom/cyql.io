import React, { FC, ChangeEvent } from "react"
import { TextInput2 } from "@/components/ui/_index"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import { selectAdmin, setAdminSearchQ } from "@/state/admin/admin"

const Search: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const searchQ = useAppSelector(selectAdmin).searchQ

  const setSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setAdminSearchQ(e.target.value))
  }

  return <TextInput2 placeholder={"Search by project name"} value={searchQ} onChange={setSearch} />
}

export default Search
