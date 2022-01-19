import React, { useState } from "react";
import css from "./AppList.module.css";
import Loader from "../../../CatLoader";

// redux
import { useDispatch } from "react-redux";
import { setView } from "../../../Redux/viewSlice";

// components
import AppListRows from "./Views/AppListRows";
import AppListGrid from "./Views/AppListGrid";

const AppList = ({ loading, error, searchValue }) => {
  const [itemsVisible, setItemsVisible] = useState(36);
  const showMoreItems = () => {
    setItemsVisible((prevValue) => prevValue + 36);
  };

  const dispatch = useDispatch();

  return (
    <section className={css.appList}>
      <div className={css.viewbtns}>
        <button
          className="navlink"
          onClick={() => dispatch(setView({ value: "rows" }))}
        >
          Rows
        </button>
        <button
          className="navlink"
          onClick={() => dispatch(setView({ value: "grid" }))}
        >
          Grid
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
