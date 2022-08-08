import React from "react";
import css from "./UpvoteBtn2.module.css";

// auth
import { useAuth } from "../../../Context/AuthContext";

// shared functions
import { upvote, unUpvote } from "../../../Funcs/upvote";

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
            <button className={css.upvotedBtn} onClick={() => unUpvote(idx, user.uid)}>
              <span>{iCheck}</span> {upvotedBy.length}
            </button>
          ) : (
            <button className={css.upvoteBtn} onClick={() => upvote(idx, user.uid)}>
              <span>{iCaretUp}</span> {upvotedBy ? upvotedBy.length : 0}
            </button>
          )}
        </div>
      ) : (
        <button className={css.upvoteBtn} onClick={() => dispatch(setSignInModal(true))}>
          <span>{iCaretUp}</span> {upvotedBy ? upvotedBy.length : 0}
        </button>
      )}
    </div>
  );
};

export default UpvoteBtn2;
