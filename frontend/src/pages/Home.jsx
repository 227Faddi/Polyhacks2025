import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchImageOfTheDay } from "../api";

export default function Home() {
  const [imageData, setImageData] = useState("");

  useEffect(() => {
    fetchImageOfTheDay().then((data) => {
      setImageData(data.data);
    });
  }, []);

  const navigate = useNavigate();
  const [query, setQuery] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${query}`);
  };

  const planets = [
    {
      name: "Mercury",
      image: "textures/planets/mercury.jpg",
      link: "/mercury",
    },
    { name: "Venus", image: "textures/planets/venus.jpg", link: "/venus" },
    { name: "Earth", image: "textures/planets/earth.jpg", link: "/earth" },
    { name: "Mars", image: "textures/planets/mars.jpg", link: "/mars" },
    {
      name: "Jupiter",
      image: "textures/planets/jupiter.jpg",
      link: "/jupiter",
    },
    { name: "Saturn", image: "textures/planets/saturn.jpg", link: "/saturn" },
    { name: "Uranus", image: "textures/planets/uranus.jpg", link: "/uranus" },
    {
      name: "Neptune",
      image: "textures/planets/neptune.jpg",
      link: "/neptune",
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      <header
        className="relative h-screen flex flex-col items-center justify-center text-center px-6 bg-cover bg-center"
        style={{ backgroundImage: `url('textures/background.jpg')` }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="bg-gray-900 p-8 rounded-lg "
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-wide drop-shadow-lg animate-fadeIn">
            Orbitron
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-gray-300 max-w-xl animate-fadeInSlow">
            Explore the wonders of our solar system and uncover the secrets of
            each planet.
          </p>
          <a
            href="#planets"
            className="inline-block mt-8 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-xl px-8 py-4 text-center me-2 mb-2"
          >
            Get Started
          </a>
          <Link
            to="/create"
            className="inline-block mt-8 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-xl px-8 py-4 text-center me-2 mb-2"
          >
            Create Your Planet
          </Link>
        </motion.div>
      </header>
      <section className="py-16 px-6  text-center mb-32" id="planets">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            About the Planets
          </h2>
          <p className="text-lg md:text-xl text-gray-400 mb-10">
            The solar system consists of eight fascinating planets, each with
            unique characteristics. Click on a planet to learn more!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {planets.map((planet, index) => (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                key={index}
                className="text-center transform hover:scale-105 transition duration-300"
              >
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {planet.name}
                </h3>
                <img
                  src={planet.image}
                  alt={planet.name}
                  className="w-full h-48 object-cover rounded-lg shadow-xl border-2 border-gray-700 hover:border-blue-500 transition"
                />
                <Link
                  to={planet.link}
                  className="inline-block mt-8 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-xl px-8 py-4 text-center me-2 mb-2"
                >
                  Explore {planet.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <footer className=" bg-black py-6 text-center text-gray-500 border-t border-gray-700">
        <p>&copy; 2025 Solar System Explorer. All rights reserved.</p>
      </footer>
    </div>
  );
}

{
  /* Picture of the Day Section */
}
{
  /* <section className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 p-4 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xl font-bold mb-4 text-white">
              Picture of the Day
            </h2>
            <img
              src={imageData?.url}
              alt="Picture of the Day"
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <p className="text-sm text-gray-300 mb-2">
              {imageData?.explanation}
            </p>
            <p className="text-xs text-gray-500">
              Copyright{" "}
              <span className="text-blue-400 font-semibold">
                {imageData?.copyright}
              </span>
            </p>
            <form
              className="absolute bottom-4 right-4 flex items-center"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="p-2 rounded-lg text-black"
                placeholder="Search..."
              />
              <button
                type="submit"
                className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
              >
                Search
              </button>
            </form>
          </section> */
}
