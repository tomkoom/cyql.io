import type { RootState } from "@/state/_store"
import type { QueryParams } from "@/state/_types/curated_projects_types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const schema: QueryParams = {
  q: "",
  selectedPage: 1,
  itemsPerPage: 25,
  category: "All",
  openSource: [],
  onChain: [],
  sort: { newest_first: null },
}

interface QueryParamsState {
  schema: QueryParams
  queryParams: QueryParams
}

const initialState: QueryParamsState = {
  schema,
  queryParams: schema,
}

const queryParams = createSlice({
  name: "queryParams",
  initialState,
  reducers: {
    setQueryParams(state, { payload }: PayloadAction<QueryParams>) {
      state.queryParams = payload
    },
  },
})

export const selectQueryParamsSchema = (state: RootState) => state.queryParams.schema
export const selectQueryParams = (state: RootState) => state.queryParams.queryParams

export const { setQueryParams } = queryParams.actions
export default queryParams.reducer
