import React, { FC } from "react";
import styled from "styled-components";

// icons
import { iSun, iMoon } from "@/components/icons/Icons";

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { setTheme, selectTheme } from "@/state/ui/theme";

const Theme: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);

  const changeTheme = (theme: string): { value: string } => {
    return {
      light: { value: "dark" },
      dark: { value: "light" },
    }[theme];
  };

  return (
    <ThemeStyled onClick={() => dispatch(setTheme(changeTheme(theme)))}>
      {theme === "light" ? iSun : theme === "dark" ? iMoon : null}
    </ThemeStyled>
  );
};

const ThemeStyled = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--primaryColor);
  background-color: var(--underlay1);
  /* box-shadow: rgba(var(--primaryColorRgb), 0.16) 0px 1px 4px; */
  cursor: pointer;

  &:hover {
    background-color: var(--underlay2);
  }
`;

export default Theme;