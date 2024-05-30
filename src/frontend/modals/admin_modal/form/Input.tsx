import React, { FC, ChangeEvent } from "react"
import styled from "styled-components"

interface InputProps {
  id: string
  label: string
  type: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<InputProps> = ({ id, label, type, value, onChange }): JSX.Element => {
  return (
    <InputStyled>
      <label htmlFor={id}>{label}</label>
      <input value={value} onChange={onChange} type={type} id={id} name={id} autoComplete="off" />
    </InputStyled>
  )
}

const InputStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;

  > label {
    font-size: var(--fsText);
    font-weight: var(--fwMedium);
    color: var(--tertiaryColor);
  }

  > input {
    height: 3rem;
    width: 100%;
    font-size: var(--fsText);
    padding: 0 0.8rem;
    color: var(--primaryColor);
    background-color: var(--underlay1);
    caret-color: var(--primaryColor);
    border: none;
    outline: none;

    &:focus {
      background-color: var(--underlay2);
    }
  }
`

export default Input
