import React from "react";
import css from "./TwitterTimeline.module.css";

// twitter
import { Timeline } from "react-twitter-widgets";

// utils
import { getTwitterUsername } from "../../../Utils/format";

// state
import { useSelector } from "react-redux";
import { selectTheme } from "../../../State/theme";

const TwitterTimeline = ({ twitter }) => {
  const theme = useSelector(selectTheme);

  return (
    <div className={css.timeline}>
      <Timeline
        dataSource={{
          sourceType: "profile",
          screenName: getTwitterUsername(twitter),
        }}
        options={{ chrome: "noheader, nofooter", theme, height: "600" }}
      />
    </div>
  );
};

export default TwitterTimeline;
