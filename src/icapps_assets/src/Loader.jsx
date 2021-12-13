import React from "react";
import Loader from "react-js-loader";
// https://www.npmjs.com/package/react-js-loader

const SquareLoader = () => {
  return (
    <div>
      <Loader
        type="bubble-spin"
        bgColor={"#FFFFFF"}
        // title={"bubble-spin"}
        color={"#FFFFFF"}
        size={48}
      />
    </div>
  );
};

export default SquareLoader;
