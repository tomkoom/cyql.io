import React from "react";
import css from "./Header.module.css";

// constants
import { plugAdmin1, plugAdmin2, stoicAdmin1, stoicAdmin2 } from "@constants/constants";

// auth
import { useAuth } from "@context/AuthContext";

// components
import { EditBtn, Logo, ShareBtn, Title } from "./index";
import { UpvtBtn } from "@components/index";

const Header = ({ projectDoc }) => {
  const { principalIdStr } = useAuth();
  const isAdmin =
    principalIdStr === plugAdmin1 ||
    principalIdStr === plugAdmin2 ||
    principalIdStr === stoicAdmin1 ||
    principalIdStr === stoicAdmin2;

  return (
    <div className={css.header}>
      <div className={css.main}>
        {projectDoc.data.logo && <Logo logo={projectDoc.data.logo} name={projectDoc.data.name} />}
        <Title
          name={projectDoc.data.name}
          grantee={projectDoc.data.grantee}
          category={projectDoc.data.category}
          tags={projectDoc.data.tags}
        />
      </div>

      <div className={css.controls}>
        {isAdmin && <EditBtn projectDoc={projectDoc} />}
        <ShareBtn />
        {/* <div className={css.btnContainer}>
          <UpvtBtn id={projectDoc.key} upvotedBy={projectDoc.data.upvotedBy} location="project" />
        </div> */}
      </div>
    </div>
  );
};

export default Header;
