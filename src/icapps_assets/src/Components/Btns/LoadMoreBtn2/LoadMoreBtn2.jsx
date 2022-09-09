import React from "react";
import css from "./LoadMoreBtn2.module.css";

// redux
import { useDispatch } from "react-redux";
import { setItemsVisible2 } from "../../../State/loadMore";

const LoadMoreBtn2 = ({ label, size }) => {
  const dispatch = useDispatch();

  return (
    <button className={css.loadMoreBtn} onClick={() => dispatch(setItemsVisible2(size))}>
      Load more {label} +{size}
    </button>
  );
};

export default LoadMoreBtn2;
