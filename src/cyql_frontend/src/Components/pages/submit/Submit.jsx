import React, { useState } from "react";
import css from "./Submit.module.css";

// components
import { Categories, Inputs } from "./inputs/index";
import { Loading, ReCaptchaComponent, SubmissionSuccess, SubmitBtn } from "./index";

// state
import { useSelector } from "react-redux";
import { selectProjectSubmissionData } from "@state/projectSubmission";
import { selectCategoriesSortedByNum } from "@state/categories/categoriesSortedByNum";

// firestore
import { submittedProjectsCollRef } from "@firestore/firestore-collections";
import { addDoc } from "firebase/firestore";

const Submit = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [submissionLoader, setSubmissionLoader] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const projectSubmissionData = useSelector(selectProjectSubmissionData);
  const categoriesSortedByNum = useSelector(selectCategoriesSortedByNum);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionLoader(true);
    try {
      await addDoc(submittedProjectsCollRef, {
        ...projectSubmissionData,
        submissionDate: Date.now(),
      });
      setIsSubmitted(true);
    } catch (e) {
      console.log(e);
    }
    setSubmissionLoader(false);
  };

  return (
    <div className={css.submit}>
      {categoriesSortedByNum.length < 1 ? (
        <Loading />
      ) : (
        <div className={css.main}>
          {isSubmitted === false ? (
            <div className={css.content}>
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
      )}
    </div>
  );
};

export default Submit;
