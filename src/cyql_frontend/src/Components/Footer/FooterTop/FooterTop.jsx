import React from "react";
import css from "./FooterTop.module.css";

// icons
import { iPlusSquare, iComments, iHeart } from "../../ui-elements/icons/Icons";
import FooterTop from "./FooterTop/FooterTop";

// routes
import { toSubmit } from "../../../routes/routes";

const FooterTop = () => {
  return (
    <ul className={css.footerTop}>
      {/* submit */}
      <li className={css.footerTopI}>
        <div className={css.linkBlock} onClick={toSubmit}>
          <span>{iPlusSquare}</span>
          <div>
            <h5 className={css.title}>Submit your project</h5>
            <p className="bodyText">Submit your project and get traction from the IC community.</p>
          </div>
        </div>
      </li>

      {/* reach out */}
      <li className={css.footerTopI}>
        <a
          className={css.linkBlock}
          href="https://twitter.com/messages/compose?recipient_id=1386304698358116354"
          rel="noreferrer noopener"
          target="_blank"
        >
          <span>{iComments}</span>
          <div>
            <h5 className={css.title}>Reach out</h5>
            <p className="text">
              Didn't find what you were looking for or want to collaborate? Reach out for us, we are
              happy to support and cooperate.
            </p>
          </div>
        </a>
      </li>

      {/* donate */}
      {/* add ghost donation */}
      <li className={css.footerTopI__donation}>
        <span>{iHeart}</span>
        <div>
          <h5 className={css.title}>Donate</h5>
          <p className="text">
            cyql is developed and maintained by the IC enthusiasts. You can support the project by
            making a{" "}
            <a
              className={css.donationLink}
              href="https://dashboard.internetcomputer.org/account/edf5163b9cc9084ae504ef56c239b0bfb6afbbc6e6e7c88e9cb3069fb2e135c1"
              rel="noreferrer noopener"
              target="_blank"
            >
              donation
            </a>
            .
            {/* <span>
              <a
                className={css.donationAddress}
                href="https://dashboard.internetcomputer.org/account/edf5163b9cc9084ae504ef56c239b0bfb6afbbc6e6e7c88e9cb3069fb2e135c1"
                rel="noreferrer noopener"
                target="_blank"
              >
                edf5163b9cc9084ae504ef56c239b0bfb6afbbc6e6e7c88e9cb3069fb2e135c1
              </a>
            </span> */}
          </p>
        </div>
      </li>
    </ul>
  );
};

export default FooterTop;
