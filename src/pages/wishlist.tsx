// Wishlist.tsx
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export interface IWishlist {
  id: number;
  name: string;
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

const Wishlist: React.FC<IWishlist> = () => {
  const [wishlist, setWishlist] = useState<IWishlist[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Adjust the number of items to display per page

  let items: IWishlist[] = [];

  if (typeof window !== 'undefined') {
    items = JSON.parse(localStorage.getItem('wishlist') || '[]');
  }

  useEffect(() => {
    setWishlist(items);
  }, []);

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Filter the items to display based on the current page
  const displayedItems = wishlist.slice(startIndex, endIndex);

  const router = useRouter();

  const handleClick = () => {
    router.push(`/`);
  };

  return (
    <div className="text-center">
      <p className="m-8 cursor-pointer text-2xl" onClick={handleClick}>
        Back
      </p>
      <h2 className="text-4xl font-bold mb-10">Wishlist</h2>
      <div className="flex justify-center mt-10">
        <div className="grid grid-cols-2 gap-8">
          {displayedItems.map((data, index) => (
            <div key={index} className="relative h-40 w-40 overflow-hidden rounded-lg shadow-md">
              <img src={planetImage[data.id - 1]} alt="" className="object-cover w-full h-full" />
              <p className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white py-2 text-center">
                {data.name}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-10 space-x-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50"
        >
          Previous Page
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={endIndex >= wishlist.length}
          className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50"
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Wishlist;
