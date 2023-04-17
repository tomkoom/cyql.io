import React from "react";
import css from "./Grantee.module.css";

// components
import { Btn } from "../index";

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
      <p className={css.sectionName}>grantee</p>

      <div className={css.btns}>
        <Btn
          property={projectDoc.data.grantee}
          value={true}
          label={"true"}
          setProperty={setGrantee}
        />
        <Btn
          property={projectDoc.data.grantee}
          value={false}
          label={"false"}
          setProperty={setGrantee}
        />
        <Btn
          property={projectDoc.data.grantee}
          value={null}
          label={"unset"}
          setProperty={setGrantee}
        />
      </div>
    </div>
  );
};

export default Grantee;
