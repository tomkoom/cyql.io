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
        {j.applicationEmail && <li>{j.applicationEmail}</li>}
        {j.applicationTwitter && <li>{j.applicationTwitter}</li>}
        {j.applicationDiscord && <li>{j.applicationDiscord}</li>}
      </ul>
    </div>
  );
};

export default Contact;
