import { useState, useRef, useEffect } from 'react';
import { calculate_planetary_parameters } from './functions';
import Globe from "react-globe.gl";

const PlanetForm = () => {
  const [formData, setFormData] = useState({
    distanceFromSun: 1, // Default value: Earth distance from the Sun
    mass: 1, // Default value: Earth mass
    temperature: 288, // Default value: Earth temperature (in Kelvin)
    pressure: 1, // Default value: Earth pressure (in bars)
    waterPresence: 1, // Default value: Earth has water
    magneticFieldStrength: 0.5, // Default value: Earth's magnetic field strength in Gauss
    axialTilt: 23.5, // Default value: Earth's axial tilt
    rotationSpeed: 24, // Default value: Earth's rotation speed in hours
    geologicalActivity: 1, // Default value: Earth is geologically active
    radiationLevels: 0.01 // Default value: Earth radiation levels (Sv)
  });

  const [result, setResult] = useState(null);

  const globeRef = useRef();

    useEffect(() => {
        const interval = setInterval(() => {
        if (globeRef.current) {
            globeRef.current.controls().autoRotate = true;
            globeRef.current.controls().autoRotateSpeed = 0.8;
        }
        }, 10);

        return () => clearInterval(interval);
    }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const { distanceFromSun, mass, temperature, pressure, waterPresence, magneticFieldStrength, axialTilt, rotationSpeed, geologicalActivity, radiationLevels } = formData;

      const habitabilityResult = calculate_planetary_parameters(
        parseFloat(distanceFromSun),
        parseFloat(mass),
        parseFloat(temperature),
        parseFloat(pressure),
        waterPresence,
        parseFloat(magneticFieldStrength),
        parseFloat(axialTilt),
        parseFloat(rotationSpeed),
        geologicalActivity,
        parseFloat(radiationLevels)
      );

      setResult(habitabilityResult);
    } catch (error) {
      setResult({ "error": error.message });
    }
  };

  return (
    <div className="h-screen relative flex">
    <div className="flex flex-col space-y-6 w-1/3 p-4">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
        <div>
            <label className="text-2xl">Distance from the Sun (AU):</label>
            <input
            type="number"
            name="distanceFromSun"
            value={formData.distanceFromSun}
            onChange={handleChange}
            className="p-2 text-black rounded-lg"
            placeholder="Enter distance in AU"
            />
        </div>
        <div>
            <label className="text-2xl">Mass (Earth masses):</label>
            <input
            type="number"
            name="mass"
            value={formData.mass}
            onChange={handleChange}
            className="p-2 text-black rounded-lg"
            placeholder="Enter mass in Earth masses"
            />
        </div>
        <div>
            <label className="text-2xl">Surface Temperature (K):</label>
            <input
            type="number"
            name="temperature"
            value={formData.temperature}
            onChange={handleChange}
            className="p-2 text-black rounded-lg"
            placeholder="Enter temperature in Kelvin"
            />
        </div>
        <div>
            <label className="text-2xl">Atmospheric Pressure (bars):</label>
            <input
            type="number"
            name="pressure"
            value={formData.pressure}
            onChange={handleChange}
            className="p-2 text-black rounded-lg"
            placeholder="Enter pressure in bars"
            />
        </div>
        <div>
            <label className="text-2xl">Water Presence (0 for No, 1 for Yes):</label>
            <input
            type="number"
            name="waterPresence"
            value={formData.waterPresence}
            onChange={handleChange}
            className="p-2 text-black rounded-lg"
            placeholder="Enter 0 or 1"
            />
        </div>
        <div>
            <label className="text-2xl">Magnetic Field Strength (G):</label>
            <input
            type="number"
            name="magneticFieldStrength"
            value={formData.magneticFieldStrength}
            onChange={handleChange}
            className="p-2 text-black rounded-lg"
            placeholder="Enter magnetic field strength in Gauss"
            />
        </div>
        <div>
            <label className="text-2xl">Axial Tilt (°):</label>
            <input
            type="number"
            name="axialTilt"
            value={formData.axialTilt}
            onChange={handleChange}
            className="p-2 text-black rounded-lg"
            placeholder="Enter axial tilt in degrees"
            />
        </div>
        <div>
            <label className="text-2xl">Rotation Speed (hours):</label>
            <input
            type="number"
            name="rotationSpeed"
            value={formData.rotationSpeed}
            onChange={handleChange}
            className="p-2 text-black rounded-lg"
            placeholder="Enter rotation speed in hours"
            />
        </div>
        <div>
            <label className="text-2xl">Geological Activity (0 for No, 1 for Yes):</label>
            <input
            type="number"
            name="geologicalActivity"
            value={formData.geologicalActivity}
            onChange={handleChange}
            className="p-2 text-black rounded-lg"
            placeholder="Enter 0 or 1"
            />
        </div>
        <div>
            <label className="text-2xl">Radiation Levels (Sv):</label>
            <input
            type="number"
            name="radiationLevels"
            value={formData.radiationLevels}
            onChange={handleChange}
            className="p-2 text-black rounded-lg"
            placeholder="Enter radiation levels in Sv"
            />
        </div>
        <button
            type="submit"
            className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
        >
            Calculate Habitability
        </button>
        </form>

        {result && (
        <div className="mt-4 text-2xl">
            {result.error ? (
            <p className="text-red-500">{result.error}</p>
            ) : (
            <p>Habitability Probability: {result["Habitability Probability (0-100)"]}%</p>
            )}
        </div>
        )}
    </div>

    <div className="flex-grow flex justify-center items-center">
        <Globe
        ref={globeRef}
        globeImageUrl={`./textures/earth.jpg`}
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        />
    </div>
    </div>
  );
};

export default PlanetForm;
