import React, { useState } from "react";
import css from "./Ids.module.css";

// icons
import { iCheck } from "@icons/Icons";

// utils
import { formatId } from "@utils/format";

// auth
import { useAuth } from "@context/AuthContext";

const Copied = () => {
  return (
    <div className={css.copied}>
      <span className={css.icon}>{iCheck}</span>
      <p>Copied!</p>
    </div>
  );
};

const IdValue = ({ id }) => {
  return <p>{id && formatId(id)}</p>;
};

const Ids = () => {
  const [principalCopied, setPrincipalCopied] = useState(false);
  const [accountCopied, setAccountCopied] = useState(false);
  const { principalIdStr, accountIdStr } = useAuth();

  const copyToClipBoard = (label) => {
    if (label === "principal id") {
      navigator.clipboard.writeText(principalIdStr);
      setPrincipalCopied(true);
      setTimeout(() => {
        setPrincipalCopied(false);
      }, 3000);
    }

    if (label === "account id") {
      navigator.clipboard.writeText(accountIdStr);
      setAccountCopied(true);
      setTimeout(() => {
        setAccountCopied(false);
      }, 3000);
    }
  };

  const ids = [
    { label: "principal id", id: principalIdStr, copied: principalCopied },
    { label: "account id", id: accountIdStr, copied: accountCopied },
  ];

  return (
    <ul className={css.ids}>
      {ids.map(({ label, id, copied }) => (
        <li className={css.idsI} key={label}>
          <p className={css.label}>{label}</p>
          <div className={css.idValue} onClick={() => copyToClipBoard(label)}>
            {copied ? <Copied /> : <IdValue id={id} />}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Ids;
