import React from "react";
import css from "./JobModal.module.css";

// icons
import CrossIcon from "../../Icons/CrossIcon/CrossIcon";

// components
import { AboutPosition, CompanyDetails, Contact, OriginalPostBtn, Title, Website } from "./index";

// state
import { useDispatch, useSelector } from "react-redux";
import { setJobModal } from "../../State/modals";
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
        <div className={css.header}>
          <Title title={j.title} category={j.category} />
          <CrossIcon onClick={closeModal} />
        </div>

        <div className={css.data}>
          <div className={css.position}>
            <AboutPosition
              description={j.description}
              compensation={j.compensation}
              equity={j.equity}
            />
          </div>

          <div className={css.company}>
            <CompanyDetails
              companyName={j.companyName}
              companyWebsite={j.companyWebsite}
              companyTwitter={j.companyTwitter}
              companyLogoUrl={j.companyLogoUrl}
            />
            {j.sourceUrl && <OriginalPostBtn sourceUrl={j.sourceUrl} />}
            {/* {j.contactEmail || j.contactTwitter || j.contactDiscord ? <Contact /> : ""}
            {j.applicationUrl ? <Website /> : ""} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobModal;
