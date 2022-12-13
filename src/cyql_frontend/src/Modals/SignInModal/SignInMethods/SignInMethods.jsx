import React from "react";
import css from "./SignInMethods.module.css";

// icons
import { iAngleRight } from "@icons/Icons";

// auth
import { useAuth } from "@context/AuthContext";

const SignInMethods = () => {
  const { signInWithPlug, signInWithStoic, signInWithInfinityWallet } = useAuth();
  const signInMethods = [
    {
      label: "Plug",
      logo: "https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/brand/plug/plug-logo.svg",
      click: signInWithPlug,
    },
    {
      label: "Stoic",
      logo: "https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/brand/stoic/stoic-logo.jpg",
      click: signInWithStoic,
    },
    {
      label: "InfinityWallet",
      logo: "https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/brand/infinitywallet/infinitywallet-logo.png",
      click: signInWithInfinityWallet,
    },
  ];

  return (
    <div className={css.signInMethods}>
      {signInMethods.map((s) => (
        <button className={css.btn} key={s.label} onClick={s.click}>
          <div className={css.main}>
            <img className={css.logo} src={s.logo} alt={`${s.label} logo"`} />
            <p className={css.label}>{s.label}</p>
          </div>
          <span className={css.icon}>{iAngleRight}</span>
        </button>
      ))}
    </div>
  );
};

export default SignInMethods;
