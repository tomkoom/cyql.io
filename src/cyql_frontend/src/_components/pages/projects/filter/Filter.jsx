import React, { useState, useRef, useLayoutEffect } from "react";
import css from "./Filter.module.css";

// components
import { Btn, FilterOptions } from "./index";

const Filter = ({ label, filter, setFilter }) => {
  const [openFilterOptions, setOpenFilterOptions] = useState();
  const [filterBtnWidth, setFilterBtnWidth] = useState(0);
  const filterBtnRef = useRef(null);

  const openFilterMenu = () => {
    setOpenFilterOptions((prev) => !prev);
  };

  useLayoutEffect(() => {
    setFilterBtnWidth(filterBtnRef.current.offsetWidth);
  }, [filter]);

  return (
    <div className={css.filter}>
      <div onClick={openFilterMenu} ref={filterBtnRef}>
        <Btn label={label} filter={filter} />
      </div>
      <div className={css.filterOptions}>
        {openFilterOptions && (
          <FilterOptions
            openFilterOptions={openFilterOptions}
            setOpenFilterOptions={setOpenFilterOptions}
            filterBtnWidth={filterBtnWidth}
            filterBtnRef={filterBtnRef}
            filter={filter}
            setFilter={setFilter}
          />
        )}
      </div>
    </div>
  );
};

export default Filter;
