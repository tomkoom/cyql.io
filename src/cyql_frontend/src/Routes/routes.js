import { history } from "./history.js";

const goBack = () => {
  if (history.length > 2) {
    history.goBack();
  } else {
    history.push("/");
  }
};

const toHome = () => {
  history.push("/");
};

const toApps = () => {
  history.push("/projects");
};

const toApp = (slug) => {
  history.push(`/projects/${slug}`);
};

const toUpcoming = () => {
  history.push("/upcoming");
};

const toSubmit = () => {
  history.push("/submit");
};

const toJobs = () => {
  history.push("/jobs");
};

const toPostJob = () => {
  history.push("/jobs/post");
};

// const toNft = () => {
//   history.push("/nft");
// };

const toProfile = () => {
  history.push("/profile");
};

const toAdmin = () => {
  history.push("/admin");
};

export {
  toHome,
  toApps,
  toApp,
  toUpcoming,
  toSubmit,
  toJobs,
  toPostJob,
  // toNft,
  toProfile,
  toAdmin,
  // –––
  goBack,
};
