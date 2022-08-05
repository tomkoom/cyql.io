import React, { useEffect, useRef } from "react";
import css from "./FilterOptions.module.css";

// icons
import { iCheck } from "../../../../Icons/Icons";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectFilterByOpenSource, setFilterByOpenSource } from "../../../../State/filter";

const FilterOptions = ({ openFilterOptions, setOpenFilterOptions, filterBtnRef }) => {
  const dispatch = useDispatch();
  const filterOptionsRef = useRef(null);
  const filter = useSelector(selectFilterByOpenSource);

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

  const clickFilter = (filter) => {
    dispatch(setFilterByOpenSource(filter));
    setOpenFilterOptions(false);
  };

  return (
    <div className={css.filter} ref={filterOptionsRef}>
      <ul>
        <li onClick={() => clickFilter("all")}>
          All{filter === "all" && <span className={css.icon}>{iCheck}</span>}
        </li>
        <li onClick={() => clickFilter("true")}>
          True{filter === "true" && <span className={css.icon}>{iCheck}</span>}
        </li>
        <li onClick={() => clickFilter("false")}>
          False{filter === "false" && <span className={css.icon}>{iCheck}</span>}
        </li>
      </ul>
    </div>
  );
};

export default FilterOptions;