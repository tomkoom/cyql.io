import React, { useState } from "react";
import css from "./AppList.module.css";
import Loader from "../../../CatLoader";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setView } from "../../../State/viewSlice";

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTh } from "@fortawesome/free-solid-svg-icons";

const iconBars = (
  <FontAwesomeIcon icon={faBars} color="rgba(255, 255, 255, 0.33)" />
);
const iconTh = (
  <FontAwesomeIcon icon={faTh} color= "rgba(255, 255, 255, 0.33)" />
);

// components
import AppListRows from "./Views/AppListRows";
import AppListGrid from "./Views/AppListGrid";

const AppList = ({ loading, error, searchValue }) => {
  const [itemsVisible, setItemsVisible] = useState(36);
  const showMoreItems = () => {
    setItemsVisible((prevValue) => prevValue + 36);
  };

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
      {loading ? null : (
        <div className={css.appList__loadMoreBtn}>
          <button onClick={showMoreItems}>
            Load more projects &#40;+36&#41;
          </button>
        </div>
      )}
    </section>
  );
};

export default AppList;
