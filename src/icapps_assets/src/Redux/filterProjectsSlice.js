import { createSlice } from "@reduxjs/toolkit";

const filterProjectsSlice = createSlice({
	name: "filterProjects",
	initialState: {
		openSource: { value: false },
		deployedToIc: { value: false },
		psychedelic: { value: false },
		toniqlabs: { value: false },
	},
	reducers: {
		setFilter(state, action) {
			switch (action.payload.value) {
				case "openSource":
					state.openSource.value = !state.openSource.value;
					break;
				case "deployedToIc":
					state.deployedToIc.value = !state.deployedToIc.value;
					break;
				case "psychedelic":
					state.psychedelic.value = !state.psychedelic.value;
					break;
				case "toniqlabs":
					state.toniqlabs.value = !state.toniqlabs.value;
					break;
			}
		},
	},
});

export const { setFilter } = filterProjectsSlice.actions;
export default filterProjectsSlice.reducer;