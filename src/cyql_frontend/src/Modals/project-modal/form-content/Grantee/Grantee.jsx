import React from "react";
import css from "./Grantee.module.css";

// components
import Btn from "./btn/Btn";

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
      <p className={css.label}>grantee</p>

      <div className={css.btns}>
        <Btn
          grantee={projectDoc.data.grantee}
          value={true}
          label={"true"}
          setGrantee={() => setGrantee(true)}
        />
        <Btn
          grantee={projectDoc.data.grantee}
          value={false}
          label={"false"}
          setGrantee={() => setGrantee(false)}
        />
        <Btn
          grantee={projectDoc.data.grantee}
          value={null}
          label={"unset"}
          setGrantee={() => setGrantee(null)}
        />
      </div>
    </div>
  );
};

export default Grantee;
