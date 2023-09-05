import React, { FC } from "react";

// auth
import { useAuth } from "@/context/AuthContext";

interface IdImgProps {
  sizePx: string;
}

const IdImg: FC<IdImgProps> = ({ sizePx }): JSX.Element => {
  const { userId } = useAuth();

  const style = {
    borderRadius: "50%",
    height: `${sizePx}px`,
    width: `${sizePx}px`,
  };

  return (
    <img
      style={style}
      src={`https://avatars.dicebear.com/api/jdenticon/${userId}.svg`}
      alt="id img"
    />
  );
};

export default IdImg;
