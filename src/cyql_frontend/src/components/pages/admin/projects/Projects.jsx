import React from "react";
import css from "./Projects.module.css";

// formatters
import { formatStr12, formatStr16, formatWebsite, formatDiscord } from "@/utils/format";
import { twitterUsername } from "@/utils/twitterUsername";

// components
import { Search } from "@/components/ui/_index";

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { selectProjects } from "@/state/projects";
import { setProjectModal, setProjectDoc } from "@/state/modals/projectModal/projectModal";
import { setAdminSearch, selectAdminSearch } from "@/state/admin/adminSearch";

const Projects = () => {
  const dispatch = useAppDispatch();
  const projectsDocs = useAppSelector(selectProjects);
  const searchQuery = useAppSelector(selectAdminSearch);

  const setSearch = (e) => {
    dispatch(setAdminSearch(e.target.value));
  };

  const editProject = (projectDoc) => {
    dispatch(setProjectDoc(projectDoc));
    dispatch(setProjectModal(true));
  };

  return (
    <div className={css.projects}>
      <Search
        placeholder={"search by project name"}
        searchQuery={searchQuery}
        setSearch={setSearch}
      />

      <div className={css.table}>
        <div className={css.rowHeader}>
          <span>#</span>
          <span>id</span>
          <span>name</span>
          <span>slug</span>
          <span>archived</span>
          <span>category</span>
          <span>logo</span>
          <span>twitter</span>
          <span>discord</span>
        </div>

        {projectsDocs
          .filter((projectDoc) => {
            if (searchQuery === "") {
              return projectDoc;
            } else if (projectDoc.data.name.toLowerCase().includes(searchQuery.toLowerCase())) {
              return projectDoc;
            }
          })
          .map((projectDoc, i) => (
            <div className={css.row} key={projectDoc.key} onClick={() => editProject(projectDoc)}>
              <span className={css.projecDocNum}>{projectsDocs.length - i}</span>
              <span>{projectDoc.key}</span>
              <span>{projectDoc.data.name && formatStr16(projectDoc.data.name)}</span>
              <span>{projectDoc.data.slug && formatStr12(projectDoc.data.slug)}</span>
              <span>{projectDoc.data.archived.toString()}</span>
              <span>{projectDoc.data.categories.join(", ").toLowerCase()}</span>
              <span>{projectDoc.data.logo && formatWebsite(projectDoc.data.logo)}</span>
              <span>{projectDoc.data.twitter && twitterUsername(projectDoc.data.twitter)}</span>
              <span>{projectDoc.data.discord && formatDiscord(projectDoc.data.discord)}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Projects;
