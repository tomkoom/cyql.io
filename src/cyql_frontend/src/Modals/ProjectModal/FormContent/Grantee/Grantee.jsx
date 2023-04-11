import React from "react";
import css from "./Grantee.module.css";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectProject, setProjectGrantee } from "@state/modals/projectModal/projectModal";

const Grantee = () => {
  const dispatch = useDispatch();
  const p = useSelector(selectProject);

  const setGrantee = (v) => {
    dispatch(setProjectGrantee(v));
  };

  return (
    <div className={css.grantee}>
      <div className={css.label}>Grantee</div>

      <div className={css.btns}>
        <button
          className={p.grantee ? `${css.btn} ${css.active}` : css.btn}
          onClick={() => setGrantee(true)}
        >
          true
        </button>
        <button
          className={!p.grantee ? `${css.btn} ${css.active}` : css.btn}
          onClick={() => setGrantee(false)}
        >
          false
        </button>
      </div>
    </div>
  );
};

export default Grantee;
