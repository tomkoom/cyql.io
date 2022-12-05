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
import Search from "./Search/Search";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectProjects } from "@state/projects";
import { setProjectModal, setProject, setMode } from "@state/modals/projectModal";

const Projects = () => {
  const dispatch = useDispatch();
  const projects = useSelector(selectProjects);
  const [search, setSearch] = useState("");

  const editProject = (project) => {
    dispatch(setMode("edit"));
    dispatch(setProject(project));
    dispatch(setProjectModal(true));
  };

  return (
    <div className={css.projects}>
      <Search setSearch={setSearch} />

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
          .filter((p) => {
            if (search === "") {
              return p;
            } else if (p.name.toLowerCase().includes(search.toLowerCase())) {
              return p;
            }
          })
          .map((p, i) => (
            <div className={css.row} key={p.id} onClick={() => editProject(p)}>
              <div className={css.coll25}>
                <p>{projects.length - i}</p>
              </div>
              <div className={css.coll139}>
                <p>{p.id && formatStr12(p.id)}</p>
              </div>
              <div className={css.coll139}>
                <p>{p.name && formatStr16(p.name)}</p>
              </div>
              <div className={css.coll139}>
                <p>{p.slug && formatStr12(p.slug)}</p>
              </div>
              <div className={css.coll139}>
                <p>{p.category}</p>
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
