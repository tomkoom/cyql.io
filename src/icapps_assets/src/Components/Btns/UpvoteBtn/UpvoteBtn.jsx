import React from "react";
import css from "./UpvoteBtn.module.css";

// auth
import { useAuth } from "../../../Context/AuthContext";

// shared functions
import { upvote, cancelUpvote } from "../../../Utils/sharedFunctions";

// icons
import { iCaretUp } from "../../../Icons/Icons";

const UpvoteBtn = ({ idx, upvotedBy }) => {
  const { user } = useAuth();

  return (
    <div>
      {upvotedBy && upvotedBy.includes(user.uid) ? (
        <button className={css.upvotedBtn} onClick={() => cancelUpvote(idx, user.uid)}>
          {iCaretUp}&nbsp;&nbsp;Upvoted&nbsp;&nbsp;{upvotedBy.length}
        </button>
      ) : (
        <button className={css.upvoteBtn} onClick={() => upvote(idx, user.uid)}>
          {iCaretUp}&nbsp;&nbsp;Upvote&nbsp;&nbsp;
          {upvotedBy ? upvotedBy.length : 0}
        </button>
      )}
    </div>
  );
};

export default UpvoteBtn;
