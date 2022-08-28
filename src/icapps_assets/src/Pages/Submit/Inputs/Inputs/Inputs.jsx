import React from "react";
import css from "./Inputs.module.css";

// inputs
import { main, links, linksSoc, linksIC, img, notes, nft } from "./inputsItems";

// components
import InputsItem from "./InputsItem/InputsItem";

// state
import { useSelector } from "react-redux";
import { selectProjectSubmissionData } from "../../../../State/projectSubmission";

const Inputs = () => {
  const projectSubmissionData = useSelector(selectProjectSubmissionData);

  return (
    <div className={css.inputs}>
      <InputsItem inputs={main} />
      <InputsItem inputs={links} />
      <InputsItem inputs={linksSoc} />
      <InputsItem inputs={linksIC} />
      <InputsItem inputs={img} />
      <InputsItem inputs={notes} />
      {/* nft */}
      {projectSubmissionData.category === "nfts" && <InputsItem inputs={nft} />}
    </div>
  );
};

export default Inputs;
