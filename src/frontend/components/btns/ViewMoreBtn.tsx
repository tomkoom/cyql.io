import React, { FC } from "react"
import styled from "styled-components"
import { iAngleRight } from "@/components/icons/Icons"

interface ViewMoreBtnProps {
  text: string
  nav: () => void
}

const ViewMoreBtn: FC<ViewMoreBtnProps> = ({ text, nav }): JSX.Element => {
  return (
    <ViewMoreBtnStyled onClick={nav}>
      {text}
      <span>{iAngleRight}</span>
    </ViewMoreBtnStyled>
  )
}

const ViewMoreBtnStyled = styled.button`
  height: 3rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: var(--fwBold);
  background-color: var(--underlay1);
  padding: 0 1rem;
  margin-top: 2rem;
  border-radius: 1.5rem;
  border: none;
  cursor: pointer;
  transition: var(--transition1);

  &:hover {
    background-color: var(--underlay2);
  }

  > span {
    color: var(--tertiaryColor);
  }
`

export default ViewMoreBtn
