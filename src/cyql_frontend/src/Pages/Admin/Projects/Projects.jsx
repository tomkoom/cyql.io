import React from "react";
import css from "./Projects.module.css";

// formatters
import {
  formatStr12,
  formatStr16,
  formatWebsite,
  getTwitterUsername,
  formatDiscord,
} from "@utils/format";

// components
import { Search } from "@components/ui-elements/index";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectProjectsDocs } from "@state/projects";
import { setProjectModal, setProjectDoc, setMode } from "@state/modals/projectModal/projectModal";
import { setAdminSearch, selectAdminSearch } from "@state/admin/adminSearch";

const Projects = () => {
  const dispatch = useDispatch();
  const projectsDocs = useSelector(selectProjectsDocs);
  const searchQuery = useSelector(selectAdminSearch);

  const setSearch = (e) => {
    dispatch(setAdminSearch(e.target.value));
  };

  const editProject = (projectDoc) => {
    dispatch(setMode("edit"));
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
          <div className={css.coll25}>#</div>
          <div className={css.coll139}>id</div>
          <div className={css.coll139}>name</div>
          <div className={css.coll139}>slug</div>
          <div className={css.coll139}>category</div>
          <div className={css.coll139}>logo</div>
          <div className={css.coll139}>twitter</div>
          <div className={css.coll139}>discord</div>
        </div>

        {projectsDocs
          .filter((project) => {
            if (searchQuery === "") {
              return project;
            } else if (project.data.name.toLowerCase().includes(searchQuery.toLowerCase())) {
              return project;
            }
          })
          .map((projectDoc, i) => (
            <div className={css.row} key={projectDoc.key} onClick={() => editProject(projectDoc)}>
              <div className={css.coll25}>{projectsDocs.length - i}</div>
              <div className={css.coll139}>{projectDoc.key}</div>
              <div className={css.coll139}>
                {projectDoc.data.name && formatStr16(projectDoc.data.name)}
              </div>
              <div className={css.coll139}>
                {projectDoc.data.slug && formatStr12(projectDoc.data.slug)}
              </div>
              <div className={css.coll139}>{projectDoc.data.category.join(", ")}</div>
              <div className={css.coll139}>
                {projectDoc.data.logo && formatWebsite(projectDoc.data.logo)}
              </div>
              <div className={css.coll139}>
                {projectDoc.data.twitter && getTwitterUsername(projectDoc.data.twitter)}
              </div>
              <div className={css.coll139}>
                {projectDoc.data.discord && formatDiscord(projectDoc.data.discord)}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Projects;
