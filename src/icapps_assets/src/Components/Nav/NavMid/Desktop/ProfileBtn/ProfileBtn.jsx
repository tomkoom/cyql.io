import React from "react";
import css from "./ProfileBtn.module.css";

// auth
import { useAuth } from "../../../../../Context/AuthContext";

// identicon
import Jdenticon from "react-jdenticon";

const IdentIcon = ({ principalId }) => {
  return <Jdenticon size="40" value={principalId} />;
};

const ProfileBtn = () => {
  const { principalId } = useAuth();

  return (
    <div className={css.profileBtn}>
      <IdentIcon principalId={principalId} />
      <p>{principalId.substring(0, 5) + "..." + principalId.substring(principalId.length - 3)}</p>
    </div>
  );
};

export default ProfileBtn;
