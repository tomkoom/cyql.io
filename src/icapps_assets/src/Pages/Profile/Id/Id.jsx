import React, { useState } from "react";
import css from "./Id.module.css";

// icons
import { iCheck } from "../../../Icons/Icons";

// auth
import { useAuth } from "../../../Context/AuthContext";

// components
import { IdImg } from "../../../Components/Profile/index";

// state
import { useSelector } from "react-redux";
import { selectOwnsNFT } from "../../../State/profile";

const Id = () => {
  const { principalIdStr: pIdStr, accountIdStr: aIdStr } = useAuth();
  const [principalCopied, setPrincipalCopied] = useState(false);
  const [accountCopied, setAccountCopied] = useState(false);
  const ownsNFT = useSelector(selectOwnsNFT);

  const copyToClipBoard = (label) => {
    if (label === "Principal Id") {
      navigator.clipboard.writeText(pIdStr);
      setPrincipalCopied(true);
      setTimeout(() => {
        setPrincipalCopied(false);
      }, 3000);
    }

    if (label === "Account Id") {
      navigator.clipboard.writeText(aIdStr);
      setAccountCopied(true);
      setTimeout(() => {
        setAccountCopied(false);
      }, 3000);
    }
  };

  const addresses = [
    { label: "Principal Id", value: pIdStr, copy: principalCopied },
    { label: "Account Id", value: aIdStr, copy: accountCopied },
  ];

  return (
    <div className={css.id}>
      <IdImg size={128} />
      <div className={css.idAddr}>
        <div className={css.title}>
          <h2 className="pageTitle">
            {pIdStr.substring(0, 5) + "..." + pIdStr.substring(pIdStr.length - 3)}
          </h2>
          {ownsNFT && <span className={css.hodlBadge}>Hodl Gang</span>}
        </div>

        <ul className={css.addresses}>
          {addresses.map(({ label, value, copy }) => (
            <li className={css.addressesI} key={label}>
              <p className={css.label}>{label}</p>
              <p className={css.copy} onClick={() => copyToClipBoard(label)}>
                {copy ? (
                  <span>
                    <span className={css.icon}>{iCheck}</span> Copied!
                  </span>
                ) : (
                  value && value.substring(0, 11) + "..." + value.substring(value.length - 3)
                )}
              </p>
            </li>
          ))}
        </ul>
        <div className={css}></div>
      </div>
    </div>
  );
};

export default Id;
