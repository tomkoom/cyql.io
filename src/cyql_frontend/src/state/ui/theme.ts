import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/state/_store";

interface ThemeState {
  theme: string;
}

const initialState: ThemeState = {
  theme: "dark",
};

const theme = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme({ theme }, { payload }: PayloadAction<string>) {
      theme = payload;
    },
  },
});

export const selectTheme = (state: RootState) => state.theme.theme;

export const { setTheme } = theme.actions;
export default theme.reducer;
