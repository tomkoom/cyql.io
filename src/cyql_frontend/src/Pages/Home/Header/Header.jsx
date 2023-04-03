import React from "react";
import css from "./Header.module.css";

// components
import { Highlights, Title } from "./index";

const Header = () => {
  return (
    <section className={css.header}>
      <Title />
      <p className={css.text}>
        discover new #ic projects
      </p>
      <Highlights />
    </section>
  );
};

export default Header;
