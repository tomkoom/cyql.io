import { createSlice } from "@reduxjs/toolkit";

const projectsFilteringSlice = createSlice({
	name: "projectsFiltering",
	initialState: {
		filteredProjects: [],
		openSource: { value: false },
		deployedToIc: { value: false },
		psychedelic: { value: false },
		toniqlabs: { value: false },
	},
	reducers: {
		setFilterByCategory(state, action) {
			state.filteredProjects = action.payload;
		},
		setFilterByTag(state, action) {
			switch (action.payload.value) {
				case "openSource":
					console.log("Open Source")
					state.openSource.value = !state.openSource.value;
					state.deployedToIc.value = false;
					state.psychedelic.value = false;
					state.toniqlabs.value = false;
					break;
				case "deployedToIc":
					console.log("Deployed To IC")
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
					state.deployedToIc.value = false;
					state.psychedelic.value = false;
					state.psychedelic.value = false;
					break;
			}
		},
	},
});

export const { setFilterByCategory, setFilterByTag } = projectsFilteringSlice.actions;
export default projectsFilteringSlice.reducer;