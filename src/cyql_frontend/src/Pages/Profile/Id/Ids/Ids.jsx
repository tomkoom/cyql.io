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

  const principalLabel = "principal id";
  const accountLabel = "account id";

  const ids = [
    { label: principalLabel, id: principalIdStr, copied: principalCopied },
    { label: accountLabel, id: accountIdStr, copied: accountCopied },
  ];

  const copy = (label) => {
    if (label === principalLabel) {
      navigator.clipboard.writeText(principalIdStr);
      setPrincipalCopied(true);
      setTimeout(() => {
        setPrincipalCopied(false);
      }, 3000);
    }

    if (label === accountLabel) {
      navigator.clipboard.writeText(accountIdStr);
      setAccountCopied(true);
      setTimeout(() => {
        setAccountCopied(false);
      }, 3000);
    }
  };

  return (
    <ul className={css.ids}>
      {ids.map(({ label, id, copied }) => (
        <li className={css.idsI} key={label}>
          <p className={css.label}>{label}</p>
          <div
            className={css.idValue}
            onClick={() => {
              !copied && copy(label);
            }}
          >
            {copied ? <Copied /> : <IdValue id={id} />}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Ids;
