import React, { useEffect, useRef } from "react";
import styled from "styled-components";

// icons
import { iCheck } from "@/components/icons/Icons";

// state
import { useAppDispatch } from "@/hooks/useRedux";

const FilterOptions = ({
  isOpen,
  setIsOpen,
  filterBtnWidth,
  filterBtnRef,
  filter,
  setFilter,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const filterOptionsRef = useRef(null);
  const style = { width: `${filterBtnWidth.toString()}px` };

  const handleOutsideClick = (e) => {
    if (
      isOpen &&
      filterOptionsRef.current &&
      !filterOptionsRef.current.contains(e.target) &&
      filterBtnRef.current &&
      !filterBtnRef.current.contains(e.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // bind the event listener
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      // unbind the event listener on clean up
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  const onFilter = (value: null | boolean) => {
    dispatch(setFilter(value));
    setIsOpen(false);
  };

  return (
    <FilterOptionsStyled style={style} ref={filterOptionsRef}>
      <li onClick={() => onFilter(null)}>all {filter === null && <Icon>{iCheck}</Icon>}</li>
      <li onClick={() => onFilter(true)}>true {filter === true && <Icon>{iCheck}</Icon>}</li>
      <li onClick={() => onFilter(false)}>false {filter === false && <Icon>{iCheck}</Icon>}</li>
    </FilterOptionsStyled>
  );
};

const FilterOptionsStyled = styled.ul`
  display: flex;
  flex-direction: column;
  font-weight: var(--fwBold);
  background-color: var(--underlay1);
  padding: 0.5rem 0;
  border-radius: 1rem;

  > li {
    height: 2.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    white-space: nowrap;
    padding: 0 1rem;
    cursor: pointer;

    &:hover {
      background-color: var(--underlay2);
    }
  }
`;

const Icon = styled.span`
  color: var(--colorOk);
`;

export default FilterOptions;
