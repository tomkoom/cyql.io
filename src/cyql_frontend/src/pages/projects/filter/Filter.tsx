import React, { useState, useRef, useLayoutEffect } from "react";
import styled from "styled-components";

// components
import { FilterOptions } from "./_index";
import { FilterBtn } from "@/components/btns/_index";

const Filter = ({ label, filter, setFilter }): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filterBtnWidth, setFilterBtnWidth] = useState<number>(0);
  const filterBtnRef = useRef(null);

  const openFilterMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useLayoutEffect(() => {
    setFilterBtnWidth(filterBtnRef.current.offsetWidth);
  }, [filter]);

  return (
    <FilterStyled>
      <div onClick={openFilterMenu} ref={filterBtnRef}>
        <FilterBtn label={label} filter={filter} />
      </div>

      <Options>
        {isOpen && (
          <FilterOptions
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            filterBtnWidth={filterBtnWidth}
            filterBtnRef={filterBtnRef}
            filter={filter}
            setFilter={setFilter}
          />
        )}
      </Options>
    </FilterStyled>
  );
};

const FilterStyled = styled.div`
  position: relative;
`;

const Options = styled.div`
  position: absolute;
  top: calc(40px + 0.5rem);
  left: 0;
  z-index: 999;
`;

export default Filter;
