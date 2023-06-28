import React from "react";
import css from "./Meta.module.css";

// components
import { Input } from "./index";
import { Btn } from "../index";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectProjectDoc } from "@/state/modals/projectModal/projectModal";
import { setProjectArchived } from "@/state/modals/projectModal/projectModal";

const Meta = () => {
  const dispatch = useDispatch();
  const projectDoc = useSelector(selectProjectDoc);

  const setArchived = (value) => {
    dispatch(setProjectArchived(value));
  };

  return (
    <div className={css.meta}>
      <div className={css.inputs}>
        <Input label={"added"} value={projectDoc.data.added} id={"project-added"} />
        <Input label={"updated"} value={projectDoc.data.updated} id={"project-updated"} />
      </div>

      <div className={css.btns}>
        <p className={css.sectionName}>archived</p>

        <div className={css.btnsList}>
          <Btn
            property={projectDoc.data.archived}
            value={true}
            label={"true"}
            setProperty={setArchived}
          />
          <Btn
            property={projectDoc.data.archived}
            value={false}
            label={"false"}
            setProperty={setArchived}
          />
        </div>
      </div>
    </div>
  );
};

export default Meta;
