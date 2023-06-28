import React from "react";
import css from "./Header.module.css";

// utils
import { verifyAdmin } from "@/utils/verifyAdmin";

// constants
import { iiAdmin1, iiAdmin2 } from "@/constants/constants";

// icons
import { iEdit, iShareSquare } from "@/components/icons/Icons";

// auth
import { useAuth } from "@/context/AuthContext";

// components
import { Btn, Logo, Title } from "./index";
// import { UpvtBtn } from "@components/index";

// state
import { useDispatch } from "react-redux";
import { setProjectModal, setProjectDoc } from "@/state/modals/projectModal/projectModal";
import { setShareModal } from "@/state/modals/shareModal";

const Header = ({ projectDoc }) => {
  const dispatch = useDispatch();
  const { userKey } = useAuth();
  const admins = [iiAdmin1, iiAdmin2];

  const editProject = () => {
    dispatch(setProjectDoc(projectDoc));
    dispatch(setProjectModal(true));
  };

  const openShareModal = () => {
    dispatch(setShareModal(true));
  };

  return (
    <div className={css.header}>
      <div className={css.main}>
        {projectDoc.data.logo !== "" && (
          <Logo logo={projectDoc.data.logo} name={projectDoc.data.name} />
        )}
        <Title
          name={projectDoc.data.name}
          categories={projectDoc.data.categories}
          github={projectDoc.data.github}
          canister={projectDoc.data.canister}
          grantee={projectDoc.data.grantee}
        />
      </div>

      <div className={css.controls}>
        {verifyAdmin(admins, userKey) === true && <Btn icon={iEdit} onClick={editProject} />}
        <Btn icon={iShareSquare} onClick={openShareModal} />
        {/* <div className={css.btnContainer}>
          <UpvtBtn id={projectDoc.key} upvotedBy={projectDoc.data.upvotedBy} location="project" />
        </div> */}
      </div>
    </div>
  );
};

export default Header;
