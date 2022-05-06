import React from "react";
import css from "./UpvoteBtn2.module.css";

// auth
import { useAuth } from "../../../Context/AuthContext";

// shared functions
import { upvote, cancelUpvote } from "../../../Utils/sharedFunctions";

// icons
import { iCaretUp, iCheck } from "../../../Icons/Icons";

// state
import { useDispatch } from "react-redux";
import { setSignInModal } from "../../../State/modals";

const UpvoteBtn2 = ({ idx, upvotedBy }) => {
  const { user } = useAuth();

  const dispatch = useDispatch();

  return (
    <div>
      {user ? (
        <div>
          {upvotedBy && upvotedBy.includes(user.uid) ? (
            <button className={css.upvotedBtn} onClick={() => cancelUpvote(idx, user.uid)}>
              {iCheck}
              {upvotedBy.length}
            </button>
          ) : (
            <button className={css.upvoteBtn} onClick={() => upvote(idx, user.uid)}>
              {iCaretUp}
              {upvotedBy ? upvotedBy.length : 0}
            </button>
          )}
        </div>
      ) : (
        <button className={css.upvoteBtn} onClick={() => dispatch(setSignInModal(true))}>
          {iCaretUp}
          {upvotedBy ? upvotedBy.length : 0}
        </button>
      )}
    </div>
  );
};

export default UpvoteBtn2;
