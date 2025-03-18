"use client";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite, clearFavorites } from '../../store/favoritesSlice'; 
import { useRouter } from 'next/navigation';

interface FavoriteItem {
  id: number;
  name: string;
  image: string;
}

const FavoritesPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const favorites = useSelector((state: any) => state.favorites.items);

  const handleRemoveFavorite = (id: number) => {
    dispatch(removeFavorite(id));
  };

  const handleClearFavorites = () => {
    dispatch(clearFavorites());
  };

  return (
    <div className="p-4">
      {favorites.length === 0 ? (
        <p className="text-2xl"> No favorites item</p>
      ) : (
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Favourite items</h2>
            <button 
              onClick={handleClearFavorites} 
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            >
              Clear all favorites
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-[50px]">
            {favorites.map((favorite: FavoriteItem) => (
              <div key={favorite.id} className="bg-white p-4 rounded-lg shadow-lg relative mb-7">
                <img
                  src={favorite.image}
                  alt={favorite.name}
                  className="w-full h-[200px] object-cover rounded-lg mb-4"
                />
                <div className="flex justify-between">
                  <h3 className="text-lg font-semibold">{favorite.name}</h3>
                  <button
                    onClick={() => router.push(`/homeApp/${favorite.id}`)}
                    className="bg-red-800 rounded-xl text-white px-3 py-1 hover:bg-red-500"
                  >
                    lets start now
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveFavorite(favorite.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                >
                  <span role="img" aria-label="remove">❌</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
