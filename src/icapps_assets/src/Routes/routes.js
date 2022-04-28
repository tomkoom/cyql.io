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

const toProfile = () => {
  history.push("/profile");
};

const toAdmin = () => {
  history.push("/admin");
};

const toAddProject = () => {
  history.push("/admin/addproject");
};

export {
  toHome,
  toApps,
  toApp,
  toUpcoming,
  toNft,
  toSubmit,
  toProfile,
  toAdmin,
  toAddProject,
  goBack,
};
