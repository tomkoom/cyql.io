import React, { FC, ChangeEvent } from "react"
import { TextInput } from "@/components/ui/_index"

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"
import { setAdminSearch, selectAdminSearch } from "@/state/admin/adminSearch"

const Search: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const searchQuery = useAppSelector(selectAdminSearch)

  const setSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setAdminSearch(e.target.value))
  }

  return (
    <div>
      <TextInput placeholder={"search by project name"} value={searchQuery} onChange={setSearch} />
    </div>
  )
}

export default Search
