import { useRef, useState } from "react";

//----------------------------------------------------------------------------//

const useStarfield = () => {
  const timeoutIdRef = useRef<number>();
  const [ speed, setSpeed ] = useState(1);

  const toggle = () => setSpeed(speed <= 0 ? 1 : 0);

  const changeSpeed = (newSpeed: number, delayInMs: number = 0) => {
    if (speed > 0) {
      clearTimeout(timeoutIdRef.current);

      if (delayInMs > 0) {
        timeoutIdRef.current = window.setTimeout(() => {
          if (speed > 0) setSpeed(newSpeed)
        }, delayInMs);
      }
      else {
        setSpeed(newSpeed);
      }
    }
  };
  
  return { speed, changeSpeed, toggle };
};

//----------------------------------------------------------------------------//

export default useStarfield;
