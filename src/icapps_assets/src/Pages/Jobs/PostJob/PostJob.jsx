import React, { useState } from "react";
import css from "./PostJob.module.css";

// backend
import { Actor, HttpAgent } from "@dfinity/agent";
import {
  canisterId as cyqlCanisterId,
  idlFactory as cyqlIdlFactory,
} from "../../../../../declarations/icapps/index";

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

// host
// const host = "https://mainnet.dfinity.network";
const hostLocal = "http://127.0.0.1:8080/";
const cyqlCanisterIdLocal = "rrkah-fqaaa-aaaaa-aaaaq-cai";

const PostJob = () => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { principalIdStr } = useAuth();
  const job = useSelector(selectJob);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (principalIdStr !== "") {
      try {
        setIsSubmitting(true);
        const cyql = Actor.createActor(cyqlIdlFactory, {
          agent: new HttpAgent({ hostLocal }),
          canisterId: cyqlCanisterIdLocal,
        });

        const timestamp = Date.now();
        const timestampStr = timestamp.toString();
        const jobObj = { ...job, submitted: timestampStr, publisher: principalIdStr };
        await cyql.addJob(jobObj).then((res) => console.log(res));
        setIsSubmitting(false);
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
      <form className={css.form} onSubmit={handleFormSubmit}>
        <Inputs />
        <SubmitBtn isSubmitting={isSubmitting} />
      </form>
    </div>
  );
};

export default PostJob;
