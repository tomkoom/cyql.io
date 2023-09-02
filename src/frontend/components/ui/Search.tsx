import React, { FC, InputHTMLAttributes } from "react";
import styled from "styled-components";

const Search: FC<InputHTMLAttributes<HTMLInputElement>> = (props): JSX.Element => {
  return <SearchStyled type="text" {...props} />;
};

const SearchStyled = styled.input`
  max-width: 24rem;
  width: 100%;
  height: 3rem;
  padding: 0 1rem;
  font-size: var(--fs6);
  font-weight: var(--fwBold);
  color: var(--primaryColor);
  background-color: transparent;
  caret-color: var(--primaryColor);
  border-radius: 0.5rem;
  border: none;
  outline: none;

  /* box-shadow */
  box-shadow: 0 0 0 2px var(--underlay2);
  -webkit-box-shadow: 0 0 0 2px var(--underlay2);
  -moz-box-shadow: 0 0 0 2px var(--underlay2);
  -webkit-appearance: none;

  &:hover,
  &:focus {
    box-shadow: 0 0 0 2px var(--highlight1);
  }
`;

export default Search;
