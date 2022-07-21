import React from "react";
import css from "./ProfileBtn.module.css";

// icons
import { iAngleDown } from "../../../../../Icons/Icons";

// auth
import { useAuth } from "../../../../../Context/AuthContext";

const ProfileBtn = () => {
  const { principalId } = useAuth();

  return (
    <div className={css.profileBtn}>
      <img
        className={css.idImg}
        src={`https://avatars.dicebear.com/api/jdenticon/${principalId}.svg`}
        alt="id-img"
      />
      <p>{principalId.substring(0, 5) + "..." + principalId.substring(principalId.length - 3)}</p>
      <span>{iAngleDown}</span>
    </div>
  );
};

export default ProfileBtn;
