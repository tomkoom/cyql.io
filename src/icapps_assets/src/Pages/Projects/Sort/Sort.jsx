import React, { useRef, useEffect } from "react";
import css from "./Sort.module.css";

// icons
import { iAngleDown, iCheck } from "../../../Icons/Icons";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectSort, setSort, selectSortModal, setSortModal } from "../../../State/sort";

const Sort = () => {
  const dispatch = useDispatch();
  const sort = useSelector(selectSort);
  const sortModal = useSelector(selectSortModal);

  const dropdownRef = useRef(null);

  const handleOutsideClick = (e) => {
    if (sortModal && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      dispatch(setSortModal(false));
    }
  };

  useEffect(() => {
    // bind the event listener
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      // unbind the event listener on clean up
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [sortModal]);

  const handleSelect = (select) => {
    dispatch(setSort(select));
    dispatch(setSortModal(false));
  };

  return (
    <div className={css.sort}>
      {!sortModal ? (
        <button className={css.sortBtn} onClick={() => dispatch(setSortModal(true))}>
          <p className={css.orderBy}>Order by: </p>
          <p className={css.sortBtnOpt}>
            {sort === "date" && "Date added"}
            {sort === "upvotes" && "Popularity"}
            <span className={css.angleDownIcon}>{iAngleDown}</span>
          </p>
        </button>
      ) : (
        <ul className={css.sortSelect} ref={dropdownRef}>
          <li onClick={() => handleSelect("date")}>
            Date added {sort === "date" && <span className={css.checkIcon}>{iCheck}</span>}
          </li>
          <li onClick={() => handleSelect("upvotes")}>
            Popularity {sort === "upvotes" && <span className={css.checkIcon}>{iCheck}</span>}
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sort;
