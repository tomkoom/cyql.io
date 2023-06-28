import React from "react";
import css from "./SignInMethods.module.css";

// components
import { Btn } from "./index";

// auth
import { useAuth } from "@/context/AuthContext";

const SignInMethods = () => {
  const {
    // signInWithPlug,
    // signInWithStoic,
    // signInWithInfinityWallet,
    signInWithII,
    signInWithNfid,
  } = useAuth();
  const signInMethods = [
    {
      id: "internet_identity",
      label: "Internet Identity",
      logo: "https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/ic-logo.svg",
      click: signInWithII,
      aboutUrl: "https://identity.ic0.app/about",
    },
    {
      id: "nfid",
      label: "NFID",
      logo: "https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/brand/nfid/nfid-logo.png",
      click: signInWithNfid,
      aboutUrl: "https://nfid.one/#FAQ",
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
        <div className={css.signInMethod} key={signInMethod.id}>
          <Btn label={signInMethod.label} logo={signInMethod.logo} onClick={signInMethod.click} />
          <a
            className={css.aboutUrl}
            href={signInMethod.aboutUrl}
            rel="noreferrer noopener"
            target="_blank"
          >
            About {signInMethod.label}
          </a>
        </div>
      ))}
    </div>
  );
};

export default SignInMethods;
