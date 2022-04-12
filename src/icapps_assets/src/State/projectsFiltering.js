import { createSlice } from "@reduxjs/toolkit";

const projectsFilteringSlice = createSlice({
  name: "projectsFiltering",
  initialState: {
    filteredByCategory: [],
    filteredByTag: [],
    openSource: { value: false },
    deployedToIc: { value: false },
    psychedelic: { value: false },
    toniqlabs: { value: false },
  },
  reducers: {
    setFilterByCategory(state, action) {
      state.filteredByCategory = action.payload;
      state.filteredByTag = action.payload;
    },
    setFilterByTag(state, action) {
      switch (action.payload.value) {
        case "openSource":
          state.openSource.value = !state.openSource.value;
          state.deployedToIc.value = false;
          state.psychedelic.value = false;
          state.toniqlabs.value = false;
          break;

        case "deployedToIc":
          state.deployedToIc.value = !state.deployedToIc.value;
          state.openSource.value = false;
          state.psychedelic.value = false;
          state.toniqlabs.value = false;
          break;

        case "psychedelic":
          state.psychedelic.value = !state.psychedelic.value;
          state.openSource.value = false;
          state.deployedToIc.value = false;
          state.toniqlabs.value = false;
          break;

        case "toniqlabs":
          state.toniqlabs.value = !state.toniqlabs.value;
          state.openSource.value = false;
          state.deployedToIc.value = false;
          state.psychedelic.value = false;
          break;
      }
    },
  },
});

export const { setFilterByCategory, setFilterByTag } = projectsFilteringSlice.actions;
export default projectsFilteringSlice.reducer;
