import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import CreatePlanet from "./pages/CreatePlanet";
import Home from "./pages/Home";
import Planet from "./pages/Planet";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home />} />
        <Route path="/:planet" element={<Planet />}></Route>
        <Route path="/create" element={<CreatePlanet />} />
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
