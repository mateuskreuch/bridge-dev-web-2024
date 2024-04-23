import { useState } from "react";

//----------------------------------------------------------------------------//

const useResultText = (initialResult: string) => {
  const [ result, setResult ] = useState(initialResult);
  const [ label , setLabel  ] = useState<string | undefined>();
  const [ key   , setKey    ] = useState(Math.random());

  const set = (result: string, label: string) => {
    setResult(result);
    setLabel(label);
    setKey(Math.random());
  };

  return { result, label, key, set };
};

//----------------------------------------------------------------------------//

export default useResultText;
