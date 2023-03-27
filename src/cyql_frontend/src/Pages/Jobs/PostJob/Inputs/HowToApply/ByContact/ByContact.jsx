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
        <label className="label" htmlFor="applicationEmail">
          Email
        </label>
        <input
          className="input"
          type="email"
          id="applicationEmail"
          name="applicationEmail"
          placeholder="Email"
          onChange={handleChange}
        />
      </div>

      <div className={css.field}>
        <label className="label" htmlFor="applicationTwitter">
          Twitter
        </label>
        <input
          className="input"
          type="text"
          id="applicationTwitter"
          name="applicationTwitter"
          placeholder="https://twitter.com/yourhandle"
          onChange={handleChange}
        />
      </div>

      <div className={css.field}>
        <label className="label" htmlFor="applicationDiscord">
          Discord
        </label>
        <input
          className="input"
          type="text"
          id="applicationDiscord"
          name="applicationDiscord"
          placeholder="yourhandle#1111"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default ByContact;
