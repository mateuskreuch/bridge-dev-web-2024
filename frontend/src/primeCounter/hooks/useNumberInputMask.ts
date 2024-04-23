import { RefObject, useEffect } from "react";

//----------------------------------------------------------------------------//

const NON_DIGITS_REGEX = /\D+/g;

const useNumberInputMask = (ref: RefObject<HTMLInputElement>) => {
  useEffect(() => {
    const input = ref.current!;
    
    const removeNonDigits = () => {
      input.value = input.value.replace(NON_DIGITS_REGEX, "");
    }

    input.addEventListener('input', removeNonDigits);

    return () => input.removeEventListener('input', removeNonDigits);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

//----------------------------------------------------------------------------//

export default useNumberInputMask;
