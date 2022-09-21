import React, { useState } from "react";
import css from "./PostJob.module.css";

// components
import { BackBtn } from "../../../Components/index";
import Inputs from "./Inputs/Inputs";
import SubmitBtn from "./SubmitBtn/SubmitBtn";
import JobSubmitted from "./JobSubmitted/JobSubmitted";

// auth
import { useAuth } from "../../../Context/AuthContext";

// state
import { useSelector, useDispatch } from "react-redux";
import { setSignInModal } from "../../../State/modals";
import { selectJob } from "../../../State/jobs/job";

const PostJob = () => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jobSubmitted, setJobSubmitted] = useState(false);
  const { actor, principalIdStr } = useAuth();
  const job = useSelector(selectJob);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (actor !== undefined && principalIdStr !== "") {
      try {
        setIsSubmitting(true);
        const timestamp = Date.now();
        const jobObj = { ...job, submitted: timestamp, publisher: principalIdStr };
        await actor.addJob(jobObj).catch((err) => console.log(err));
        setIsSubmitting(false);
        setJobSubmitted(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      dispatch(setSignInModal(true));
    }
  };

  return (
    <div className={css.postJob}>
      <div className={css.title}>
        <BackBtn />
        <h2 className="pageTitle">Post a Job</h2>
      </div>

      {/* form */}
      {!jobSubmitted ? (
        <form className={css.form} onSubmit={handleFormSubmit}>
          <Inputs />
          <SubmitBtn isSubmitting={isSubmitting} />
        </form>
      ) : (
        <JobSubmitted />
      )}
    </div>
  );
};

export default PostJob;
