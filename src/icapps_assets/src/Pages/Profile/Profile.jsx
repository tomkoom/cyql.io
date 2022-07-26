import React, { useState } from "react";
import css from "./Profile.module.css";

// icons
import { iCheck } from "../../Icons/Icons";

// components
import { IdImg } from "../../Components/Profile/index";

// auth
import { useAuth } from "../../Context/AuthContext";

// state
import { useSelector } from "react-redux";
import { selectOwnsNFT, selectNFTIdsOwned } from "../../State/profile";

const Profile = () => {
  const { principalIdStr: pIdStr, accountIdStr: aIdStr } = useAuth();
  const ownsNFT = useSelector(selectOwnsNFT);
  const ownedNFTIds = useSelector(selectNFTIdsOwned);
  const [principalCopied, setPrincipalCopied] = useState(false);
  const [accountCopied, setAccountCopied] = useState(false);

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
    <div className={css.profile}>
      <div className={css.id}>
        <IdImg size={128} />
        <div className={css.idAddr}>
          <h2 className="pageTitle">
            {pIdStr.substring(0, 5) + "..." + pIdStr.substring(pIdStr.length - 3)}
          </h2>
          <ul className={css.addresses}>
            {addresses.map(({ label, value, copy }) => (
              <li className={css.addressesI} key={label}>
                <p className={css.label}>{label}</p>
                <p className={css.copy} onClick={() => copyToClipBoard(label)}>
                  {copy ? (
                    <p>
                      <span className={css.icon}>{iCheck}</span> Copied!
                    </p>
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

      <div className={css.profileInfo}>
        <p>
          NFT: <span className={css.badge}>{ownsNFT.toString()}</span>
        </p>
        {/* <p>
          NFT Indexes:{" "}
          <span className={css.badge}>{ownedNFTIds.toString().replaceAll(",", ", ")}</span>
        </p> */}
      </div>
    </div>
  );
};

export default Profile;
