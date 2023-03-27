import React from "react";
import L from "react-js-loader";
// https://www.npmjs.com/package/react-js-loader

import { useSelector } from "react-redux";
import { selectTheme } from "@state/theme";

const Loader = () => {
  const t = useSelector(selectTheme);
  const color = t === "dark" ? "#dde1e6" : t === "light" ? "#21272a" : undefined;
  return <L type="spinner-default" bgColor={color} size={32} />;
};

export default Loader;
