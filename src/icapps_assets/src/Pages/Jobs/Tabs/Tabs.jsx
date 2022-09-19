import React from "react";
import css from "./Tabs.module.css";

// components
import Tab from "./Tab/Tab";

const Tabs = () => {
  return (
    <ul className={css.tabs}>
      <Tab id="hiring" label="Hiring" />
      <Tab id="seeking" label="Seeking" />
    </ul>
  );
};

export default Tabs;
