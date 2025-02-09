import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import { Link } from "react-router-dom";
import AIMessage from "../components/AIMessage";

const CreatePlanet = () => {
  const globeRef = useRef();

  const [texture, setTexture] = useState(
    "./textures/generator/textures/Alpine.jpg"
  );

  const changeTexture = (direction) => {
    const textures = [
      "./textures/generator/textures/Alpine.jpg",
      "./textures/generator/textures/Icy.jpg",
      "./textures/generator/textures/Martian.jpg",
      "./textures/generator/textures/Savannah.jpg",
      "./textures/generator/textures/Swamp.jpg",
      "./textures/generator/textures/Tropical.jpg",
      "./textures/generator/textures/Venusian.jpg",
      "./textures/generator/textures/Volcanic.jpg",
    ];
    const currentIndex = textures.indexOf(texture);
    const nextIndex =
      direction === "left"
        ? (currentIndex - 1 + textures.length) % textures.length
        : (currentIndex + 1) % textures.length;
    setTexture(textures[nextIndex]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (globeRef.current) {
        globeRef.current.controls().autoRotate = true;
        globeRef.current.controls().autoRotateSpeed = 0.8;
      }
    }, 10);

    return () => clearInterval(interval);
  }, []);

  const [planetData, setPlanetData] = useState({
    mass: "",
    volume: "",
    density: "",
    gravity: "",
    temperature: "",
    inclination: "",
    waterPresence: false,
  });

  const prompt = `
    Based on the following planetary data, evaluate its habitability in no more than 5 sentences:
    - Mass: ${planetData.mass} kg
    - Volume: ${planetData.volume} km³
    - Density: ${planetData.density} g/cm³
    - Gravity: ${planetData.gravity} m/s²
    - Temperature: ${planetData.temperature} K
    - Inclination: ${planetData.inclination}°
    - Water Presence: ${planetData.waterPresence}

    Consider factors like temperature, gravity, and water presence to determine if the planet could support life. Please provide a brief assessment.
  `;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPlanetData({
      ...planetData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="h-screen relative">
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-lg shadow-sm text-white border border-white">
        <Link to="/" className="text-5xl font-bold text-white cursor-pointer">
          Orbitron
        </Link>
        <p className="text-center text-3xl uppercase mt-4">Your Planet</p>
      </div>
      <div className="text-white border border-white absolute left-0 top-1/2 transform -translate-y-1/2 z-50 rounded-md p-6">
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-3xl font-bold">Parameters</h2>
          <form className="space-y-6">
            <div className="flex flex-col">
              <label htmlFor="mass" className="text-white mb-2">
                Mass (kg):
              </label>
              <input
                type="number"
                id="mass"
                name="mass"
                value={planetData.mass}
                onChange={handleChange}
                className="p-2 rounded bg-gray-700 text-white placeholder-gray-400"
                placeholder="5.97237 × 10²⁴"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="volume" className="text-white mb-2">
                Volume (km³):
              </label>
              <input
                type="number"
                id="volume"
                name="volume"
                value={planetData.volume}
                onChange={handleChange}
                className="p-2 rounded bg-gray-700 text-white placeholder-gray-400"
                placeholder="1.08321 × 10¹²"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="density" className="text-white mb-2">
                Density (g/cm³):
              </label>
              <input
                type="number"
                id="density"
                name="density"
                value={planetData.density}
                onChange={handleChange}
                className="p-2 rounded bg-gray-700 text-white placeholder-gray-400"
                placeholder="5.5136"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="gravity" className="text-white mb-2">
                Gravity (m/s²):
              </label>
              <input
                type="number"
                id="gravity"
                name="gravity"
                value={planetData.gravity}
                onChange={handleChange}
                className="p-2 rounded bg-gray-700 text-white placeholder-gray-400"
                placeholder="9.8"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="temperature" className="text-white mb-2">
                Temperature (K):
              </label>
              <input
                type="number"
                id="temperature"
                name="temperature"
                value={planetData.temperature}
                onChange={handleChange}
                className="p-2 rounded bg-gray-700 text-white placeholder-gray-400"
                placeholder="288"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="inclination" className="text-white mb-2">
                Inclination (°):
              </label>
              <input
                type="number"
                id="inclination"
                name="inclination"
                value={planetData.inclination}
                onChange={handleChange}
                className="p-2 rounded bg-gray-700 text-white placeholder-gray-400"
                placeholder="0"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="waterPresence" className="text-white mb-2">
                Does the planet have water?
              </label>
              <select
                id="waterPresence"
                name="waterPresence"
                value={planetData.waterPresence}
                onChange={handleChange}
                className="p-2 rounded bg-gray-700 text-white"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </form>
        </div>
      </div>
      <div className="text-white border border-white absolute right-0 top-1/2 transform -translate-y-1/2  z-50 rounded-md p-6">
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-3xl font-bold">Structure</h1>
          <button
            className="inline-block cursor-pointer text-5xl"
            onClick={() => changeTexture("right")}
          >
            →
          </button>
        </div>
      </div>
      <div className=" text-white border border-white absolute left-1/2 transform -translate-x-1/2 bottom-0 z-50 rounded-md p-8">
        <AIMessage
          prompt={prompt}
          text={"Calculate Planet's Habitability"}
          className={"rounded-md text-2xl"}
        />
      </div>
      <Globe
        ref={globeRef}
        globeImageUrl={texture}
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      />
    </div>
  );
};

export default CreatePlanet;
