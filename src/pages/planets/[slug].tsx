// pages/posts/[slug].js
import { useRouter } from 'next/router';
import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { IWishlist } from '@pages/wishlist';

interface IPlanet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  created: string;
  edited: string;
  residents: string[]; // Array of resident URLs
  films: string[]; // Array of film URLs
}

interface IResident {
  name: string;
  // Add other resident properties as needed
}

interface IFilm {
  title: string;
  // Add other film properties as needed
}

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

function Post() {
  const router = useRouter();
  const { slug } = router.query;

  const imageIndex = parseInt(slug as string) - 1;

  // Use imageIndex in the src attribute, or provide a default value if it's undefined

  const [planet, setPlanet] = useState<IPlanet>();
  const [residents, setResidents] = useState<IResident[]>([]);
  const [films, setFilms] = useState<IFilm[]>([]);

  const fetchPlanet = useCallback(async () => {
    try {
      const response = await fetch(`https://swapi.dev/api/planets/${slug}`);
      const data = await response.json();

      console.log(response);
      console.log(data);

      setPlanet(data);

      // Fetch residents
      const residentsPromises = data.residents.map(async (residentUrl: string) => {
        const residentResponse = await fetch(residentUrl);
        const residentData = await residentResponse.json();
        return residentData;
      });

      const residentsData = await Promise.all(residentsPromises);
      setResidents(residentsData);

      // Fetch films
      const filmsPromises = data.films.map(async (filmUrl: string) => {
        const filmResponse = await fetch(filmUrl);
        const filmData = await filmResponse.json();
        return filmData;
      });

      const filmsData = await Promise.all(filmsPromises);
      setFilms(filmsData);
    } catch (error) {
      console.error('Error fetching planet:', error);
    }
  }, [slug]);

  useEffect(() => {
    if (slug) {
      fetchPlanet();
    }
  }, [slug, fetchPlanet]);

  function formatDate(timestamp: string | undefined): string {
    if (!timestamp) {
      return 'N/A';
    }

    const dateObject = new Date(timestamp);
    return dateObject.toLocaleString(); // Adjust this line for a custom format if needed
  }

   // Check if localStorage is defined (client-side) before using it
  let items: IWishlist[] = [];
  if (typeof window !== 'undefined') {
    items = JSON.parse(localStorage.getItem('wishlist') || '[]');
  }

  function postWishlist(id: number, name: string) {
    if (typeof window !== 'undefined') {
      // Check if the item with the given ID already exists in the wishlist
      const isItemExist = items.some((item) => item.id === id);

      if (!isItemExist) {
        // If the item doesn't exist, add it to the wishlist
        const newItem = {
          id: id,
          name: name,
        };

        items.push(newItem);

        // Update local storage
        localStorage.setItem('wishlist', JSON.stringify(items));

        console.log(items);
      } else {
        // If the item already exists, you can choose to show a message or handle it accordingly
        console.log(`Item with ID ${id} already exists in the wishlist.`);
      }
    }
  }

  return (
    <div className="detail flex-1 ">
      <div className="flex justify-center">
        <img
          src={planetImage[imageIndex]}
          alt={planet?.name}
          width={500}
          height={500}
          className="object-cover"
        />
      </div>

      <div className="flex m-10 mx-72 text-2xl">
        <div className='grow'>
          <h1>Planet: {planet?.name}</h1>
          <h1>Rotation Period: {planet?.rotation_period}</h1>
          <h1>Orbital Period: {planet?.orbital_period}</h1>
          <h1>Diameter: {planet?.diameter}</h1>
          <h1>Climate: {planet?.climate}</h1>
          <h1>Gravity: {planet?.gravity}</h1>
          <h1>Terrain: {planet?.terrain}</h1>
          <h1>Surface Water: {planet?.surface_water}</h1>
          <h1>Population: {planet?.population}</h1>
        </div>
        <div className=''>
          <h2>Residents:</h2>
          <ul>
            {residents.map((resident) => (
              <li key={resident.name}>- {resident.name}</li>
            ))}
          </ul>

          <h2>Films:</h2>
          <ul>
            {films.map((film) => (
              <li key={film.title}>- {film.title}</li>
            ))}
          </ul>
          <h1>Created: {formatDate(planet?.created)}</h1>
          <h1>Edited: {formatDate(planet?.edited)}</h1>
        </div>
      </div>
      <div className='flex align-middle justify-center'>
          <button className=' border w-80 border-3 rounded-xl bg-blue-400 hover:bg-slate-400' onClick={() => postWishlist(parseInt(slug as string), planet?.name as string)}>
            <p className='p-5 '>Add To Wishlist</p>
          </button>
      </div>
      <br />
    </div>
  );
}

export default Post;
