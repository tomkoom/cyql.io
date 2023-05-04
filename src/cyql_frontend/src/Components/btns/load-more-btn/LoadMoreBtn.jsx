import React from "react";
import css from "./LoadMoreBtn.module.css";

// redux
import { useDispatch } from "react-redux";

const LoadMoreBtn = ({ label, size, setItemsVisible }) => {
  const dispatch = useDispatch();
  const setItems = () => {
    dispatch(setItemsVisible(size));
  };

  return (
    <button className={css.loadMoreBtn} onClick={setItems}>
      Load more {label} +{size}
    </button>
  );
};

export default LoadMoreBtn;
