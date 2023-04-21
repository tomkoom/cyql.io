import React from "react";
import css from "./SignInMethods.module.css";

// components
import { Btn } from "./index";

// auth
import { useAuth } from "@context/AuthContext";

const SignInMethods = () => {
  const { signInWithPlug, signInWithStoic, signInWithInfinityWallet, signInWithII } = useAuth();
  const signInMethods = [
    {
      id: "internet_identity",
      label: "Internet Identity",
      logo: "https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/ic-logo.svg",
      click: signInWithII,
    },
    // {
    //   id: "plug",
    //   label: "Plug",
    //   logo: "https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/brand/plug/plug-logo.svg",
    //   click: signInWithPlug,
    // },
    // {
    //   id: "stoic",
    //   label: "Stoic",
    //   logo: "https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/brand/stoic/stoic-logo.jpg",
    //   click: signInWithStoic,
    // },
    // {
    //   id: "infinity_wallet",
    //   label: "InfinityWallet",
    //   logo: "https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/brand/infinitywallet/infinitywallet-logo.png",
    //   click: signInWithInfinityWallet,
    // },
  ];

  return (
    <div className={css.signInMethods}>
      {signInMethods.map((signInMethod) => (
        <Btn
          key={signInMethod.id}
          label={signInMethod.label}
          logo={signInMethod.logo}
          onClick={signInMethod.click}
        />
      ))}
    </div>
  );
};

export default SignInMethods;
