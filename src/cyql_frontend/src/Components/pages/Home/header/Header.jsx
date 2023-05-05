import React from "react";
import css from "./Header.module.css";

// components
import { Title } from "./index";

const Header = () => {
  return (
    <section className={css.header}>
      <Title />
      <p className={css.text}>discover new #ic projects</p>
    </section>
  );
};

export default Header;
