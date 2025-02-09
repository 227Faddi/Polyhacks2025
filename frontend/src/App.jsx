import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Planet from "./components/Planet";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/:planet" element={<Planet />}></Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
