// Wishlist.tsx
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

  let items: IWishlist[] = [];

  if (typeof window !== 'undefined') {
    items = JSON.parse(localStorage.getItem('wishlist') || '[]');
  }

  useEffect(() => {
    setWishlist(items);
  }, []);
  return (
    <div>
      <h2>Wishlist</h2>
      {wishlist.map((data, index) => (
        <div>
          <img
            src={planetImage[data.id - 1]}
            alt=""
          />
          <p>{data.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
