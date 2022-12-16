import React, { useEffect, useRef } from "react";
import css from "./FilterOptions.module.css";

// icons
import { iCheck } from "@icons/Icons";

// state
import { useDispatch } from "react-redux";

const FilterOptions = ({
  openFilterOptions,
  setOpenFilterOptions,
  filterBtnWidth,
  filterBtnRef,
  filter,
  setFilter,
}) => {
  const dispatch = useDispatch();
  const filterOptionsRef = useRef(null);
  const style = { width: `${filterBtnWidth.toString()}px` };

  const handleOutsideClick = (e) => {
    if (
      openFilterOptions &&
      filterOptionsRef.current &&
      !filterOptionsRef.current.contains(e.target) &&
      filterBtnRef.current &&
      !filterBtnRef.current.contains(e.target)
    ) {
      dispatch(setOpenFilterOptions(false));
    }
  };

  useEffect(() => {
    // bind the event listener
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      // unbind the event listener on clean up
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [openFilterOptions]);

  const clickFilter = (v) => {
    dispatch(setFilter(v));
    setOpenFilterOptions(false);
  };

  return (
    <ul style={style} className={css.filter} ref={filterOptionsRef}>
      <li onClick={() => clickFilter(null)}>
        all {filter === null && <span className={css.icon}>{iCheck}</span>}
      </li>
      <li onClick={() => clickFilter(true)}>
        true {filter === true && <span className={css.icon}>{iCheck}</span>}
      </li>
      <li onClick={() => clickFilter(false)}>
        false {filter === false && <span className={css.icon}>{iCheck}</span>}
      </li>
    </ul>
  );
};

export default FilterOptions;
