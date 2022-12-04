import React from "react";

// twitter
import { Timeline } from "react-twitter-widgets";

// utils
import { getTwitterUsername } from "@utils/format";

// state
import { useSelector } from "react-redux";
import { selectTheme } from "@state/theme";

const TwitterTimeline = ({ twitter }) => {
  const theme = useSelector(selectTheme);

  return (
    <Timeline
      dataSource={{
        sourceType: "profile",
        screenName: getTwitterUsername(twitter),
      }}
      options={{ chrome: "noheader, nofooter", theme, height: "600" }}
    />
  );
};

export default TwitterTimeline;
