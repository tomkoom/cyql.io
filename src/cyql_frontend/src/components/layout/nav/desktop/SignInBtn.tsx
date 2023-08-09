import React, { FC } from "react";

// icons
import { iSignIn } from "@/components/icons/Icons";

// auth
import { useAuth } from "@/context/AuthContext";

// state
import { useAppDispatch } from "@/hooks/useRedux";

import { setSignInModal } from "@/state/modals/modals";

// components
import { Spinner } from "@/components/ui/_index";
import { Btn } from "@/components/btns/_index";

const SignInBtn: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { signInLoading } = useAuth();

  const openSignInModal = (): void => {
    dispatch(setSignInModal(true));
  };

  return signInLoading === false ? (
    <Btn btnType="secondary" text="sign in" icon={iSignIn} onClick={openSignInModal} />
  ) : (
    <Btn
      btnType="secondary"
      text="loading..."
      icon={<Spinner size={20} />}
      onClick={openSignInModal}
    />
  );
};

export default SignInBtn;
