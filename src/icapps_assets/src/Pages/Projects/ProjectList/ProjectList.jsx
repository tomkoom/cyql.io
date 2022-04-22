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
import { setView } from "../../../State/view";
import { selectView } from "../../../State/view";

const AppList = ({ loading }) => {
  const dispatch = useDispatch();
  const view = useSelector(selectView);

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

      {loading ? (
        <div className="center">
          <Loader />
        </div>
      ) : (
        <div>
          <AppListRows />
          <AppListGrid />
        </div>
      )}

      <LoadMoreBtn loading={loading} />
    </section>
  );
};

export default AppList;
