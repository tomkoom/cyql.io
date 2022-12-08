import React from "react";
import css from "./Header.module.css";

// components
import { Logo, Title } from "./index";
import { UpvtBtn } from "@components/index";

const Header = ({ logo, name, category, tags, grantee, id, upvotedBy }) => {
  return (
    <div className={css.header}>
      {logo && <Logo logo={logo} name={name} />}
      <Title name={name} category={category} tags={tags} grantee={grantee} />

      <div className={css.btnContainer}>
        <UpvtBtn id={id} upvotedBy={upvotedBy} />
      </div>
    </div>
  );
};

export default Header;
