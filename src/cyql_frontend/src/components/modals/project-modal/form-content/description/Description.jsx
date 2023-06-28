import React from "react";
import css from "./Description.module.css";

// state
import { useSelector, useDispatch } from "react-redux";
import {
  selectProjectDescription,
  setProjectDescription,
} from "@/state/modals/projectModal/projectModal";

const Description = () => {
  const dispatch = useDispatch();
  const description = useSelector(selectProjectDescription);
  const setDescription = (e) => {
    dispatch(setProjectDescription(e.target.value));
  };

  return (
    <div className={css.description}>
      <label htmlFor="project-description">description</label>
      <textarea value={description} onChange={setDescription} id="project-description" rows="6" />
    </div>
  );
};

export default Description;
