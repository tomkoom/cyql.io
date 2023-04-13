import React from "react";
import css from "./Grantee.module.css";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectProjectDoc, setProjectGrantee } from "@state/modals/projectModal/projectModal";

const Grantee = () => {
  const dispatch = useDispatch();
  const projectDoc = useSelector(selectProjectDoc);

  const setGrantee = (value) => {
    dispatch(setProjectGrantee(value));
  };

  return (
    <div className={css.grantee}>
      <div className={css.label}>Grantee</div>

      <div className={css.btns}>
        <button
          className={projectDoc.data.grantee ? `${css.btn} ${css.active}` : css.btn}
          onClick={() => setGrantee(true)}
        >
          true
        </button>
        <button
          className={!projectDoc.data.grantee ? `${css.btn} ${css.active}` : css.btn}
          onClick={() => setGrantee(false)}
        >
          false
        </button>
      </div>
    </div>
  );
};

export default Grantee;
