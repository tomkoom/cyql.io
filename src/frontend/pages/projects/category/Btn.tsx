import React, { FC } from "react"
import styled from "styled-components"

// icons
import { iAngleDown } from "@/components/icons/Icons"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectCategory } from "@/state/projects/category"

const Btn: FC = (): JSX.Element => {
  const category = useAppSelector(selectCategory)

  return (
    <BtnStyled>
      category:
      <span className="category">{category.toLowerCase()}</span>
      <span className="icon">{iAngleDown}</span>
    </BtnStyled>
  )
}

const BtnStyled = styled.button`
  height: 2.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0 0.75rem;
  font-size: var(--fsText);
  font-weight: var(--fwMedium);
  color: var(--secondaryColor);
  background-color: var(--underlay1);
  border-radius: 1.25rem;
  cursor: pointer;

  &:hover {
    background-color: var(--underlay2);
  }

  > span.category {
    height: 1.5rem;
    display: flex;
    align-items: center;
    color: #fff;
    background-color: var(--highlight1);
    padding: 0 0.5rem;
    border-radius: 0.75rem;
  }

  > span.icon {
    color: var(--tertiaryColor);
  }
`

export default Btn
