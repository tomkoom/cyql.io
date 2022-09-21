import React, { useState, useRef } from "react";
import css from "./Sort.module.css";

// components
import Btn from "./Btn/Btn";
import SortOptions from "./SortOptions/SortOptions";

const Sort = () => {
  const [openSort, setOpenSort] = useState();
  const sortBtnRef = useRef(null);

  const clickBtn = () => {
    setOpenSort((prev) => !prev);
  };

  return (
    <div className={css.sort}>
      <div onClick={clickBtn} ref={sortBtnRef}>
        <Btn />
      </div>
      <div className={css.sortOptions}>
        {openSort && (
          <SortOptions openSort={openSort} setOpenSort={setOpenSort} sortBtnRef={sortBtnRef} /> // pass sortBtnRef to SortOptions
        )}
      </div>
    </div>
  );
};

export default Sort;
