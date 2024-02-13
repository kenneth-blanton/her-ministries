import { useEffect, useState } from "react";

const CheckWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      //   console.log("Window width:", windowWidth);
      setWindowWidth(windowWidth);
    };
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowWidth;
};

export default CheckWindowWidth;
