import React from "react";
import css from "./LoadMoreBtn.module.css";

// redux
import { useDispatch } from "react-redux";
import { setItemsVisible } from "../../../state/loadMore";

const LoadMoreBtn = ({ loading }) => {
  const dispatch = useDispatch();

  return (
    <div>
      {loading ? null : (
        <button className={css.loadMoreBtn} onClick={() => dispatch(setItemsVisible())}>
          Load more projects &#40;+36&#41;
        </button>
      )}
    </div>
  );
};

export default LoadMoreBtn;
