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
import { setProjectModal, setProject, setMode } from "@state/modals/projectModal/projectModal";
import { setAdminSearch, selectAdminSearch } from "@state/admin/adminSearch";

const Projects = () => {
  const dispatch = useDispatch();
  const projects = useSelector(selectProjectsDocs);
  const searchQuery = useSelector(selectAdminSearch);

  const setSearch = (e) => {
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
        setSearch={setSearch}
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
            } else if (project.data.name.toLowerCase().includes(searchQuery.toLowerCase())) {
              return project;
            }
          })
          .map((p, i) => (
            <div className={css.row} key={p.key} onClick={() => editProject(p)}>
              <div className={css.coll25}>
                <p>{projects.length - i}</p>
              </div>
              <div className={css.coll139}>
                <p>{p.key}</p>
              </div>
              <div className={css.coll139}>
                <p>{p.data.name && formatStr16(p.data.name)}</p>
              </div>
              <div className={css.coll139}>
                <p>{p.data.slug && formatStr12(p.data.slug)}</p>
              </div>
              <div className={css.coll139}>
                <p>{p.data.category.join(", ")}</p>
              </div>
              <div className={css.coll139}>
                <p>{p.data.logo && formatWebsite(p.data.logo)}</p>
              </div>
              <div className={css.coll139}>{p.data.twitter && getTwitterUsername(p.data.twitter)}</div>
              <div className={css.coll139}>
                <p>{p.data.discord && formatDiscord(p.data.discord)}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Projects;
