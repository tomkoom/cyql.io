import React, { FC } from "react"
import styled from "styled-components"

interface InputProps {
  label: string
  value: string
  id: string
}

const Input: FC<InputProps> = ({ label, value, id }): JSX.Element => {
  return (
    <InputStyled>
      <label htmlFor={id}>{label}</label>
      <input value={value === null ? "null" : value} type="text" id={id} disabled />
    </InputStyled>
  )
}

const InputStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  margin-bottom: 1rem;

  > label {
    font-size: var(--fsText);
    font-weight: var(--fwMedium);
    color: var(--tertiaryColor);
  }

  > input {
    width: 100%;
    font-size: var(--fsText);
    padding: 0.5rem;
    color: var(--tertiaryColor);
    background-color: var(--underlay1);
    caret-color: var(--primaryColor);
    border: none;
    outline: none;
  }
`

export default Input
