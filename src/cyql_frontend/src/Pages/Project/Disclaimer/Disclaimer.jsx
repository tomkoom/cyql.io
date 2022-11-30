import React from "react";

// components
import { ExpandableText } from "@components/index";

const Disclaimer = () => {
  const text1 =
    "This website is maintained by the IC enthusiasts and community. Anyone can submit their p. Not all information may be properly verified and therefore may not be accurate. DYOR and use your best judgement when dealing with the projects listed on this site and making investment decisions.";

  const text2 =
    "The information presented on this site has been provided by third parties and is made available solely for general information purposes. cyql does not warrant the accuracy of given information. The information should not be construed as professional or financial advice of any kind.";

  return <ExpandableText>{text2}</ExpandableText>;
};

export default Disclaimer;
