import { initJuno as initJuno0, listDocs } from "@junobuild/core";

// constants
import { junoSatelliteId, junoCollectionProjects } from "@constants/constants";

// utils
import { sortByDate } from "@utils/sortByDate";
import { bigIntToNum } from "@utils/bigIntToNum";

// state
import store from "@state/_store";
import { setProjectsDocs, setProjectsDocsActive, setProjectsDocsActiveNum } from "@state/projects";

// init juno
const initJuno = async () => {
  await initJuno0({
    satelliteId: junoSatelliteId,
  }).catch((e) => console.log(e));
};

const getProjectsDocs = async () => {
  await listDocs({
    collection: junoCollectionProjects,
    filter: {},
  })
    .then((docs) => {
      const projects = docs.items
        .sort((a, b) => sortByDate(a.data.added, b.data.added))
        .map((project) => bigIntToNum(project));

      const projectsActive = projects.filter((project) => project.data.archived === false);
      const projectsActiveNum = projectsActive.length;

      store.dispatch(setProjectsDocs(projects));
      store.dispatch(setProjectsDocsActive(projectsActive));
      store.dispatch(setProjectsDocsActiveNum(projectsActiveNum));
    })
    .catch((err) => console.log(err));
};

export { initJuno, getProjectsDocs };
