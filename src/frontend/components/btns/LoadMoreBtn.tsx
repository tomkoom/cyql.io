import React, { FC } from "react"
import styled from "styled-components"

interface LoadMoreBtnProps {
  setVisible: () => void
}

const LoadMoreBtn: FC<LoadMoreBtnProps> = ({ setVisible }): JSX.Element => {
  return <LoadMoreBtnStyled onClick={setVisible}>Load more projects</LoadMoreBtnStyled>
}

const LoadMoreBtnStyled = styled.button`
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: var(--underlay1);
  margin-top: 2rem;
  padding: 0 1rem;
  border: none;
  cursor: pointer;
  transition: var(--transition1);

  &:hover {
    background-color: var(--underlay2);
  }
`

export default LoadMoreBtn
