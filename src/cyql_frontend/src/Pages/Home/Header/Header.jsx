import React from "react";
import css from "./Header.module.css";

// components
import { Highlights, Title } from "./index";

const Header = () => {
  return (
    <section className={css.header}>
      <Title />
      <p className={css.text}>
        Discover new dApps, keep an eye out for upcoming NFT sales and more.
      </p>
      <Highlights />
    </section>
  );
};

export default Header;
