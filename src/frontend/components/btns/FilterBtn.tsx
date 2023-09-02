import React, { FC } from "react";
import styled from "styled-components";

// icons
import { iAngleDown } from "@/components/icons/Icons";

interface FilterBtnProps {
  label: string;
  filter: null | boolean;
}

const FilterBtn: FC<FilterBtnProps> = ({ label, filter }): JSX.Element => {
  const style =
    filter === null
      ? null
      : {
          color: "#fff",
          backgroundColor: "var(--highlight1)",
          padding: "0.25rem 0.5rem",
          borderRadius: "0.5rem",
        };

  return (
    <FilterBtnStyled>
      <span>{label}</span>
      <Category style={style}>{filter === null ? "all" : filter ? "true" : "false"}</Category>
      <Icon>{iAngleDown}</Icon>
    </FilterBtnStyled>
  );
};

const FilterBtnStyled = styled.button`
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
`;

const Category = styled.span`
  color: var(--primaryColor);
`;

const Icon = styled.span`
  color: var(--tertiaryColor);
`;

export default FilterBtn;
