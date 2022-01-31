import React from "react";
import css from "./AppList.module.css";
import Loader from "../../../Components/Loader/CatLoader";

// icons
import { iBars, iTh } from "../../../Icons/Icons";

// components
import AppListRows from "./Views/AppListRows";
import AppListGrid from "./Views/AppListGrid";
import LoadMorebtn from "../../../Components/LoadMoreBtn/LoadMorebtn";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setView } from "../../../State/view";

const AppList = ({ loading, error, searchValue }) => {
  const itemsVisible = useSelector(
    (state) => state.loadMore.itemsVisible.value
  );

  const dispatch = useDispatch();
  const view = useSelector((state) => state.view.view.value);

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

      <LoadMorebtn loading={loading} />
    </section>
  );
};

export default AppList;
