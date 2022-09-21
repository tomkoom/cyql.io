import React from "react";
import css from "./Contact.module.css";

// state
import { useSelector } from "react-redux";
import { selectActiveJob } from "../../../State/jobs/job";

const Contact = () => {
  const j = useSelector(selectActiveJob);

  return (
    <div className={css.contact}>
      <h4 className={css.title}>Apply by Contact</h4>
      <ul>
        {j.contactEmail && <li>{j.contactEmail}</li>}
        {j.contactTwitter && <li>{j.contactTwitter}</li>}
        {j.contactDiscord && <li>{j.contactDiscord}</li>}
      </ul>
    </div>
  );
};

export default Contact;
