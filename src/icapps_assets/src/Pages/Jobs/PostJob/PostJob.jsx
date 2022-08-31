import React, { useState } from "react";
import css from "./PostJob.module.css";

// components
import { BackBtn } from "../../../Components/index";
import Inputs from "./Inputs/Inputs";
import SubmitBtn from "./SubmitBtn/SubmitBtn";

const PostJob = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = () => {
    setIsSubmitting(true);
    try {
      console.log("123");
    } catch (error) {
      console.log(err);
    }
    setIsSubmitting(false);
  };

  return (
    <div className={css.postJob}>
      <div className={css.title}>
        <BackBtn />
        <h2 className="pageTitle">Post a Job</h2>
      </div>

      {/* inputs */}
      <div>
        <form action="" onSubmit={handleFormSubmit}>
          <Inputs />
          <SubmitBtn isSubmitting={isSubmitting} />
        </form>
      </div>
    </div>
  );
};

export default PostJob;
