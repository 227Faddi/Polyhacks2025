import Globe from "react-globe.gl";
import { Link, useParams } from "react-router-dom";

const Planet = () => {
  const param = useParams();
  const planet = param.planet;

  return (
    <div className="h-screen relative">
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-lg shadow-sm text-white border border-white">
        <h1 className="text-5xl font-bold text-white">Planet Explorer</h1>
        <p className="text-center text-3xl uppercase mt-4">{planet}</p>
      </div>
      <div className="text-white border border-white absolute top-50 left-0 bottom-50 z-50 rounded-md p-6">
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-3xl font-bold">Statistics</h1>
          <ul className="flex flex-col space-y-6">
            <li className="text-2xl" to="/earth"></li>
            <li className="text-2xl" to="/venus">
              Mass:
            </li>
            <li className="text-2xl" to="/uranus">
              Volume:
            </li>
            <li className="text-2xl" to="/saturn">
              Density:
            </li>
            <li className="text-2xl" to="/neptune">
              Gravity:
            </li>
            <li className="text-2xl" to="/jupiter">
              Temperature:
            </li>
            <li className="text-2xl" to="/jupiter">
              Inclination:
            </li>
          </ul>
        </div>
      </div>
      <div className="text-white border border-white absolute top-50 right-0 bottom-50 z-50 rounded-md p-6">
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-3xl font-bold">Planets</h1>
          <div className="flex flex-col space-y-6 items-center">
            <Link className="text-2xl" to="/earth">
              Earth
            </Link>
            <Link className="text-2xl" to="/mercury">
              Mercury
            </Link>
            <Link className="text-2xl" to="/venus">
              Venus
            </Link>
            <Link className="text-2xl" to="/uranus">
              Uranus
            </Link>
            <Link className="text-2xl" to="/neptune">
              Neptune
            </Link>
            <Link className="text-2xl" to="/moon">
              Moon
            </Link>
            <Link className="text-2xl" to="/jupiter">
              Jupiter
            </Link>
          </div>
        </div>
      </div>
      <div className="text-white border border-white absolute left-1/2 transform -translate-x-1/2 bottom-0 z-50 rounded-t-md p-8">
        <h2 className="text-center text-2xl mb-4">Ask Something to AI</h2>
        <div className="h-full flex justify-center items-center">
          <form action="" className="flex gap-1">
            <input
              type="text"
              className="bg-white w-full text-black p-4 rounded-l-md"
              placeholder="Type Something"
            />
            <button className="bg-white text-black p-4 cursor-pointer rounded-r-md">
              Send
            </button>
          </form>
        </div>
      </div>
      <Globe
        globeImageUrl={`./textures/${planet}.jpg`}
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      />
    </div>
  );
};

export default Planet;
