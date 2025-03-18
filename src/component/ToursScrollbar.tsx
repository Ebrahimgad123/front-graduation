"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { faHeart, faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { selectLocation } from "../app/store/locationSlice";
import { addFavorite} from "../app/store/favoritesSlice";
interface Destination {
  id: number;
  name: string;
  image: string;
  duration: number;
  distance: number;
  city: string;
}

const ToursScrollbar = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const coordinates = useSelector(selectLocation);
  const dispatch = useDispatch();
  const addToFavorites = (id: number, name: string, image: string) => {
    dispatch(addFavorite({ id, name, image }));
  };
  useEffect(() => {
    const fetchTours = async () => {
      if (coordinates?.lat && coordinates?.lng) {
        try {
          const response = await fetch(
            `http://localhost:9000/api/tours?latitude=${coordinates.lat}&longitude=${coordinates.lng}`
          );
          if (!response.ok) throw new Error("Network response was not ok");

          const cities = await response.json();
          setDestinations(cities);
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      }
    };

    fetchTours();
  }, [coordinates]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Recommended Tours</h2>
      <div className="flex overflow-x-auto mb-4 hide-scrollbar">
        {destinations.map((destination, index) => (
          <div
            key={`${destination.id}-${index}`}
            className="min-w-[300px] mr-4"
            style={{
              scrollSnapAlign: "start",
            }}
          >
            <div className="relative">
              <Image
                width={200}
                height={200}
                src={destination.image}
                alt={destination.name}
                className="w-full h-[200px] object-cover rounded-lg"
              />
              <div
                onClick={() => addToFavorites(destination.id, destination.name, destination.image)} 
                className="absolute top-2 right-2 px-2 py-1 rounded-full border border-white text-red-500 hover:text-black active:text-white cursor-pointer"
              >
                <FontAwesomeIcon icon={faHeart} />
              </div>
              <div className="absolute bottom-2 left-2 bg-black text-white px-2 py-1 rounded-full">
                {localStorage.getItem("location") && (
                  <>
                    <FontAwesomeIcon icon={faLocationArrow} />{" "}
                    <bdi>{destination.distance} كم</bdi>
                  </>
                )}
              </div>
            </div>
            <div className="mt-2 mb-24">
              <h3 className="font-bold">{destination.name}</h3>
              <span className="text-gray-500">{destination.city}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToursScrollbar;
