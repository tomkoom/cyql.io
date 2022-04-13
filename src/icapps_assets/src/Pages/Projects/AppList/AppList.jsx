import React from "react";
import css from "./AppList.module.css";
import Loader from "../../../Components/Loader/CatLoader";

// icons
import { iBars, iTh } from "../../../Icons/Icons";

// components
import AppListRows from "./Views/AppListRows";
import AppListGrid from "./Views/AppListGrid";
import { LoadMoreBtn } from "../../../Components/index";


// redux
import { useDispatch, useSelector } from "react-redux";
import { setView } from "../../../State/view";
import { selectView } from "../../../State/view";
import { selectItemsVisible } from "../../../State/loadMore";

const AppList = ({ loading, error, searchValue }) => {
  const itemsVisible = useSelector(selectItemsVisible);
  const view = useSelector(selectView);
  const dispatch = useDispatch();

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
      ) : error ? (
        <p className="center">Fetch error!</p>
      ) : (
        <div>
          <AppListRows searchValue={searchValue} itemsVisible={itemsVisible} />
          <AppListGrid searchValue={searchValue} itemsVisible={itemsVisible} />
        </div>
      )}

      <LoadMoreBtn loading={loading} />
    </section>
  );
};

export default AppList;
