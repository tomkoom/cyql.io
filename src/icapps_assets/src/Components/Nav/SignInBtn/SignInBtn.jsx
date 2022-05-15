import React from "react";

import { useDispatch } from "react-redux";
import { setSignInModal } from "../../../State/modals";

const SignInBtn = () => {
  const dispatch = useDispatch();

  return (
    <button className="secondaryBtn" onClick={() => dispatch(setSignInModal(true))}>
      Sign in
    </button>
  );
};

export default SignInBtn;
