import React from "react";
import css from "./Tab.module.css";

// state
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab, selectActiveTab } from "../../../../State/jobs/activeTab";

const Tab = ({ id, label }) => {
  const dispatch = useDispatch();
  const activeTab = useSelector(selectActiveTab);

  const changeTab = (tab) => {
    dispatch(setActiveTab(tab));
  };

  return (
    <li
      className={activeTab === id ? `${css.tab} ${css.active}` : css.tab}
      onClick={() => changeTab(id)}
    >
      {label}
    </li>
  );
};

export default Tab;
