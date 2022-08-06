import React, { useState, useEffect } from "react";

// Custom Hook
function useWindowSize() {
  const firstLoad = useRef(true)
  const [windowSize, setWindowSize] = useState({
    width: null,
    height: null,
  });

  const handleResize = () => {
    // Set window width/height to state
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  useEffect(() => {
    // Handler to call on window resize
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); //

  return windowSize;
}

export default useWindowSize
