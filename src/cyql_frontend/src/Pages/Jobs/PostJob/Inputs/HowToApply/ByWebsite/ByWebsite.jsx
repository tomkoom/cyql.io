import React from "react";
import css from "./ByWebsite.module.css";

// state
import { useDispatch } from "react-redux";
import { setJob } from "../../../../../../State/jobs/job";

const ByWebsite = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setJob({ [e.target.name]: e.target.value }));
  };

  return (
    <div className={css.byWebsite}>
      <div>
        <input
          className="input"
          type="text"
          id="application_url"
          name="application_url"
          placeholder="e.g. https://yourcompany.com/apply"
          onChange={handleChange}
        />
      </div>
      <p className="hint">
        Applicants will be sent to the website you specify to apply for the position.
      </p>
    </div>
  );
};

export default ByWebsite;
