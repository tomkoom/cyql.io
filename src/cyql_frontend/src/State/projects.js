import { createSlice } from "@reduxjs/toolkit";

// const doc = { created_at: 0n, data: {}, key: "", owner: "", updated_at: 0n };
// const projectsDocs = [doc];

const o = { abs: "" };
// project document
const projectDoc = {
  created_at: 0n,
  data: {
    // main
    name: "",
    slug: "",
    categories: [],
    description: "",

    // main links
    website: "",
    canister: "",
    logo: "",

    // socials
    twitter: "",
    discord: "",
    telegram: "",
    github: "",
    medium: "",

    // socials ic
    dscvr: "",
    distrikt: "",
    openchat: "",
    taggr: "",
    seers: "",
    nuance: "",
    catalyze: "",

    // additional
    app: "",
    docs: "",
    faq: "",
    whitepaper: "",
    crowdfunding: "",
    verified: null,
    grantee: null,

    // nft
    nft_sale_status: "",
    nft_sale_date: "",
    nft_units: "",
    nft_unit_price: "",
    nft_market_url: "",
    nft_sale_url: "",
    nft_rarity_checker: "",
    nft_example_img_1: "",
    nft_example_img_2: "",
    nft_example_img_3: "",
    nft_example_img_4: "",

    // meta
    added: null,
    edited: null,

    // token
    has_token: null,
    // tokenName: "",
    // tokenSymbol: "",
    // tokenLogo: "",
    // tokenCanisterId: "",
    // tokenMarkets: [],
    // tokenSupply: "",
    // tokenMaxSupply: "",

    // upvotes
    upvotes: [],
  },
  key: "", // string
  updated_at: 0n, // bigint
};

const projects = createSlice({
  name: "projects",
  initialState: {
    projectsDocs: [],
    projectsNum: 0,
  },
  reducers: {
    setProjectsDocs(state, { payload }) {
      state.projectsDocs = payload;
    },
    setProjectsNum(state, { payload }) {
      state.projectsNum = payload;
    },
  },
});

const selectProjectsDocs = (state) => state.projects.projectsDocs;
const selectProjectsNum = (state) => state.projects.projectsNum;
export { selectProjectsDocs, selectProjectsNum };

export const { setProjectsDocs, setProjectsNum } = projects.actions;
export default projects.reducer;
