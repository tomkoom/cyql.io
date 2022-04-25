import React from "react";
import css from "./ProjectList.module.css";
import Loader from "../../../Components/Loader/Loader";

// icons
import { iBars, iTh } from "../../../Icons/Icons";

// components
import AppListRows from "./Views/AppListRows";
import AppListGrid from "./Views/AppListGrid";
import { LoadMoreBtn } from "../../../Components/";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setView, selectView } from "../../../State/view";
import { selectProjects } from "../../../State/projects";

const AppList = () => {
  const dispatch = useDispatch();
  const view = useSelector(selectView);
  const projects = useSelector(selectProjects);

  return (
    <section className={css.appList}>
      <div className={css.viewbtns}>
        <button
          className={view === "rows" ? `navlink ${css.active}` : "navlink"}
          onClick={() => dispatch(setView({ value: "rows" }))}
        >
          <span>{iBars}</span>&nbsp;&nbsp;Rows
        </button>
        <button
          className={view === "grid" ? `navlink ${css.active}` : "navlink"}
          onClick={() => dispatch(setView({ value: "grid" }))}
        >
          <span>{iTh}</span>&nbsp;&nbsp;Grid
        </button>
      </div>

      {!projects.length ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div>
          <AppListRows />
          <AppListGrid />
        </div>
      )}

      <LoadMoreBtn />
    </section>
  );
};

export default AppList;
