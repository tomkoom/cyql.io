import { history } from "./history";

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

const toApp = (id) => {
  history.push(`/projects/${id}`);
};

const toUpcoming = () => {
  history.push("/upcoming");
};

const toNft = () => {
  history.push("/nft");
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
  toNft,
  toSubmit,
  toJobs,
  toPostJob,
  toProfile,
  toAdmin,
  goBack,
};
