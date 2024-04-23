import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PrimeCounterView from "./primeCounter/PrimeCounterView";

//----------------------------------------------------------------------------//

const router = createBrowserRouter([
  {
    path: import.meta.env.VITE_BASE,
    element: <PrimeCounterView />,
  },
]);

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

//----------------------------------------------------------------------------//

export default App;