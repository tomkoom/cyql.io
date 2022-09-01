import React, { useState } from "react";
import css from "./HowToApply.module.css";

// components
import { ByContact, ByWebsite, Radios } from "./index";

const HowToApply = () => {
  const [howToApply, setHowToApply] = useState(undefined);

  return (
    <div>
      <Radios setHowToApply={setHowToApply} />
      <div className={css.inputs}>
        {howToApply === "byWebsite" ? (
          <ByWebsite />
        ) : howToApply === "byContact" ? (
          <ByContact />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default HowToApply;
