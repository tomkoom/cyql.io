import React from "react";
import Loader from "react-js-loader";
// https://www.npmjs.com/package/react-js-loader

const SquareLoader = () => {
  return (
    <div>
      <Loader
        type="spinner-default"
        bgColor={"#FFFFFF"}
        // title={"spinner-default"}
        size={32}
      />
    </div>
  );
};

export default SquareLoader;
