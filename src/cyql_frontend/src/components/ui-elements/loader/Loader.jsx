import React from "react";
import Loader from "react-js-loader";
// https://www.npmjs.com/package/react-js-loader

// state
import { useAppSelector } from "@/hooks/useRedux";
import { selectTheme } from "@/state/ui/theme";

const LoaderComponent = () => {
  const theme = useAppSelector(selectTheme);
  const color = theme === "dark" ? "#dde1e6" : theme === "light" ? "#21272a" : undefined;
  return <Loader type="spinner-default" bgColor={color} size={32} />;
};

export default LoaderComponent;
