import React from "react";
import css from "./UpvtBtn.module.css";

// auth
import { useAuth } from "../../../Context/AuthContext";

// upvotes
import { upvote, unUpvote } from "../../../Funcs/upvote";

// icons
import { iCaretUp, iCheck } from "../../../Icons/Icons";

// state
import { useDispatch } from "react-redux";
import { setSignInModal } from "../../../State/modals";

const UpvoteBtn = ({ onClick, upvotedBy }) => {
  return (
    <button className={css.upvtBtn} onClick={onClick}>
      <span className={css.iconDefault}>{iCaretUp}</span>
      <p>{upvotedBy ? upvotedBy.length : 0}</p>
    </button>
  );
};

const UpvotedBtn = ({ onClick, upvotedBy }) => {
  return (
    <button className={css.upvtdBtn} onClick={onClick}>
      <span className={css.iconActive}>{iCheck}</span>
      <p>{upvotedBy.length}</p>
    </button>
  );
};

const UpvtBtn = ({ idx, upvotedBy }) => {
  const dispatch = useDispatch();
  const { principalIdStr: pIdStr } = useAuth();

  return (
    <div>
      {pIdStr ? (
        upvotedBy && upvotedBy.includes(pIdStr) ? (
          <UpvotedBtn onClick={() => unUpvote(idx, pIdStr)} upvotedBy={upvotedBy} />
        ) : (
          <UpvoteBtn onClick={() => upvote(idx, pIdStr)} upvotedBy={upvotedBy} />
        )
      ) : (
        <UpvoteBtn onClick={() => dispatch(setSignInModal(true))} upvotedBy={upvotedBy} />
      )}
    </div>
  );
};

export default UpvtBtn;
