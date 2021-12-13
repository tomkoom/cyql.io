import React, { useState } from "react";
import css from "./SubmitApp.module.css";
import k from "../../../../k/k";

// RECAPTCHA
import ReCAPTCHA from "react-google-recaptcha";

// FRAMER MOTION
import { motion } from "framer-motion";

// Submit button component
export const SubmitBtn = ({ submissionLoader, isVerified }) => {
  return (
    <button
      className={
        !isVerified
          ? `${css.sApp__form__group__submitBtn} ${css.disabled}`
          : css.sApp__form__group__submitBtn
      }
      disabled={!isVerified}
      type="submit"
    >
      {submissionLoader ? submissionLoader : "Submit"}
    </button>
  );
};

const SubmitApp = () => {
  // STATES
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
    // email
  });
  const [submissionLoader, setSubmissionLoader] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isSubmitted, setisSubmitted] = useState(false);

  // END STATES

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
      required: "required",
    },
    {
      label: "Website URL",
      name: "website",
      data: website,
      placeholder: "Website",
      type: "url",
      required: null,
    },
    {
      label: "Your Project's Twitter",
      name: "twitter",
      data: twitter,
      placeholder: "Enter as https://twitter.com/yourProject",
      type: "url",
      required: null,
    },
    {
      label:
        "Your Project's Discord. Make sure the invite link will not expire!",
      name: "discord",
      data: discord,
      placeholder: "Discord",
      type: "url",
      required: null,
    },
    {
      label: "Your Project's GitHub",
      name: "github",
      data: github,
      placeholder: "GitHub",
      type: "url",
      required: null,
    },
    {
      label: "Your Project's Telegram",
      name: "telegram",
      data: telegram,
      placeholder: "Telegram",
      type: "url",
      required: null,
    },
    {
      label: "Your Project's Medium",
      name: "medium",
      data: medium,
      placeholder: "Medium",
      type: "url",
      required: null,
    },
    {
      label: "Your Project's frontend canister address",
      name: "canister",
      data: canister,
      placeholder: "E.g. https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/",
      type: "text",
      required: null,
    },
    {
      label: "Dscvr",
      name: "dscvr",
      data: dscvr,
      placeholder: "Dscvr",
      type: "url",
      required: null,
    },
    {
      label: "Distrikt",
      name: "distrikt",
      data: distrikt,
      placeholder: "Distrikt",
      type: "url",
      required: null,
    },
    {
      label: "Open Chat",
      name: "openChat",
      data: openChat,
      placeholder: "Open Chat",
      type: "url",
      required: null,
    },
    {
      label: "Almost done! Please enter a short description of your project",
      name: "description",
      data: description,
      placeholder: "Short description",
      type: "text",
      required: null,
    },
    {
      label: "Logo image URL",
      name: "logoUrl",
      data: logoUrl,
      placeholder: "Logo img URL",
      type: "url",
      required: null,
    },
    {
      label: "Cover image URL (min 1200x400px for best perfomance)",
      name: "coverUrl",
      data: coverUrl,
      placeholder: "Cover img URL",
      type: "url",
      required: null,
    },
    {
      label: "Any additional notes",
      name: "notes",
      data: notes,
      placeholder: "Notes",
      type: "text",
      required: null,
    },
    // Category
  ];

  // Set state on input change
  const handleInput = (e) => {
    setSubmissionData({ ...submissionData, [e.target.name]: e.target.value });
  };

  // Submit data to db
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionLoader("Submitting...");
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
    setisSubmitted(true);
  };

  // RECAPTCHA
  function onRecaptcha() {
    setIsVerified(true);
  }

  return (
    <section className={`${css.sApp} container768`}>
      {!isSubmitted ? (
        <div>
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
                  required={input.required}
                />
              </motion.div>
            ))}
            {/* Test recaptcha site key: 6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI */}
            <div className={css.recaptcha}>
              <ReCAPTCHA
                sitekey={k.RECAPTCHA_SITE_KEY}
                onChange={onRecaptcha}
              />
            </div>

            <SubmitBtn
              submissionLoader={submissionLoader}
              isVerified={isVerified}
            />
          </form>
        </div>
      ) : (
        <div className={css.submissionSuccess}>
          <div className={css.submissionSuccess__content}>
            <div className={css.partyParrot} />
            <p className="bodyTextLight">
              Your project has been successfully submitted!
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default SubmitApp;
