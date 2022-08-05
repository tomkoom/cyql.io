import React, { useEffect, useRef } from "react";
import css from "./SortOptions.module.css";

// icons
import { iCheck } from "../../../../Icons/Icons";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectSort, setSort } from "../../../../State/sort";

const SortOptions = ({ openSort, setOpenSort, sortBtnRef }) => {
  const dispatch = useDispatch();
  const sortOptionsRef = useRef(null);
  const sort = useSelector(selectSort);

  const handleOutsideClick = (e) => {
    if (
      openSort &&
      sortOptionsRef.current &&
      !sortOptionsRef.current.contains(e.target) &&
      sortBtnRef.current &&
      !sortBtnRef.current.contains(e.target)
    ) {
      dispatch(setOpenSort(false));
    }
  };

  useEffect(() => {
    // bind the event listener
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      // unbind the event listener on clean up
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [openSort]);

  const clickSort = (sortType) => {
    dispatch(setSort(sortType));
    setOpenSort(false);
  };

  return (
    <div className={css.sort} ref={sortOptionsRef}>
      <ul>
        <li onClick={() => clickSort("date")}>
          Date added {sort === "date" && <span className={css.icon}>{iCheck}</span>}
        </li>
        <li onClick={() => clickSort("upvotes")}>
          Popularity {sort === "upvotes" && <span className={css.icon}>{iCheck}</span>}
        </li>
      </ul>
    </div>
  );
};

export default SortOptions;
