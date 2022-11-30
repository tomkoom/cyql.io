import React from "react";
import css from "./Header.module.css";

// components
import { Logo, Title } from "./index";
import { UpvtBtn } from "@components/index";

const Header = ({ logo, name, category, tags, idx, upvotedBy }) => {
  return (
    <div className={css.header}>
      {logo && <Logo logo={logo} name={name} />}
      <Title name={name} category={category} tags={tags} />

      <div className={css.upvoteBtnContainer}>
        <UpvtBtn idx={idx} upvotedBy={upvotedBy} />
      </div>
    </div>
  );
};

export default Header;
