import React from "react";
import css from "./Inputs.module.css";

// inputs
import { main, links, linksSoc, linksIC, img, notes, nft } from "./inputsItems";

// components
import Input from "./input/Input";

// state
import { useAppSelector } from "@/hooks/useRedux";
import { selectSubmit } from "@/state/submit/submit";

const Inputs = () => {
  const submit = useAppSelector(selectSubmit);

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
