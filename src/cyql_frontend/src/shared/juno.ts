import { initJuno, listDocs } from "@junobuild/core";

// constants
import { SATELLITE_ID, PROJECTS_COLL } from "@/constants/constants";

// utils
import { sortByDate } from "@/utils/sortByDate";
import { bigIntToNum } from "@/utils/bigIntToNum";

// state
import store from "@/state/_store";
import { setProjectsDocs, setProjectsDocsActive, setProjectsDocsActiveNum } from "@/state/projects";

// init juno
const init_juno = async () => {
  await initJuno({
    SATELLITE_ID: SATELLITE_ID,
  }).catch((e) => console.log(e));
};

// update projects
const refreshProjects = async () => {
  await listDocs({
    collection: PROJECTS_COLL,
  })
    .then((docs) => {
      const projects = docs.items
        .sort((a, b) => sortByDate(a, b))
        .map((project) => bigIntToNum(project));

      const projectsActive = projects.filter((project) => project.data.archived === false);
      const projectsActiveNum = projectsActive.length;

      // set projects
      store.dispatch(setProjectsDocs(projects));
      store.dispatch(setProjectsDocsActive(projectsActive));
      store.dispatch(setProjectsDocsActiveNum(projectsActiveNum));
    })
    .catch((err) => console.log(err));
};

export { init_juno, refreshProjects };
