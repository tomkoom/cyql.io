import React from "react";

// auth
import { useAuth } from "@context/AuthContext";

const IdImg = ({ size }) => {
  const { userKey } = useAuth();

  const style = {
    borderRadius: "50%",
    height: `${size}px`,
    width: `${size}px`,
  };

  return (
    <img
      style={style}
      src={`https://avatars.dicebear.com/api/jdenticon/${userKey}.svg`}
      alt="id img"
    />
  );
};

export default IdImg;
