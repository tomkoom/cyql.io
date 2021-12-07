import React, { useState } from "react";
import css from "./SubmitApp.module.css";
import k from "../../../../k/k";

// FRAMER MOTION
import { motion } from "framer-motion";

// Submit button component
export const SubmitBtn = ({ submitState }) => {
  return (
    <button className={css.sApp__form__group__submitBtn} type="submit">
      {submitState ? submitState : "Submit"}
    </button>
  );
};

const SubmitApp = () => {
  const [submissionData, setSubmissionData] = useState({
    name: "",
    website: "",
    twitter: "",
    discord: "",
    github: "",
    telegram: "",
    medium: "",
    canister: "",
    dscvr: "",
    distrikt: "",
    openChat: "",
    description: "",
    logoUrl: "",
    coverUrl: "",
    notes: "",
  });
  const [submitState, setSubmitState] = useState("");

  // Destructure submission data
  const {
    name,
    website,
    twitter,
    discord,
    github,
    telegram,
    medium,
    canister,
    dscvr,
    distrikt,
    openChat,
    description,
    logoUrl,
    coverUrl,
    notes,
  } = submissionData;

  // Inputs
  const inputs = [
    {
      label: "Your Project's name*",
      name: "name",
      data: name,
      placeholder: "Project's name",
      type: "text",
    },
    {
      label: "Website URL",
      name: "website",
      data: website,
      placeholder: "Website",
      type: "url",
    },
    {
      label: "Your Project's Twitter",
      name: "twitter",
      data: twitter,
      placeholder: "Enter as https://twitter.com/yourProject",
      type: "url",
    },
    {
      label:
        "Your Project's Discord. Make sure the invite link will not expire!",
      name: "discord",
      data: discord,
      placeholder: "Discord",
      type: "url",
    },
    {
      label: "Your Project's GitHub",
      name: "github",
      data: github,
      placeholder: "GitHub",
      type: "url",
    },
    {
      label: "Your Project's Telegram",
      name: "telegram",
      data: telegram,
      placeholder: "Telegram",
      type: "url",
    },
    {
      label: "Your Project's Medium",
      name: "medium",
      data: medium,
      placeholder: "Medium",
      type: "url",
    },
    {
      label: "Your Project's frontend canister address",
      name: "canister",
      data: canister,
      placeholder: "E.g. https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/",
      type: "text",
    },
    {
      label: "Dscvr",
      name: "dscvr",
      data: dscvr,
      placeholder: "Dscvr",
      type: "url",
    },
    {
      label: "Distrikt",
      name: "distrikt",
      data: distrikt,
      placeholder: "Distrikt",
      type: "url",
    },
    {
      label: "Open Chat",
      name: "openChat",
      data: openChat,
      placeholder: "Open Chat",
      type: "url",
    },
    {
      label: "Almost done! Please enter a short description of your project",
      name: "description",
      data: description,
      placeholder: "Short description",
      type: "text",
    },
    {
      label: "Logo image URL",
      name: "logoUrl",
      data: logoUrl,
      placeholder: "Logo img URL",
      type: "url",
    },
    {
      label: "Cover image URL (min 1200x400px for best perfomance)",
      name: "coverUrl",
      data: coverUrl,
      placeholder: "Cover img URL",
      type: "url",
    },
    {
      label: "Any additional notes",
      name: "notes",
      data: notes,
      placeholder: "Notes",
      type: "text",
    },
    // Category
  ];

  // Set state on input change
  const handleInput = (e) => {
    setSubmissionData({ ...submissionData, [e.target.name]: e.target.value });
  };

  // Submit data to Google Sheets
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitState("Submitting...");
    try {
      const res = await fetch(`${k.GOOGLE_SHEET_LINK}?tabId=SubmittedApps`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([
          [
            name,
            website,
            twitter,
            discord,
            github,
            telegram,
            medium,
            canister,
            dscvr,
            distrikt,
            openChat,
            description,
            logoUrl,
            coverUrl,
            notes,
            new Date().toLocaleString(),
          ],
        ]),
      });
      // Call function
      await res.json();
      // Empty input values
      setSubmissionData({
        ...submissionData,
        name: "",
        website: "",
        canister: "",
      });
    } catch (err) {
      console.log(err);
    }
    setSubmitState("Your project has been successfully submitted ✔️");
  };

  return (
    <section className={`${css.sApp} container768`}>
      <h2 className={css.sApp__title}>Submit Your Project</h2>
      <form className={css.sApp__form} onSubmit={handleSubmit}>
        {/* NAME */}

        {inputs.map((input, i) => (
          <motion.div
            className={css.sApp__form__group}
            whileTap={{ scale: 0.99 }}
            key={i}
          >
            <label
              className={css.sApp__form__group__label}
              htmlFor={input.name}
            >
              {input.label}
            </label>
            <input
              className={css.sApp__form__group__input}
              type="text"
              id={input.name}
              name={input.name}
              placeholder={input.placeholder}
              autoComplete="off"
              value={input.data}
              onChange={handleInput}
            />
          </motion.div>
        ))}

        <SubmitBtn submitState={submitState} />
      </form>
    </section>
  );
};

export default SubmitApp;
