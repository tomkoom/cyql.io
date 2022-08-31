import React, { useState } from "react";
import css from "./PostJob.module.css";

// components
import { BackBtn } from "../../../Components/index";
import Inputs from "./Inputs/Inputs";
import SubmitBtn from "./SubmitBtn/SubmitBtn";

// auth
import { useAuth } from "../../../Context/AuthContext";

// state
import { useSelector, useDispatch } from "react-redux";
import { setSignInModal } from "../../../State/modals";
import { selectJob } from "../../../State/jobs/job";

const PostJob = () => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { principalIdStr } = useAuth();
  const job = useSelector(selectJob);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (principalIdStr !== "") {
      setIsSubmitting(true);
      console.log(job);
      // try {
      // } catch (error) {
      //   console.log(err);
      // }
      setIsSubmitting(false);
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
      <form className={css.form} onSubmit={handleFormSubmit}>
        <Inputs />
        <SubmitBtn isSubmitting={isSubmitting} />
      </form>
    </div>
  );
};

export default PostJob;
