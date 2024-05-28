import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"
import type { QueryParams } from "@/state/_types/curated_projects_types"

const schema: QueryParams = {
  q: "",
  selectedPage: 1,
  itemsPerPage: 50,
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
