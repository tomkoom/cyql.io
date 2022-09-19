import React from "react";
import css from "./Inputs.module.css";

// inputs
import { main, links, linksSoc, linksIC, img, notes, nft } from "./inputsItems";

// components
import Input from "./Input/Input";

// state
import { useSelector } from "react-redux";
import { selectProjectSubmissionData } from "../../../../State/projectSubmission";

const Inputs = () => {
  const projectSubmissionData = useSelector(selectProjectSubmissionData);

  return (
    <div className={css.inputs}>
      <Input inputs={main} />
      <Input inputs={links} />
      <Input inputs={linksSoc} />
      <Input inputs={linksIC} />
      <Input inputs={img} />
      <Input inputs={notes} />
      {/* nft */}
      {projectSubmissionData.category === "nfts" && <Input inputs={nft} />}
    </div>
  );
};

export default Inputs;
