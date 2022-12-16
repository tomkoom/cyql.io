import React, { useState, useRef, useLayoutEffect } from "react";
import css from "./Sort.module.css";

// components
import Btn from "./Btn/Btn";
import SortOptions from "./SortOptions/SortOptions";

// state
import { useSelector } from "react-redux";
import { selectSort } from "@state/projects/sort";

const Sort = () => {
  const [openSort, setOpenSort] = useState();
  const [sortBtnWidth, setSortBtnWidth] = useState(0);
  const sort = useSelector(selectSort);
  const sortBtnRef = useRef(null);

  const openSortMenu = () => {
    setOpenSort((prev) => !prev);
  };

  useLayoutEffect(() => {
    setSortBtnWidth(sortBtnRef.current.offsetWidth);
  }, [sort]);

  return (
    <div className={css.sort}>
      <div onClick={openSortMenu} ref={sortBtnRef}>
        <Btn />
      </div>
      <div className={css.sortOptions}>
        {openSort && (
          <SortOptions
            openSort={openSort}
            setOpenSort={setOpenSort}
            sortBtnWidth={sortBtnWidth}
            sortBtnRef={sortBtnRef}
          />
        )}
      </div>
    </div>
  );
};

export default Sort;
