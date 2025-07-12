import { iAngleDown } from "@/components/icons/Icons"
import { Option } from "@/state/types/curated_projects_types"
import { FC } from "react"
import styled from "styled-components"

interface FilterBtnProps {
  label: string
  filter: Option
}

const FilterBtn: FC<FilterBtnProps> = ({ label, filter }): JSX.Element => {
  const style =
    filter.length < 1
      ? null
      : {
          color: "#fff",
          backgroundColor: "var(--highlight1)",
          padding: "0.25rem 0.3rem",
        }

  return (
    <FilterBtnStyled>
      <span>{label}</span>
      <span className="category" style={style}>
        {filter.length < 1 ? "all" : filter[0] === true ? "true" : filter[0] === false ? "false" : null}
      </span>
      <span className="icon">{iAngleDown}</span>
    </FilterBtnStyled>
  )
}

const FilterBtnStyled = styled.button`
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
    color: var(--primaryColor);
  }

  > span.icon {
    color: var(--tertiaryColor);
  }
`

export default FilterBtn
