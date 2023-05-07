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

const toApp = (slug) => {
  history.push(`/projects/${slug}`);
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

export {
  toHome,
  toApps,
  toApp,
  toSubmit,
  toProfile,
  toAdmin,
  // –––
  goBack,
};
