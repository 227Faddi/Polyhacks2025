import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { fetchSearchNasa } from './functions';


export default function Search() {
    const location = useLocation();
    const [data, setData] = useState([]);
    
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q');
  
    useEffect(() => {
      fetchSearchNasa(query).then((response) => {
        setData(response.data.collection.items);
        console.log(response.collection.items)
      });
    }, [query]);
  
    const limitedData = data.slice(0, 5);

    return (
        <div className="h-screen relative">
        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-lg shadow-sm text-white border border-white">
        <h1 className="text-5xl font-bold text-white capitalize">{query} related content</h1>
        </div>
        <div className="search-container">
          {limitedData.length > 0 ? (
            limitedData.map((item, index) => (
              <div key={index} className="image-container">
                <img src={item.links[0].href} alt={item.data[0].title} className="nasa-image" />
                <p className="image-description">{item.data[0].description}</p>
              </div>
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
        </div>
      );
}