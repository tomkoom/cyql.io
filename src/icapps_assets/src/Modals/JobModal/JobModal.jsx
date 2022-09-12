import React from "react";
import css from "./JobModal.module.css";

// icons
import { iExternalLink } from "../../Icons/Icons";
import CrossIcon from "../../Icons/CrossIcon/CrossIcon";

// components
import { CompanyDetails, Contact, Website } from "./index";

// state
import { useDispatch, useSelector } from "react-redux";
import { setJobModal, selectJobModal } from "../../State/modals";
import { selectActiveJob, setActiveJob } from "../../State/jobs/job";

const JobModal = () => {
  const dispatch = useDispatch();
  const jobModal = useSelector(selectJobModal);
  const j = useSelector(selectActiveJob);

  const closeModal = () => {
    dispatch(setJobModal(false));
    dispatch(setActiveJob(undefined));
  };

  return (
    <div className={jobModal ? `${css.modal} ${css.active}` : css.modal} onClick={closeModal}>
      <div className={css.content} onClick={(e) => e.stopPropagation()}>
        <div className={css.top}>
          <div className={css.titleContainer}>
            <h3 className={css.title}>{j.title}</h3>
            <span className={css.category}>{j.category}</span>
          </div>
          <CrossIcon onClick={closeModal} />
        </div>
        <div className={css.position}>
          {j.sourceUrl && (
            <a
              className={css.originalPost}
              href={j.sourceUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              Original post {iExternalLink}
            </a>
          )}
          <p className={css.description}>{j.description}</p>
          {j.compensation && (
            <div>
              <p>Compensation</p>
              <p>{j.compensation}</p>
            </div>
          )}
          {j.equity && (
            <div>
              <p>Equity</p>
              <p>{j.equity}</p>
            </div>
          )}
        </div>
        {j.companyName || j.companyWebsite || j.companyTwitter ? <CompanyDetails /> : ""}
        {j.contactEmail || j.contactTwitter || j.contactDiscord ? <Contact /> : ""}
        {j.applicationUrl ? <Website /> : ""}
      </div>
    </div>
  );
};

export default JobModal;
