import { createSlice } from "@reduxjs/toolkit";

const searchProjects = createSlice({
	name: "searchProjects",
	initialState: {
		value: "",
	},
	reducers: {
		setSearchProjects(state, { payload }) {
			state.value = payload;
		}
	},
});

export const { setSearchProjects } = searchProjects.actions;
export default searchProjects.reducer;