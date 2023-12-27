// Main/Main.tsx

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface IPlanets {
  name: string;
}

const Main: React.FC = () => {
  const [planets, setPlanets] = useState<IPlanets[]>([]);
  async function fetchPlanets() {
    const response = await fetch('https://swapi.dev/api/planets');
    const data = await response.json();
    setPlanets(data.results);
  }

  useEffect(() => {
    fetchPlanets();
  }, []);

  const planetImage = [
    'https://oyster.ignimgs.com/mediawiki/apis.ign.com/star-wars-episode-7/4/4b/Tatooine-3.jpg',
    'https://upload.wikimedia.org/wikipedia/en/6/60/Alderaan250ppx.PNG',
    'https://static.wikia.nocookie.net/starwars/images/d/d4/Yavin-4-SWCT.png',
    'https://static.wikia.nocookie.net/starwars/images/8/81/Hoth_AoRCR.png',
    'https://static.wikia.nocookie.net/starwars/images/4/48/Dagobah_ep3.jpg',
    'https://static.wikia.nocookie.net/starwars/images/2/2c/Bespin_EotECR.png',
    'https://static.wikia.nocookie.net/starwars/images/5/50/Endor_FFGRebellion.png',
    'https://static.wikia.nocookie.net/starwars/images/f/f0/Naboo_planet.png',
    'https://static.wikia.nocookie.net/starwars/images/1/16/Coruscant-EotE.jpg',
    'https://static.wikia.nocookie.net/starwars/images/a/a9/Eaw_Kamino.jpg'
  ];

  const itemsPerPage = 20;
  const totalPages = Math.ceil(planets.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentPlanets = planets.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const router = useRouter();

  const handleClick = (id: number) => {
    router.push(`/planets/${id}`);
  };

  return (
    <div className="container mx-auto mt-8 p-5 flex flex-col items-center">
      <div className="flex items-center mb-4">
        {/* Content above the planets */}
      </div>
  
      {planets.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className="main justify-center align-items-center flex flex-col items-center">
         <div className="parallax-container">
    <img
      src="/astronot.png"
      alt="Parallax Background"
      className="parallax-image"
    />
    <div className="parallax-text font-bold"
     style={{
      textShadow: '0 0 10px rgba(173, 216, 230, 0.8)',
      fontSize: "100px",
      display:'flex',
      alignItems: 'center',
      justifyContent: 'center'
       // Adjust the color and intensity as needed
    }}
    >Welcome to our galaxy</div>
  </div>

          {currentPlanets.map((planet, index) => (
            <div
            key={planet.name}
            className="md:col-span-1 cursor-pointer text-center mb-8 mt-8"
            onClick={() => handleClick(index + 1)}
          >
            <h2 className=" font-bold mb-4 text-white leading-tight  mb-10"
             style={{
              textShadow: '0 0 10px rgba(173, 216, 230, 0.8)',
              fontSize: "50px", // Adjust the color and intensity as needed
            }}>
              {planet.name}
            </h2>
            <img
              src={planetImage[index]}
              alt={planet.name}
              width={600}
              height={600}
              className='object-cover'
            />
            {/* Additional content, if any */}
          </div>
          
          ))}
        </div>
      )}
  
      {/* Pagination */}
      {/* <div className="flex justify-center mt-8">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-2 p-2 ${
              currentPage === index + 1 ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-800'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div> */}
    </div>
  );
          }  
export default Main;
