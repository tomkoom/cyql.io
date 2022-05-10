import React from "react";
import css from "./UpvoteBtn.module.css";

// auth
import { useAuth } from "../../../Context/AuthContext";

// shared functions
import { upvote, cancelUpvote } from "../../../Utils/sharedFunctions";

// icons
import { iCaretUp, iCheck } from "../../../Icons/Icons";

// state
import { useDispatch } from "react-redux";
import { setSignInModal } from "../../../State/modals";

const UpvoteBtn = ({ idx, upvotedBy }) => {
  const { user } = useAuth();
  const dispatch = useDispatch();

  return (
    <div>
      {user ? (
        <div>
          {upvotedBy && user && upvotedBy.includes(user.uid) ? (
            <button className={css.upvotedBtn} onClick={() => cancelUpvote(idx, user.uid)}>
              {iCheck} Upvoted {upvotedBy.length}
            </button>
          ) : (
            <button className={css.upvoteBtn} onClick={() => upvote(idx, user.uid)}>
              {iCaretUp} Upvote {upvotedBy ? upvotedBy.length : 0}
            </button>
          )}
        </div>
      ) : (
        <button className={css.upvoteBtn} onClick={() => dispatch(setSignInModal(true))}>
          {iCaretUp} Upvote {upvotedBy ? upvotedBy.length : 0}
        </button>
      )}
    </div>
  );
};

export default UpvoteBtn;
