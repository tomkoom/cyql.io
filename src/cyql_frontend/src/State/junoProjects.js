import { createSlice } from "@reduxjs/toolkit";

const junoProjects = createSlice({
  name: "junoProjects",
  initialState: {
    junoProjects: [],
  },
  reducers: {
    setJunoProjects(state, { payload }) {
      state.junoProjects = payload;
    },
  },
});

const selectJunoProjects = (state) => state.junoProjects.junoProjects;
export { selectJunoProjects };

export const { setJunoProjects } = junoProjects.actions;
export default junoProjects.reducer;
