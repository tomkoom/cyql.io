import React from "react";
import css from "./ByContact.module.css";

// state
import { useDispatch } from "react-redux";
import { setJob } from "../../../../../../State/jobs/job";

const ByContact = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setJob({ [e.target.name]: e.target.value }));
  };

  return (
    <div className={css.byContact}>
      <div className={css.field}>
        <label className="label" htmlFor="application_email">
          Email
        </label>
        <input
          className="input"
          type="email"
          id="application_email"
          name="application_email"
          placeholder="Email"
          onChange={handleChange}
        />
      </div>

      <div className={css.field}>
        <label className="label" htmlFor="application_twitter">
          Twitter
        </label>
        <input
          className="input"
          type="text"
          id="application_twitter"
          name="application_twitter"
          placeholder="https://twitter.com/yourhandle"
          onChange={handleChange}
        />
      </div>

      <div className={css.field}>
        <label className="label" htmlFor="application_discord">
          Discord
        </label>
        <input
          className="input"
          type="text"
          id="application_discord"
          name="application_discord"
          placeholder="yourhandle#1111"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default ByContact;
