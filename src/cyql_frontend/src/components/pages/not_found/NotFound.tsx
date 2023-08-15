import React, { FC } from "react";
import styled from "styled-components";

// hooks
import useNav from "@/hooks/useNav";

const NotFound: FC = (): JSX.Element => {
  const { toHome } = useNav();

  return (
    <NotFoundStyled>
      <p className="bodyText">
        Requested page was not found. <span onClick={toHome}>Go to homepage 🏠</span>
      </p>
    </NotFoundStyled>
  );
};

const NotFoundStyled = styled.div`
  text-align: center;

  > p {
    color: var(--secondaryColor);
  }

  > p span {
    cursor: pointer;
    color: var(--primaryColor);

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default NotFound;
