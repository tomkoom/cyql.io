import React from "react";
import Loader from "react-js-loader";
// https://www.npmjs.com/package/react-js-loader

const TheLoader = () => {
  return (
    <div>
      <Loader type="spinner-default" bgColor={"#FFFFFF"} size={32} />
    </div>
  );
};

export default TheLoader;
