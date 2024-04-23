import { useState } from "react";
import ResultHistoryStorage from "../services/ResultHistoryStorage";

//----------------------------------------------------------------------------//

const useResultHistory = () => {
  const [ show   , setShow    ] = useState(false);
  const [ history, setHistory ] = useState(() => ResultHistoryStorage.get());

  const addEntry = (input: string, count: string) => {
    setHistory(ResultHistoryStorage.addAndSave(history, input, count));
  };

  const clear = () => {
    setHistory([]);
    ResultHistoryStorage.clear();
  };

  return { history, addEntry, clear, show, setShow };
};

//----------------------------------------------------------------------------//

export default useResultHistory;
