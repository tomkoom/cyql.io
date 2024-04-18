import React, { FC, InputHTMLAttributes } from "react"
import styled from "styled-components"

const TextInput2: FC<InputHTMLAttributes<HTMLInputElement>> = (props): JSX.Element => {
  return <TextInputOutlinedStyled type="text" {...props} />
}

const TextInputOutlinedStyled = styled.input<InputHTMLAttributes<HTMLInputElement>>`
  width: 100%;
  height: 4rem;
  padding: 0 1rem;
  font-size: var(--fs6);
  font-weight: var(--fwMedium);
  color: var(--primaryColor);
  background-color: var(--underlay1);
  caret-color: var(--primaryColor);
  border: none;
  outline: none;

  /* ... */
  transition: ${(p) => (p.readOnly ? null : "var(--transition1)")};
  &:hover,
  &:focus {
    background-color: ${(p) => (p.readOnly ? null : "var(--underlay2)")};
  }
`

export default TextInput2
