import { createSlice } from "@reduxjs/toolkit";

const searchProjectsSlice = createSlice({
	name: "searchProjects",
	initialState: {
		value: "",
	},
	reducers: {
		setSearchProjects(state, action) {
			state.value = action.payload;
		}
	},
});

export const { setSearchProjects } = searchProjectsSlice.actions;
export default searchProjectsSlice.reducer;