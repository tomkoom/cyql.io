import { createSlice } from "@reduxjs/toolkit";

const submitInitialState = {
  category: "",
  name: "",
  description: "",

  // links
  website: "",
  app: "",
  docs: "",

  // links soc
  twitter: "",
  discord: "",
  telegram: "",
  github: "",
  medium: "",

  // links ic
  canister: "",
  dscvr: "",
  distrikt: "",
  openchat: "",

  // img
  logo: "",

  // other
  notes: "",

  // nft
  nft_units: "",
  nft_unit_price: "",
};

const submit = createSlice({
  name: "submit",
  initialState: {
    submit: submitInitialState,
  },
  reducers: {
    setSubmit(state, { payload }) {
      state.submit = payload;
    },
    setClearSubmit(state) {
      state.submit = submitInitialState;
    },
  },
});

const selectSubmit = (state) => state.submit.submit;
export { selectSubmit };

export const { setSubmit, setClearSubmit } = submit.actions;
export default submit.reducer;
