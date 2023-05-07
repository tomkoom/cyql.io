import React from "react";
import css from "./Inputs.module.css";

// inputs
import { main, links, linksSoc, linksIC, img, notes, nft } from "./inputsItems";

// components
import Input from "./input/Input";

// state
import { useSelector } from "react-redux";
import { selectSubmit } from "@state/submit/submit";

const Inputs = () => {
  const submit = useSelector(selectSubmit);

  return (
    <div className={css.inputs}>
      <Input inputs={main} />
      <Input inputs={links} />
      <Input inputs={linksSoc} />
      <Input inputs={linksIC} />
      <Input inputs={img} />
      <Input inputs={notes} />
      {/* nft */}
      {submit.category === "nfts" && <Input inputs={nft} />}
    </div>
  );
};

export default Inputs;
