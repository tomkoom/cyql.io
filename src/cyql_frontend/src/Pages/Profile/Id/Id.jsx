import React, { useState } from "react";
import css from "./Id.module.css";

// icons
import { iCheck } from "../../../Icons/Icons";

// utils
import { formatId } from "../../../Utils/format";

// auth
import { useAuth } from "../../../Context/AuthContext";

// components
import { IdImg } from "../../../Components/Profile/index";

// state
import { useSelector } from "react-redux";
import { selectOwnsNFT } from "../../../State/profile";

const Id = () => {
  const { principalIdStr, accountIdStr } = useAuth();
  const [principalCopied, setPrincipalCopied] = useState(false);
  const [accountCopied, setAccountCopied] = useState(false);
  const ownsNFT = useSelector(selectOwnsNFT);

  const copyToClipBoard = (label) => {
    if (label === "Principal Id") {
      navigator.clipboard.writeText(principalIdStr);
      setPrincipalCopied(true);
      setTimeout(() => {
        setPrincipalCopied(false);
      }, 3000);
    }

    if (label === "Account Id") {
      navigator.clipboard.writeText(accountIdStr);
      setAccountCopied(true);
      setTimeout(() => {
        setAccountCopied(false);
      }, 3000);
    }
  };

  const addresses = [
    { label: "Principal Id", addr: principalIdStr, copied: principalCopied },
    { label: "Account Id", addr: accountIdStr, copied: accountCopied },
  ];

  return (
    <div className={css.id}>
      <IdImg size={128} />
      <div className={css.main}>
        <div className={css.title}>
          <h2 className="pageTitle">{formatId(principalIdStr)}</h2>
          {ownsNFT && <span className={css.hodlBadge}>Hodl Gang</span>}
        </div>

        <ul className={css.addresses}>
          {addresses.map(({ label, addr, copied }) => (
            <li className={css.addressesI} key={label}>
              <p className={css.label}>{label}</p>
              <div className={css.addr} onClick={() => copyToClipBoard(label)}>
                {copied ? (
                  <div>
                    <span className={css.icon}>{iCheck}</span>
                    <p>Copied!</p>
                  </div>
                ) : (
                  <p>{addr && formatId(addr)}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Id;
