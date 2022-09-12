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
        <label className="label" htmlFor="contactEmail">
          Email
        </label>
        <input
          className="input"
          type="email"
          id="contactEmail"
          name="contactEmail"
          placeholder="Email"
          onChange={handleChange}
        />
      </div>

      <div className={css.field}>
        <label className="label" htmlFor="contactTwitter">
          Twitter
        </label>
        <input
          className="input"
          type="text"
          id="contactTwitter"
          name="contactTwitter"
          placeholder="https://twitter.com/yourhandle"
          onChange={handleChange}
        />
      </div>

      <div className={css.field}>
        <label className="label" htmlFor="contactDiscord">
          Discord
        </label>
        <input
          className="input"
          type="text"
          id="contactDiscord"
          name="contactDiscord"
          placeholder="yourhandle#1111"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default ByContact;
