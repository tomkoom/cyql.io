import React from "react";
import css from "./Description.module.css";

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import {
  selectProjectDescription,
  setProjectDescription,
} from "@/state/modals/projectModal/projectModal";

const Description = () => {
  const dispatch = useAppDispatch();
  const description = useAppSelector(selectProjectDescription);
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
