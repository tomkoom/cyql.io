import React from "react";
import css from "./UpvoteBtn.module.css";

// auth
import { useAuth } from "../../../../context/AuthContext";

// shared functions
import { upvote, unUpvote } from "../../../../Funcs/upvote";

// icons
import { iCaretUp, iCheck } from "../../../../Components/ui-elements/icons/Icons";

// state
import { useDispatch } from "react-redux";
import { setSignInModal } from "../../../../state/modals/modals";

const UpvoteBtn = ({ idx, upvotedBy }) => {
  const { user } = useAuth();
  const dispatch = useDispatch();

  return (
    <div>
      {user ? (
        upvotedBy && upvotedBy.includes(user.uid) ? (
          <button className={css.upvotedBtn} onClick={() => unUpvote(idx, user.uid)}>
            <span className={css.iconActive}>{iCheck}</span>
            <p>{upvotedBy.length}</p>
          </button>
        ) : (
          <button className={css.upvoteBtn} onClick={() => upvote(idx, user.uid)}>
            <span className={css.iconActive}>{iCaretUp}</span>
            <p>{upvotedBy ? upvotedBy.length : "0"}</p>
          </button>
        )
      ) : (
        <button className={css.upvoteBtn} onClick={() => dispatch(setSignInModal(true))}>
          <span className={css.iconDefault}>{iCaretUp}</span>
          <p>{upvotedBy ? upvotedBy.length : "0"}</p>
        </button>
      )}
    </div>
  );
};

export default UpvoteBtn;
