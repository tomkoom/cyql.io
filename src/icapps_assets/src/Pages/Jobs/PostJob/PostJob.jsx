import React from "react";
import css from "./PostJob.module.css";

// components
import Inputs from "./Inputs/Inputs";
import { BackBtn } from "../../../Components/index";

const PostJob = () => {
  return (
    <div className={css.postJob}>
      <div className={css.title}>
        <BackBtn />
        <h2 className="pageTitle">Post a Job</h2>
      </div>

      {/* inputs */}
      <div>
        <Inputs />
      </div>
    </div>
  );
};

export default PostJob;
