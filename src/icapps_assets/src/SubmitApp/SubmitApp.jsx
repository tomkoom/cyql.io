import React, { useState } from "react";
import css from "./SubmitApp.module.css";
import k from "../../../../k/k";

const SubmitApp = () => {
  const [submissionData, setSubmissionData] = useState({
    name: "",
    website: "",
    canister: "",
  });

  const { name, website, canister } = submissionData;

  const handleInput = (e) => {
    setSubmissionData({ ...submissionData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${k.GOOGLE_SHEET_LINK}?tabId=SubmittedApps`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([
          [name, website, canister, new Date().toLocaleString()],
        ]),
      });
      await res.json();
      setSubmissionData({
        ...submissionData,
        name: "",
        website: "",
        canister: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className={`${css.submitApp} container768`}>
      <h2>Submit your App</h2>
      <form className={css.submitApp__form} onSubmit={handleSubmit}>
        {/* NAME */}
        <div className={css.submitApp__form__group}>
          <label className={css.submitApp__form__group__label} htmlFor="name">
            Enter your App name&#8902;
          </label>
          <input
            className={css.submitApp__form__group__input}
            type="text"
            id="name"
            name="name"
            placeholder="Your App name"
            autoComplete="off"
            required
            value={name}
            onChange={handleInput}
          />
        </div>

        {/* WEBSITE */}
        <div className={css.submitApp__form__group}>
          <label
            className={css.submitApp__form__group__label}
            htmlFor="website"
          >
            Enter your App website
          </label>
          <input
            className={css.submitApp__form__group__input}
            type="text"
            id="website"
            name="website"
            placeholder="https://yourapp.com/"
            autoComplete="off"
            value={website}
            onChange={handleInput}
          />
        </div>

        {/* CANISTER */}
        <div className={css.submitApp__form__group}>
          <label
            className={css.submitApp__form__group__label}
            htmlFor="canister"
          >
            Enter your App canister address
          </label>
          <input
            className={css.submitApp__form__group__input}
            type="text"
            id="canister"
            name="canister"
            placeholder="Canister address"
            autoComplete="off"
            value={canister}
            onChange={handleInput}
          />
        </div>

        <input
          className={css.submitApp__form__group__submitBtn}
          type="submit"
          value="Submit"
        />
      </form>
    </section>
  );
};

export default SubmitApp;
