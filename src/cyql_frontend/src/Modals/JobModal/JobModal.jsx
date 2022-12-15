import React from "react";
import css from "./JobModal.module.css";

// components
import {
  AboutPosition,
  ApplicationUrl,
  CompanyDetails,
  Contact,
  Header,
  Meta,
  OriginalPostBtn,
} from "./index";

// state
import { useDispatch, useSelector } from "react-redux";
import { setJobModal } from "../../State/modals/modals";
import { selectActiveJob, setActiveJob } from "../../State/jobs/job";
import { selectTheme } from "../../State/theme";

const JobModal = () => {
  const dispatch = useDispatch();
  const j = useSelector(selectActiveJob);
  const theme = useSelector(selectTheme);

  const closeModal = () => {
    dispatch(setJobModal(false));
    dispatch(setActiveJob(undefined));
  };

  return (
    <div
      className={css.modal}
      style={
        theme === "light"
          ? { backgroundColor: "rgba(18, 22, 25, 0.33)" }
          : { backgroundColor: "rgba(242, 244, 248, 0.33)" }
      }
      onClick={closeModal}
    >
      <div className={css.content} onClick={(e) => e.stopPropagation()}>
        <Header title={j.title} category={j.category} closeModal={closeModal} />

        <div className={css.data}>
          <div className={css.position}>
            <AboutPosition
              description={j.description}
              compensation={j.compensation}
              equity={j.equity}
            />
            <Meta />
          </div>

          <div className={css.company}>
            <CompanyDetails
              companyName={j.companyName}
              companyWebsite={j.companyWebsite}
              companyTwitter={j.companyTwitter}
              companyLogoUrl={j.companyLogoUrl}
            />
            {j.sourceUrl && <OriginalPostBtn sourceUrl={j.sourceUrl} />}

            {j.applicationEmail || j.applicationTwitter || j.applicationDiscord ? <Contact /> : ""}
            {j.applicationUrl ? <ApplicationUrl /> : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobModal;