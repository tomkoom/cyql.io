import React from "react";
import css from "./LoadMoreBtn.module.css";

// redux
import { useAppDispatch } from "@/hooks/useRedux";

const LoadMoreBtn = ({ label, size, setItemsVisible }) => {
  const dispatch = useAppDispatch();
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
