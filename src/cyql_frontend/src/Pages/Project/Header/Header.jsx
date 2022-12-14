import React from "react";
import css from "./Header.module.css";

// components
import { Logo, ShareBtn, Title } from "./index";
import { UpvtBtn } from "@components/index";

const Header = ({ logo, name, category, tags, grantee, id, upvotedBy }) => {
  return (
    <div className={css.header}>
      <div className={css.main}>
        {logo && <Logo logo={logo} name={name} />}
        <Title name={name} category={category} tags={tags} grantee={grantee} />
      </div>

      <div className={css.controls}>
        <ShareBtn />
        <div className={css.btnContainer}>
          <UpvtBtn id={id} upvotedBy={upvotedBy} location="project" />
        </div>
      </div>
    </div>
  );
};

export default Header;
