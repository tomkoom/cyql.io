import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const [deviceSize, setDeviceSize] = useState([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    const handleResize = () => {
      setDeviceSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return deviceSize;
};
