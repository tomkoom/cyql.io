import React, { FC } from "react"
import styled from "styled-components"
import { useNav } from "@/hooks"
import { iArrowLeft } from "@/components/icons/Icons"

const BackBtn: FC = (): JSX.Element => {
  const { goBack } = useNav()

  return <BackBtnStyled onClick={goBack}>{iArrowLeft}</BackBtnStyled>
}

const BackBtnStyled = styled.button`
  width: 3rem;
  height: 3rem;
  display: grid;
  place-items: center;
  font-size: var(--fs6);
  color: var(--secondaryColor);
  background-color: var(--underlay1);
  border-radius: 50%;
  margin-bottom: 1rem;
  transition: var(--transition1);

  &:hover {
    background-color: var(--underlay2);
  }
`

export default BackBtn
