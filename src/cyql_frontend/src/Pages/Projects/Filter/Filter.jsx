import React, { useState, useRef } from "react";
import css from "./Filter.module.css";

// components
import { Btn, FilterOptions } from "./index";

const Filter = ({ label, filter, setFilter }) => {
  const [openFilterOptions, setOpenFilterOptions] = useState();
  const filterBtnRef = useRef(null);

  const click = () => {
    setOpenFilterOptions((prev) => !prev);
  };

  return (
    <div className={css.filter}>
      <div onClick={click} ref={filterBtnRef}>
        <Btn label={label} filter={filter} />
      </div>
      <div className={css.filterOptions}>
        {openFilterOptions && (
          <FilterOptions
            openFilterOptions={openFilterOptions}
            setOpenFilterOptions={setOpenFilterOptions}
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
