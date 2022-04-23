import React, { useState } from "react";
import css from "./Nav.module.css";
import k from "../../../../../k/k";

// components
import { NavTop, NavMid, NavBot, Modal } from "./index";

const Nav = () => {
  const [donateAmount, setDonateAmount] = useState("0");
  const [modalIsActive, setModalIsActive] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState();

  const updateDonateAmount = (e) => {
    setDonateAmount(e.target.value);
  };

  const handleDonateBtnClick = async (el) => {
    el.target.disabled = true;
    const hasAllowed = await window.ic?.plug?.requestConnect();

    if (hasAllowed) {
      const requestTransferArg = {
        to: k.DONATION_WALLET,
        amount: donateAmount * 100_000_000,
      };

      const transfer = await window.ic?.plug?.requestTransfer(requestTransferArg);
      setTransactionStatus(transfer ? 1 : null);
    }

    setTimeout(function () {
      el.target.disabled = false;
    }, 5000);
  };

  return (
    <nav className={css.nav}>
      <NavTop />
      <div className={css.divider} />
      <NavMid />
      <div className={css.divider} />
      <NavBot />

      <Modal
        modalIsActive={modalIsActive}
        setModalIsActive={setModalIsActive}
        updateDonateAmount={updateDonateAmount}
        donateAmount={donateAmount}
        handleDonateBtnClick={handleDonateBtnClick}
        transactionStatus={transactionStatus}
      />
    </nav>
  );
};

export default Nav;
