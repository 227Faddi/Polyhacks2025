import React, { useEffect, useState } from "react";
import { fetchImageOfTheDay } from "./functions";
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [imageData, setImageData] = useState("");

    useEffect(() => {
        fetchImageOfTheDay().then((data) => {
            setImageData(data.data);
            });
    }, [])

    const navigate = useNavigate();
    const [query, setQuery] = React.useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      navigate(`/search?q=${query}`);
    };

    return (
        <>
        <div className="bg-black text-white min-h-screen">
            <header
                className="relative h-screen flex flex-col items-center justify-center bg-cover bg-center text-center"
                style={{ backgroundImage: `url('textures/background.jpg')` }}
            >
                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
                    Welcome to the Solar System Explorer
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-h-40 overflow-y-auto">
                    Discover the planets and learn about the mission in our solar systems. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia ex nec dui varius, id efficitur lorem auctor. Proin pharetra vel erat vel feugiat. Sed ut urna eu velit lacinia volutpat. Aliquam erat volutpat.
                </p>

                {/* Picture of the Day Section */}
                <section
                    className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 p-4 rounded-lg shadow-lg max-w-sm w-full text-center"
                >
                    <h2 className="text-xl font-bold mb-4 text-white">Picture of the Day</h2>
                    <img
                        src={imageData?.url}
                        alt="Picture of the Day"
                        className="w-full h-40 object-cover rounded-lg mb-3"
                    />
                    <p className="text-sm text-gray-300 mb-2">{imageData?.explanation}</p>
                    <p className="text-xs text-gray-500">
                        Copyright <span className="text-blue-400 font-semibold">{imageData?.copyright}</span>
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
                </section>
            </header>


                <section className="py-12 px-6 bg-gray-900">
                    <div className="max-w-6xl mx-auto text-center">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">About the Planets</h2>
                        <p className="text-lg md:text-xl mb-8">
                            The solar system has eight planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, 
                            and Neptune.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { name: "Mercury", image: "textures/planets/mercury.jpg", link: "/mercury" },
                                { name: "Venus", image: "textures/planets/venus.jpg", link: "/venus" },
                                { name: "Earth", image: "textures/planets/earth.jpg", link: "/earth" },
                                { name: "Mars", image: "textures/planets/mars.jpg", link: "/mars" },
                                { name: "Jupiter", image: "textures/planets/jupiter.jpg", link: "/jupiter" },
                                { name: "Saturn", image: "textures/planets/saturn.jpg", link: "/saturn" },
                                { name: "Uranus", image: "textures/planets/uranus.jpg", link: "/uranus" },
                                { name: "Neptune", image: "textures/planets/neptune.jpg", link: "/neptune" },
                            ].map((planet) => (
                                <div key={planet.name} className="text-center">
                                    <h3 className="text-xl font-bold mb-2">{planet.name}</h3>
                                    <img
                                        src={`${planet.image}`}
                                        alt={planet.name}
                                        className="w-full h-40 object-cover rounded-lg shadow-lg mb-4"
                                    />
                                    <button
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
                                        onClick={() => window.location.href = planet.link}
                                    >
                                        Explore {planet.name}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>


                <footer className="bg-black py-6 text-center text-gray-500">
                    <p>&copy; 2025 Solar System Explorer. All rights reserved.</p>
                </footer>
            </div>
        </>
    );
}
