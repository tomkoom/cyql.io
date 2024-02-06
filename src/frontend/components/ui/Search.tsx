import React, { FC, InputHTMLAttributes } from "react"
import styled from "styled-components"

const Search: FC<InputHTMLAttributes<HTMLInputElement>> = (props): JSX.Element => {
  return <SearchStyled type="text" {...props} />
}

const SearchStyled = styled.input`
  width: 100%;
  height: 3rem;
  padding: 0 1rem;
  font-size: var(--fs6);
  font-weight: var(--fwMedium);
  color: var(--primaryColor);
  background-color: var(--underlay1);
  caret-color: var(--primaryColor);
  border-radius: 1.5rem;
  border: none;
  outline: none;
  transition: var(--transition1);

  &:hover,
  &:focus {
    background-color: var(--underlay2);
  }
`

export default Search
