import { iMoon, iSun } from "@/components/icons/Icons"
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { selectTheme, setTheme } from "@/state/theme"
import { FC } from "react"
import styled from "styled-components"

const Theme: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const theme = useAppSelector(selectTheme)

  const changeTheme = (theme: string): { value: string } => {
    return {
      light: { value: "dark" },
      dark: { value: "light" },
    }[theme]
  }

  return <ThemeStyled onClick={() => dispatch(setTheme(changeTheme(theme)))}>{theme === "light" ? iMoon : theme === "dark" ? iSun : null}</ThemeStyled>
}

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
  cursor: pointer;
  transition: var(--transition1);

  &:hover {
    background-color: var(--underlay2);
  }
`

export default Theme
