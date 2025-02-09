import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./Home";
import Planet from "./components/Planet";
import PlanetCreator from "./PlanetCreator";
import Search from "./Search";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home />} />
        <Route path="/:planet" element={<Planet />}></Route>
        <Route path="/create" element={<PlanetCreator />} />
        <Route path="/search" element={<Search />} />
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
