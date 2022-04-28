import React from "react";
import css from "./SignInModal.module.css";

// auth
import { useAuth } from "../../Context/AuthContext";
import { iTimes, iTwitter } from "../../Icons/Icons";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectSignInModal, setSignInModal } from "../../State/modals";

const SignInModal = () => {
  const dispatch = useDispatch();
  const signInModal = useSelector(selectSignInModal);

  const { signInWithTwitter } = useAuth();

  return (
    <div
      className={signInModal ? `${css.modal} ${css.active}` : css.modal}
      onClick={() => dispatch(setSignInModal(false))}
    >
      <div
        className={signInModal ? `${css.content} ${css.active}` : css.content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={css.timesWrapper}>
          <span onClick={() => dispatch(setSignInModal(false))}>{iTimes}</span>
        </div>
        <h3>Sign in to icApps</h3>
        <button className={css.twitterBtn} onClick={signInWithTwitter}>
          <span>{iTwitter}</span> Continue with Twitter
        </button>
        <div className="divider" />
        <p className="bodyText">Other sign in options coming soon</p>
      </div>
    </div>
  );
};

export default SignInModal;
