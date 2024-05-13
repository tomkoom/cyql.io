import React, { FC, InputHTMLAttributes, ChangeEvent } from "react"
import styled from "styled-components"
import type { Input } from "./_inputs"

// state
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { setListProject, selectListProject } from "@/state/listProject"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  input: Input
}

const Input: FC<InputProps> = ({ input, ...props }): JSX.Element => {
  const dispatch = useAppDispatch()
  const project = useAppSelector(selectListProject)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    dispatch(setListProject({ [id]: value }))
  }

  return (
    <InputStyled>
      <label htmlFor={input.id}>
        {input.required && "*"} {input.label}
      </label>

      <input
        id={input.id}
        type="text"
        value={project[input.id]}
        placeholder={input.placeholder}
        autoComplete="off"
        onChange={onChange}
        {...props}
      />
    </InputStyled>
  )
}

const InputStyled = styled.div`
  width: 100%;
  margin-bottom: 1rem;

  > label {
    display: inline-block;
    font-size: var(--fsText);
    padding-bottom: 0.25rem;
    pointer-events: none;
  }

  > input {
    width: 100%;
    height: 2.5rem;
    padding: 0 1rem;
    font-size: var(--fs6);
    font-weight: var(--fwMedium);
    color: var(--primaryColor);
    background-color: var(--underlay2);
    caret-color: var(--primaryColor);
    border: none;
    outline: none;
    transition: var(--transition1);

    &:hover,
    &:focus {
      background-color: var(--underlay3);
    }
  }
`

export default Input
