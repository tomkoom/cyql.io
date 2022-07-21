import React from "react";
import css from "./SignInModal.module.css";

// icons
import { iAngleRight } from "../../../Icons/Icons";
import CrossIcon from "../../../Icons/CrossIcon/CrossIcon";

// auth
import { useAuth } from "../../../Context/AuthContext";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectSignInModal, setSignInModal } from "../../../State/modals";

const SignInModal = () => {
  const dispatch = useDispatch();
  const { signInWithPlug } = useAuth();

  const signInModal = useSelector(selectSignInModal);

  return (
    <div
      className={signInModal ? `${css.modal} ${css.active}` : css.modal}
      onClick={() => dispatch(setSignInModal(false))}
    >
      <div
        className={signInModal ? `${css.content} ${css.active}` : css.content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={css.top}>
          <h3 className={css.title}>Choose your wallet</h3>
          <CrossIcon onClick={() => dispatch(setSignInModal(false))} />
        </div>

        <button className={css.plugBtn} onClick={signInWithPlug}>
          <div>
            <img
              className={css.logo}
              src="https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/brand/plug/plug-logo.png"
              alt="plugwallet-logo"
            />{" "}
            Plug
          </div>
          <div className={css.icon}>{iAngleRight}</div>
        </button>

        <hr className={css.div} />
        <p className={css.btmText}>Other wallets support coming soon</p>
      </div>
    </div>
  );
};

export default SignInModal;
