import React from "react";

// twitter
import { Timeline } from "react-twitter-widgets";

// utils
import { twitterUsername } from "@/utils/twitterUsername";

// state
import { useSelector } from "react-redux";
import { selectTheme } from "@/state/ui/theme";

const TwitterTimeline = ({ twitter }) => {
  const theme = useSelector(selectTheme);

  return (
    <Timeline
      dataSource={{
        sourceType: "profile",
        screenName: twitterUsername(twitter),
      }}
      options={{ chrome: "noheader, nofooter", theme, height: "600" }}
    />
  );
};

export default TwitterTimeline;
