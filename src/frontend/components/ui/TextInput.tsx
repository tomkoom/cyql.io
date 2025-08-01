import { FC, InputHTMLAttributes } from "react"
import styled from "styled-components"

const TextInput: FC<InputHTMLAttributes<HTMLInputElement>> = (props): JSX.Element => {
  return <TextInputStyled type="text" {...props} />
}

const TextInputStyled = styled.input<InputHTMLAttributes<HTMLInputElement>>`
  width: 100%;
  height: 3rem;
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

export default TextInput
