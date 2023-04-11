import React, { useState } from "react";
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
import { selectJunoProjects } from "@state/junoProjects";
import { setProjectModal, setProject, setMode } from "@state/modals/projectModal";
import { setAdminSearch, selectAdminSearch } from "@state/admin/adminSearch";

const Projects = () => {
  const dispatch = useDispatch();
  const projects = useSelector(selectJunoProjects);
  const searchQuery = useSelector(selectAdminSearch);

  const setAdminSearch = (e) => {
    dispatch(setAdminSearch(e.target.value));
  };

  const editProject = (project) => {
    dispatch(setMode("edit"));
    dispatch(setProject(project));
    dispatch(setProjectModal(true));
  };

  return (
    <div className={css.projects}>
      <Search
        placeholder={"search by project name"}
        searchQuery={searchQuery}
        setSearch={setAdminSearch}
      />

      <div className={css.table}>
        <div className={css.rowHeader}>
          <div className={css.coll25}>
            <p>#</p>
          </div>
          <div className={css.coll139}>
            <p>Id</p>
          </div>
          <div className={css.coll139}>
            <p>Name</p>
          </div>
          <div className={css.coll139}>
            <p>Slug</p>
          </div>
          <div className={css.coll139}>
            <p>Category</p>
          </div>
          <div className={css.coll139}>
            <p>Logo</p>
          </div>
          <div className={css.coll139}>
            <p>Twitter</p>
          </div>
          <div className={css.coll139}>
            <p>Discord</p>
          </div>
        </div>

        {projects
          .filter((project) => {
            if (searchQuery === "") {
              return project;
            } else if (project.name.toLowerCase().includes(searchQuery.toLowerCase())) {
              return project;
            }
          })
          .map((p, i) => (
            <div className={css.row} key={p.__id__} onClick={() => editProject(p)}>
              <div className={css.coll25}>
                <p>{projects.length - i}</p>
              </div>
              <div className={css.coll139}>
                <p>{p.__id__ && formatStr12(p.__id__)}</p>
              </div>
              <div className={css.coll139}>
                <p>{p.name && formatStr16(p.name)}</p>
              </div>
              <div className={css.coll139}>
                <p>{p.slug && formatStr12(p.slug)}</p>
              </div>
              <div className={css.coll139}>
                <p>{p.category.join(", ")}</p>
              </div>
              <div className={css.coll139}>
                <p>{p.logo && formatWebsite(p.logo)}</p>
              </div>
              <div className={css.coll139}>{p.twitter && getTwitterUsername(p.twitter)}</div>
              <div className={css.coll139}>
                <p>{p.discord && formatDiscord(p.discord)}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Projects;
