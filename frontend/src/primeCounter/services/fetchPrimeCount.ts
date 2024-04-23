import { PrimeCounterRequest, PrimeCounterResponse } from "../Model";

//----------------------------------------------------------------------------//

const fetchPrimeCount = async (
  k: PrimeCounterRequest
): Promise<PrimeCounterResponse> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/pi/${k}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  });

  if (response.status == 200) {
    return (await response.json()) as PrimeCounterResponse;
  } else {
    throw Error(await response.text());
  }
};

//----------------------------------------------------------------------------//

export default fetchPrimeCount;
