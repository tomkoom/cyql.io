import React from "react";
import css from "./FooterTop.module.css";

// icons
import { iPlus, iComments, iHeart } from "@/components/icons/Icons";

// hooks
import useNav from "@/hooks/useNav";

const FooterTop = () => {
  const { toSubmit } = useNav();
  const cyqlMsgUrl = "https://twitter.com/messages/compose?recipient_id=1386304698358116354";
  const donationWalletExplorerUrl =
    "https://dashboard.internetcomputer.org/account/edf5163b9cc9084ae504ef56c239b0bfb6afbbc6e6e7c88e9cb3069fb2e135c1";

  return (
    <ul className={css.footerTop}>
      {/* submit */}
      <li className={css.footerTopI}>
        <div className={css.linkBlock} onClick={toSubmit}>
          <h5 className={css.title}>{iPlus}&nbsp;&nbsp;submit your project</h5>
          <p className={css.text}>
            Submit your project and get first traction from the #IC community.
          </p>
        </div>
      </li>

      {/* reach out */}
      <li className={css.footerTopI}>
        <a className={css.linkBlock} href={cyqlMsgUrl} rel="noreferrer noopener" target="_blank">
          <h5 className={css.title}>{iComments}&nbsp;&nbsp;reach out</h5>
          <p className={css.text}>
            Didn't find what you were looking for or want to collaborate? Reach out for us, we are
            happy to support and cooperate.
          </p>
        </a>
      </li>

      {/* donate */}
      {/* add ghost donation */}
      <li className={css.footerTopIDonation}>
        <h5 className={css.title}>{iHeart}&nbsp;&nbsp;donate</h5>
        <p className={css.text}>
          cyql is developed and maintained by the IC enthusiasts. You can support the project by
          making a{" "}
          <a
            className={css.donationLink}
            href={donationWalletExplorerUrl}
            rel="noreferrer noopener"
            target="_blank"
          >
            donation
          </a>
          .
        </p>
      </li>
    </ul>
  );
};

export default FooterTop;
