import React, { FC } from "react"
import styled from "styled-components"
import { iAngleDown } from "@/components/icons/Icons"
import { useQueryParams } from "@/hooks/_index"

const CategoryBtn: FC = (): JSX.Element => {
  const { category } = useQueryParams()

  return (
    <CategoryBtnStyled>
      Category:
      <span className="category">{category}</span>
      <span className="icon">{iAngleDown}</span>
    </CategoryBtnStyled>
  )
}

const CategoryBtnStyled = styled.button`
  height: 2.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0 1rem;
  font-size: var(--fsText);
  font-weight: var(--fwMedium);
  color: var(--secondaryColor);
  background-color: var(--underlay1);
  cursor: pointer;
  transition: var(--transition1);

  &:hover {
    background-color: var(--underlay2);
  }

  > span.category {
    height: 1.5rem;
    display: flex;
    align-items: center;
    color: #fff;
    background-color: var(--highlight1);
    padding: 0 0.25rem;
  }

  > span.icon {
    color: var(--tertiaryColor);
  }
`

export default CategoryBtn
