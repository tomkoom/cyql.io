import React from "react";

const style = {
  catloader: {
    display: "flex",
    justifyContent: "center",
  },
  catloader__img: {
    width: "54px",
    heigth: "54px",
    objectFit: "contain",
  },
};

const CatLoader = () => {
  return (
    <div style={style.catloader}>
      <img
        style={style.catloader__img}
        src="https://i.postimg.cc/hvGKNnM6/cat-loader.gif"
        alt="Loader"
      />
    </div>
  );
};

export default CatLoader;
