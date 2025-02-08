import Globe from "react-globe.gl";

function App() {
  return (
    <div className="h-screen relative">
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 z-50 bg-white px-4 py-2 rounded-lg shadow-sm">
        <h1 className="text-xl font-bold text-gray-800">Planet Explorer</h1>
      </div>
      <div className="bg-white w-42 absolute top-50 left-0 bottom-50 z-50 rounded-md p-4">
        <div className="flex flex-col items-center">
          <h1>Statistics:</h1>
          <ul className="space-y-2 mt-4">
            <li>Mass: 5.9</li>
            <li>Volume: 24</li>
            <li>Density: 5.5</li>
            <li>Gravity: 9.5</li>
            <li>Avarage temperature: 9.5</li>
          </ul>
        </div>
      </div>
      <div className="bg-white w-42 absolute top-50 right-0 bottom-50 z-50 rounded-md p-4">
        <h1>Statistics</h1>
      </div>
      <div className="bg-white h-32 absolute right-80 left-80 bottom-0 z-50 rounded-t-md p-4">
        <div className="flex justify-center">
          <div className="bg-red-300">CHAt</div>
        </div>
      </div>
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        width="100%"
        height="100%"
      />
    </div>
  );
}

export default App;
