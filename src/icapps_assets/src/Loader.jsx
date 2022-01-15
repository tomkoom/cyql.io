import React from "react";
import Loader from "react-js-loader";
// https://www.npmjs.com/package/react-js-loader

import { useSelector } from "react-redux";

const TheLoader = () => {
  const theme = useSelector((state) => state.theme.theme.value);
  return (
    <div>
      <Loader
        type="spinner-default"
        bgColor={
          theme === "dark" ? "#f2f4f8" : theme === "light" ? "#121619" : null
        }
        size={32}
      />
    </div>
  );
};

export default TheLoader;
