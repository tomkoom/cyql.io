import React from "react";
import css from "./AppList.module.css";
import Loader from "../../../CatLoader";

// components
import AppListRows from "./Views/AppListRows";
import AppListGrid from "./Views/AppListGrid";
import LoadMorebtn from "../../../Assets/LoadMoreBtn/LoadMorebtn";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setView } from "../../../State/view";

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTh } from "@fortawesome/free-solid-svg-icons";

const iconBars = (
  <FontAwesomeIcon icon={faBars} color="rgba(255, 255, 255, 0.33)" />
);
const iconTh = (
  <FontAwesomeIcon icon={faTh} color="rgba(255, 255, 255, 0.33)" />
);

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
          {iconBars}&nbsp;&nbsp;Rows
        </button>
        <button
          className={view === "grid" ? `navlink ${css.active}` : "navlink"}
          onClick={() => dispatch(setView({ value: "grid" }))}
        >
          {iconTh}&nbsp;&nbsp;Grid
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
