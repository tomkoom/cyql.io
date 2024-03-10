import React, { FC, InputHTMLAttributes, ChangeEvent } from "react"
import styled from "styled-components"

// state
import { useAppDispatch } from "@/hooks/useRedux"
import { setListProject } from "@/state/listProject"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
}

const Input: FC<InputProps> = ({ id, label, ...props }): JSX.Element => {
  const dispatch = useAppDispatch()

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    dispatch(setListProject({ [id]: value }))
  }

  return (
    <InputStyled>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="text" autoComplete="off" onChange={onChange} {...props} />
    </InputStyled>
  )
}

const InputStyled = styled.div`
  width: 100%;
  margin-bottom: 1rem;

  > label {
    display: inline-block;
    font-size: 0.8rem;
    padding-bottom: 0.25rem;
    pointer-events: none;
  }

  > input {
    width: 100%;
    height: 2rem;
    padding: 0 1rem;
    font-size: var(--fs6);
    font-weight: var(--fwMedium);
    color: var(--primaryColor);
    background-color: var(--underlay1);
    caret-color: var(--primaryColor);
    text-align: center;
    border: none;
    outline: none;
    transition: var(--transition1);

    &:hover,
    &:focus {
      background-color: var(--underlay2);
    }
  }
`

export default Input
