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
  history.push("/apps");
};

const toApp = (id) => {
  history.push(`/apps/${id}`);
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

export { toHome, toApps, toApp, toUpcoming, toNft, toSubmit, goBack };
