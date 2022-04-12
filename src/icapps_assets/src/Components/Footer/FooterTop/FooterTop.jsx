import React from "react";
import css from "./FooterTop.module.css";

// icons
import { iPlusSquare, iComments, iHeart } from "../../../Icons/Icons";
import FooterTop from "./FooterTop/FooterTop";

const FooterTop = () => {
  return (
    <ul className={css.footerTop}>
      {/* submit */}
      <li className={css.footerTop__i}>
        <button
          className={`${css.footerTop__i__linkBlock} navlink`}
          onClick={() => toSubmit()}
        >
          <div>{iPlusSquare}</div>
          <div>
            <h5 className={css.footerTop__i__linkBlock__title}>
              Submit your project
            </h5>
            <p className="bodyText">
              Submit your project and get traction from the IC community.
            </p>
          </div>
        </button>
      </li>

      {/* reach out */}
      <li className={css.footerTop__i}>
        <a
          className={css.footerTop__i__linkBlock}
          href="https://twitter.com/messages/compose?recipient_id=1386304698358116354"
          rel="noreferrer noopener"
          target="_blank"
        >
          <div>{iComments}</div>
          <div>
            <h5 className={css.footerTop__i__linkBlock__title}>Reach out</h5>
            <p className="bodyText">
              Didn't find what you were looking for or want to collaborate?
              Reach out for us, we are happy to support and cooperate.
            </p>
          </div>
        </a>
      </li>

      {/* donate */}
      <li className={css.footerTop__i__donation}>
        <div>{iHeart}</div>
        <div>
          <h5 className={css.footerTop__i__linkBlock__title}>Donate</h5>
          <p className="bodyText">
            icApps is developed and maintained by the IC enthusiasts. You can
            support the project by making a donation.
            <br />
            <span>
              <a
                href="https://dashboard.internetcomputer.org/account/edf5163b9cc9084ae504ef56c239b0bfb6afbbc6e6e7c88e9cb3069fb2e135c1"
                rel="noreferrer noopener"
                target="_blank"
              >
                edf5163b9cc9084ae504ef56c239b0bfb6afbbc6e6e7c88e9cb3069fb2e135c1
              </a>
            </span>
          </p>
        </div>
      </li>
    </ul>
  );
};

export default FooterTop;
