import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/state/_store"
import type { Project } from "@/state/_types/curated_projects_types"

export type HighlightedItem = { [key: string]: Project[] }

interface HomeState {
  new: Project[]
  mostUpvoted: Project[]
  highlighted: HighlightedItem
}

const initialState: HomeState = {
  new: [],
  mostUpvoted: [],
  highlighted: {
    tokens: [],
    nfts: [],
  },
}

const home = createSlice({
  name: "home",
  initialState,
  reducers: {
    setHomeNew(state, { payload }: PayloadAction<Project[]>) {
      state.new = payload
    },
    setHomeMostUpvoted(state, { payload }: PayloadAction<Project[]>) {
      state.mostUpvoted = payload
    },
    setHomeHighlighted(state, { payload }: PayloadAction<HighlightedItem>) {
      const key = Object.keys(payload)[0]
      state.highlighted[key] = payload[key]
    },
  },
})

export const selectHome = (state: RootState) => state.home

export const { setHomeNew, setHomeMostUpvoted, setHomeHighlighted } = home.actions
export default home.reducer
