import React, { useState } from "react";
import css from "./Submit.module.css";

// utils
import { nanoid } from "@/utils/projectId";

// constants
import { submittedProjectsColl } from "@/constants/constants";

// juno
import { setDoc } from "@junobuild/core";

// components
import { Categories, Inputs, Loading, SubmissionSuccess, SubmitBtn } from "./index";

// state
import { useAppSelector } from "@/hooks/useRedux";
import { selectSubmit } from "@/state/submit/submit";
import { selectCategoriesSortedByNum } from "@/state/categories/categoriesSortedByNum";

const Submit = () => {
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const submit = useAppSelector(selectSubmit);
  const categoriesSortedByNum = useAppSelector(selectCategoriesSortedByNum);
  const collection = submittedProjectsColl;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitIsLoading(true);

    const key = nanoid();
    const timestamp = Date.now();
    await setDoc({
      collection,
      doc: {
        key,
        data: {
          ...submit,
          added: timestamp,
        },
      },
    }).then(() => {
      console.log(`Doc added with the key ${key}.`);
      setIsSubmitted(true);
    });

    setSubmitIsLoading(false);
  };

  return (
    <div className={css.submit}>
      {categoriesSortedByNum.length < 1 ? (
        <Loading />
      ) : isSubmitted === false ? (
        <div className={css.main}>
          <h2 className="pageTitle">add your project to cyql.io</h2>
          <form className={css.form} onSubmit={handleSubmit}>
            <Categories />
            <Inputs />

            {/* submit */}
            <SubmitBtn submitIsLoading={submitIsLoading} />
          </form>
        </div>
      ) : (
        <SubmissionSuccess />
      )}
    </div>
  );
};

export default Submit;
