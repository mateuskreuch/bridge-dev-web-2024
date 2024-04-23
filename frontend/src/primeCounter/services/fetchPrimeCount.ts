import { PrimeCountRequest, PrimeCountResponse } from "../Model";

//----------------------------------------------------------------------------//

const fetchPrimeCount = async (
  k: PrimeCountRequest
): Promise<PrimeCountResponse> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/pi/${k}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  });

  if (response.status == 200) {
    return (await response.json()) as PrimeCountResponse;
  } else {
    throw Error(await response.text());
  }
};

//----------------------------------------------------------------------------//

export default fetchPrimeCount;
