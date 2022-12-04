import React from "react";
import css from "./Twitter.module.css";

// components
import TwitterTimeline from "./TwitterTimeline/TwitterTimeline";

const Twitter = ({ name, twitter }) => {
  return (
    <div className={css.twitter}>
      <h5 className={css.title}>{name} Twitter</h5>
      <TwitterTimeline twitter={twitter} />
    </div>
  );
};

export default Twitter;
