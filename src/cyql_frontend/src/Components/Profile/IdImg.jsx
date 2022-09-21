import React from "react";

// auth
import { useAuth } from "../../Context/AuthContext";

const IdImg = ({ size }) => {
  const { principalId } = useAuth();
  const id = principalId.toHex();

  const style = {
    borderRadius: "50%",
    height: `${size}px`,
    width: `${size}px`,
  };

  return (
    <img style={style} src={`https://avatars.dicebear.com/api/jdenticon/${id}.svg`} alt="id-img" />
  );
};

export default IdImg;
