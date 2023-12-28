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
        alert(`Added ${name} to the wishlist!`);

        console.log(items);
      } else {
        // If the item already exists, you can choose to show a message or handle it accordingly
        console.log(`Item with ID ${id} already exists in the wishlist.`);
      }
    }
  }

  const handleClick = () => {
    router.push(`/`);
  };

  return (
    <div className="detail flex-1">
      <p className="m-8 cursor-pointer text-2xl" onClick={handleClick}>
        Back
      </p>
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
        <div className="grow">
          <h1 className="mb-4 text-4xl font-bold">Planet: {planet?.name}</h1>
          <ul className="list-disc pl-6">
            <li>Rotation Period: {planet?.rotation_period}</li>
            <li>Orbital Period: {planet?.orbital_period}</li>
            <li>Diameter: {planet?.diameter}</li>
            <li>Climate: {planet?.climate}</li>
            <li>Gravity: {planet?.gravity}</li>
            <li>Terrain: {planet?.terrain}</li>
            <li>Surface Water: {planet?.surface_water}</li>
            <li>Population: {planet?.population}</li>
          </ul>
        </div>
        <div className="ml-8">
          <h2 className="mb-2 text-3xl font-bold">Residents:</h2>
          <ul className="list-disc pl-6">
            {residents.map((resident) => (
              <li key={resident.name}>- {resident.name}</li>
            ))}
          </ul>

          <h2 className="mt-4 mb-2 text-3xl font-bold">Films:</h2>
          <ul className="list-disc pl-6">
            {films.map((film) => (
              <li key={film.title}>- {film.title}</li>
            ))}
          </ul>
          <h1 className="mt-4">Created: {formatDate(planet?.created)}</h1>
          <h1>Edited: {formatDate(planet?.edited)}</h1>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <button
          className="border w-80 border-3 rounded-xl bg-blue-400 hover:bg-slate-400"
          onClick={() => postWishlist(parseInt(slug as string), planet?.name as string)}
        >
          <p className="p-5">Add To Wishlist</p>
        </button>
      </div>
      <br />
    </div>
  );
}

export default Post;
