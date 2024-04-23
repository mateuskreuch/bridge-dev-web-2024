import { useState } from "react";
import ResultCookieHistory from "../services/ResultCookieHistory";

//----------------------------------------------------------------------------//

const useResultHistory = () => {
  const [ show   , setShow    ] = useState(false);
  const [ history, setHistory ] = useState(() => ResultCookieHistory.get());

  const addEntry = (input: string, count: string) => {
    setHistory(ResultCookieHistory.addAndSave(history, input, count));
  };

  const clear = () => {
    setHistory([]);
    ResultCookieHistory.clear();
  };

  return { history, addEntry, clear, show, setShow };
};

//----------------------------------------------------------------------------//

export default useResultHistory;
