import React from "react";
import css from "./Nav.module.css";

// utils
import { useWindowSize } from "@hooks/useWindowSize";

// components
import { Desktop, Mobile } from "./index";

const Nav = () => {
  const [deviceWidth] = useWindowSize();

  return (
    <header className={css.header}>
      <nav className={css.nav}>{deviceWidth > 1023 ? <Desktop /> : <Mobile />}</nav>
    </header>
  );
};

export default Nav;
