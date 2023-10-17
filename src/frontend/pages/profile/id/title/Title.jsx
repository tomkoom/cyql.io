import React from "react";
import css from "./Title.module.css";

// utils
import { formatId } from "@/utils/format";

// auth
import { useAuth } from "@/context/Auth";

// state
import { useAppSelector } from "@/hooks/useRedux";
import { selectOwnsNft } from "@/state/profile/profile";

const Title = () => {
  const ownsNft = useAppSelector(selectOwnsNft);
  const { userId } = useAuth();

  return (
    <div className={css.title}>
      <h2 className="pageTitle">{formatId(userId)}</h2>
      {ownsNft && <span className={css.badge}>Hodl Gang</span>}
    </div>
  );
};

export default Title;
