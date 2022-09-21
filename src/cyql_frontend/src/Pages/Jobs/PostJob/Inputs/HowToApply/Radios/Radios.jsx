import React from "react";
import css from "./Radios.module.css";

const Radios = ({ setHowToApply }) => {
  const handleChange = (e) => {
    setHowToApply(e.target.value);
  };

  return (
    <div className={css.radios}>
      <label className={css.container}>
        Apply by website
        <input
          type="radio"
          id="howToApply"
          name="howToApply"
          value="byWebsite"
          checked={null}
          onChange={handleChange}
        />
        <span className={css.checkmark}></span>
      </label>
      <label className={css.container}>
        Apply by contact
        <input
          type="radio"
          id="howToApply"
          name="howToApply"
          value="byContact"
          checked={null}
          onChange={handleChange}
        />
        <span className={css.checkmark}></span>
      </label>
    </div>
  );
};

export default Radios;
