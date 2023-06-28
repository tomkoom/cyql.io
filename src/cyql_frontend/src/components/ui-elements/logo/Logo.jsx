import React from "react";
import css from "./Logo.module.css";

// logos
import logoPurple from "../../../../assets/logo/cyql-logo-v2-purple.svg";
import logoGray from "../../../../assets/logo/cyql-logo-v2-gray.svg";

// state
import { useSelector } from "react-redux";
import { selectTheme } from "@/state/ui/theme";

const Logo = () => {
  const theme = useSelector(selectTheme);

  return (
    <div className={css.logo}>
      <img
        className={css.img}
        src={theme === "light" ? logoPurple : theme === "dark" ? logoGray : null}
        alt="cyql.io logo"
      />
      <h1 className={css.title}>cyql</h1>
    </div>
  );
};

export default Logo;
