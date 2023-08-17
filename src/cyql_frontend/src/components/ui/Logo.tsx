import React, { FC } from "react";
import styled from "styled-components";
import logoPurple from "../../../assets/logo/cyql-logo-v2-purple.svg";
import logoGray from "../../../assets/logo/cyql-logo-v2-gray.svg";

// state
import { useAppSelector } from "@/hooks/useRedux";
import { selectTheme } from "@/state/ui/theme";

const Logo: FC = (): JSX.Element => {
  const theme = useAppSelector(selectTheme);

  return (
    <LogoStyled>
      <img
        src={theme === "light" ? logoPurple : theme === "dark" ? logoGray : null}
        alt="cyql.io logo"
      />
      <h1>cyql</h1>
    </LogoStyled>
  );
};

const LogoStyled = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  > img {
    height: 1.88rem;
  }

  > h1 {
    visibility: hidden;
    width: 0;
  }
`;

export default Logo;
