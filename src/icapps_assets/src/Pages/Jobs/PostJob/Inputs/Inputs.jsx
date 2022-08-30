import React from "react";
import css from "./Inputs.module.css";

// components
import Input from "./Input/Input";

const Inputs = () => {
  return (
    <div className={css.inputs}>
      <Input />
    </div>
  );
};

export default Inputs;
