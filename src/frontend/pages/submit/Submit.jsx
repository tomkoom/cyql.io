import React, { useState } from "react"
import css from "./Submit.module.css"

// constants
import { SUBMITTED_PROJECTS_COLL } from "@/constants/constants"

// components
import { Categories, Inputs, SubmissionSuccess, SubmitBtn } from "./_index"
import { Loading } from "@/components/ui/_index"

// state
import { useAppSelector } from "@/hooks/useRedux"
import { selectSubmit } from "@/state/submit/submit"
import { selectCategoriesSortedByNum } from "@/state/categories/categoriesSortedByNum"

const Submit = () => {
  const [submitIsLoading, setSubmitIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const submit = useAppSelector(selectSubmit)
  const categoriesSortedByNum = useAppSelector(selectCategoriesSortedByNum)
  const collection = SUBMITTED_PROJECTS_COLL

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitIsLoading(true)

    const key = ""
    const timestamp = Date.now()
    // await setDoc({
    //   collection,
    //   doc: {
    //     key,
    //     data: {
    //       ...submit,
    //       added: timestamp,
    //     },
    //   },
    // }).then(() => {
    //   console.log(`Doc added with the key ${key}.`);
    //   setIsSubmitted(true);
    // });

    setSubmitIsLoading(false)
  }

  if (categoriesSortedByNum.length < 1) {
    return <Loading />
  }

  if (isSubmitted) {
    return <SubmissionSuccess />
  }

  return (
    <div className={css.submit}>
      <div className={css.main}>
        <h2 className="pageTitle">add your project to cyql.io</h2>
        <form className={css.form} onSubmit={handleSubmit}>
          <Categories />
          <Inputs />

          <SubmitBtn submitIsLoading={submitIsLoading} />
        </form>
      </div>
    </div>
  )
}

export default Submit
