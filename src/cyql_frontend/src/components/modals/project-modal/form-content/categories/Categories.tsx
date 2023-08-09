import React, { FC } from "react";
import styled from "styled-components";

// components
import { CategoryList } from "./_index";

const Categories: FC = (): JSX.Element => {
  return (
    <div>
      <Title>
        categories <span>one or multiple</span>
      </Title>
      <CategoryList />
    </div>
  );
};

const Title = styled.h6`
  font-size: var(--fs5);
  margin-bottom: 1rem;

  > span {
    font-size: var(--fs6);
    font-weight: var(--fwMedium);
    color: var(--tertiaryColor);
  }
`;

export default Categories;
