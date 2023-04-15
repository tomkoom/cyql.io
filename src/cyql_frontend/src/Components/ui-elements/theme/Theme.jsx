import React from "react";
import css from "./Theme.module.css";

// icons
import { iSun, iMoon } from "../icons/Icons";

// state
import { useSelector, useDispatch } from "react-redux";
import { setTheme, selectTheme } from "../../../state/theme";

const Theme = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  const changeTheme = (theme) => {
    return {
      light: { value: "dark" },
      dark: { value: "light" },
    }[theme];
  };

  return (
    <div className={css.theme} onClick={() => dispatch(setTheme(changeTheme(theme)))}>
      {theme === "light" ? iSun : theme === "dark" ? iMoon : null}
    </div>
  );
};

export default Theme;
