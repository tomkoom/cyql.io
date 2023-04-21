import React from "react";

// auth
import { useAuth } from "@context/AuthContext";

const IdImg = ({ size }) => {
  const { principalIdStr } = useAuth();

  const style = {
    borderRadius: "50%",
    height: `${size}px`,
    width: `${size}px`,
  };

  return (
    <img
      style={style}
      src={`https://avatars.dicebear.com/api/jdenticon/${principalIdStr}.svg`}
      alt="id img"
    />
  );
};

export default IdImg;
