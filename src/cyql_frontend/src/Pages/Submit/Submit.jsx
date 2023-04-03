import React, { useState } from "react";
import css from "./Submit.module.css";

// components
import { Categories, Inputs } from "./Inputs/index";
import { SubmitBtn, ReCaptchaComponent } from "./SubmitBtn/index";
import SubmissionSuccess from "./SubmissionSuccess/SubmissionSuccess";

// state
import { useSelector } from "react-redux";
import { selectProjectSubmissionData } from "@state/projectSubmission";

// firestore
import { submittedProjectsCollRef } from "@firestore/firestore-collections";
import { addDoc } from "firebase/firestore";

const SubmitNew = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [submissionLoader, setSubmissionLoader] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const projectSubmissionData = useSelector(selectProjectSubmissionData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionLoader(true);
    try {
      await addDoc(submittedProjectsCollRef, {
        ...projectSubmissionData,
        submissionDate: Date.now(),
      });
      setIsSubmitted(true);
    } catch (err) {
      console.log(err);
      // toast
    }
    setSubmissionLoader(false);
  };

  return (
    <div className={css.submit}>
      {!isSubmitted ? (
        <div>
          <h2 className="pageTitle">submit your project</h2>
          <form className={css.form} onSubmit={handleSubmit}>
            <div className={css.inputs}>
              <Categories />
              <Inputs />
            </div>

            {/* submit */}
            <div className={css.submitBtn}>
              <ReCaptchaComponent setIsVerified={setIsVerified} />
              <SubmitBtn submissionLoader={submissionLoader} isVerified={isVerified} />
            </div>
          </form>
        </div>
      ) : (
        <SubmissionSuccess />
      )}
    </div>
  );
};

export default SubmitNew;
