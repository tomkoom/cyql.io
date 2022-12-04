import React, { useEffect, useRef } from "react";
import css from "./SortOptions.module.css";

// icons
import { iCheck } from "@icons/Icons";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectSort, setSort } from "@state/projects/sort";

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
    <ul className={css.sort} ref={sortOptionsRef}>
      <li onClick={() => clickSort("date")}>
        Date added{sort === "date" && <span className={css.icon}>{iCheck}</span>}
      </li>
      <li onClick={() => clickSort("upvotes")}>
        Popularity{sort === "upvotes" && <span className={css.icon}>{iCheck}</span>}
      </li>
    </ul>
  );
};

export default SortOptions;
