import React, { FC } from "react";
import styled from "styled-components";
import type { Category } from "@/state/_types/types";

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { selectAllCategories } from "@/state/categories/allCategories";
import {
  selectProjectCategories,
  setProjectCategories,
} from "@/state/modals/projectModal/projectModal";

const CategoryList: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const allCategories = useAppSelector(selectAllCategories);
  const categories = useAppSelector(selectProjectCategories);
  const copy = [...categories];

  const setCategory = (categoryLabel: string): void => {
    if (copy.includes(categoryLabel)) {
      const index = copy.indexOf(categoryLabel);
      copy.splice(index, 1);
    } else {
      copy.push(categoryLabel);
    }
    dispatch(setProjectCategories(copy));
  };

  const active = {
    backgroundColor: "var(--primaryColor)",
    color: "var(--background)",
  };

  return (
    <CategoryListStyled>
      {allCategories
        .filter((category: Category) => category.id !== "all")
        .map((category: Category) => (
          <Item
            style={copy.includes(category.label) ? active : null}
            key={category.id}
            onClick={() => setCategory(category.label)}
          >
            {category.label.toLowerCase()}
          </Item>
        ))}
    </CategoryListStyled>
  );
};

const CategoryListStyled = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Item = styled.li`
  font-size: var(--fsText);
  font-weight: var(--fwMedium);
  padding: 0.5rem;
  background-color: var(--underlay1);
  border-radius: 0.5rem;
  cursor: pointer;
`;

export default CategoryList;
