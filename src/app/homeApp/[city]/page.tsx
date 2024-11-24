'use client'
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { selectLocation } from '../../store/locationSlice';
import Image from 'next/image'
interface Params {
  params: Promise<{ city: string }>;
}

interface City {
  _id: string;
  name: string;
  country: string;
  image: string; 
}

interface Place {
  images: string[]; 
  name: string;     
}

interface Tour {
  id: string;       
  name: string;     
  duration: number; 
  places: Place[];  
  distance: string; 
  image: string; 
}

const Page =({params}:Params) => {
  const { city } = React.use(params)
  const [data, setData] = useState<Tour[]>([]); 
  const [dataCity, setDataCity] = useState<City | null>(null); 
  const coordinates = useSelector(selectLocation); 

  useEffect(() => {
    const fetchData = async () => {
      if (coordinates && coordinates.lat && coordinates.lng) { // Ensure coordinates are available
        try {
          const response = await fetch(
            `https://linguistic-josephine-nooragniztion-eccb8a70.koyeb.app/api/tours/nearby?latitude=${coordinates.lat}&longitude=${coordinates.lng}&cityId=${city}`
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const result: Tour[] = await response.json(); // Assert the type of the response
          setData(result);
          console.log("Fetched data:", result);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData(); // Fetch data on component mount or when coordinates change
  }, [coordinates, city]); // Add coordinates and city to the dependencies array

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const response = await fetch(`https://linguistic-josephine-nooragniztion-eccb8a70.koyeb.app/api/City/${city}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const cityData: City = await response.json(); // Assert the type of the response
        setDataCity(cityData); // Set the state with the fetched city data
      } catch (error) {
        console.error('Error fetching city data:', error);
      }
    };

    if (city) { // Check if city is defined
      fetchCityData();
    }
  }, [city]); // Dependency array includes city to fetch again if it changes

  return (
    <div className="max-w-xl-5 mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4">
        {dataCity && ( // Ensure dataCity is available before trying to access its properties
          <div className="relative">
            <Image src={dataCity.image} alt={`${dataCity.name} cityscape`} className="w-full h-60 object-cover" />
            <div className="absolute top-4 left-4 flex space-x-2">
              <button className="bg-white p-2 rounded-full shadow-md"><i className="fas fa-share-alt"></i></button>
              <button className="bg-white p-2 rounded-full shadow-md"><i className="fas fa-heart"></i></button>
              <button className="bg-white p-2 rounded-full shadow-md"><i className="fas fa-search"></i></button>
            </div>
            <div className="absolute top-4 right-4 flex space-x-2">
              <button className="bg-white p-2 rounded-full shadow-md"><i className="fas fa-arrow-left"></i></button>
            </div>
            <div className="absolute bottom-4 left-4 bg-white p-2 rounded-full shadow-md">
              <i className="fas fa-cloud-sun"></i> 24°C
            </div>
          </div>
        )}

        {dataCity && ( // Ensure dataCity is available before rendering
          <div className="p-4">
            <h1 className="text-2xl font-bold">{dataCity.name}</h1>
            <div className="flex justify-between items-center mt-2">
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full flex items-center space-x-2">
                <i className="fas fa-map"></i>
                <span>خريطة</span>
              </button>
              <button className="bg-gray-800 text-white px-4 py-2 rounded-full flex items-center space-x-2">
                <i className="fas fa-cloud-download-alt"></i>
                <span>دليل غير متصل</span>
              </button>
            </div>
          </div>
        )}

        <div className="mt-4 mb-28">
          <h2 className="text-xl font-bold">جولات ذاتية التوجيه</h2>
          {data.map((tour: Tour) => (
            <div key={tour.id} className="mt-6 ">
             
              <div className="flex overflow-x-auto space-x-4 mt-4 hide-scrollbar">
                <div className="flex-shrink-0 w-64">
                  <Image
                    src={tour.image}
                    alt={tour.name}
                    className="w-full h-40 object-cover rounded"
                  />
                  <div className="mt-2 text-gray-500 ">
                    <span className="flex"> {tour.duration}minute | {tour.places.length}  <img className="w-[20px]" src="https://1.bp.blogspot.com/-nO3qPOtQJ-A/Xwo_LZEYCBI/AAAAAAAABAU/KDoOKCEW7UYWLsdqqKYwk6D8of93VapgACLcBGAsYHQ/s2048/location%2Bicon.png" alt="" /> |<bdi className="mr-1 ml-1">كم</bdi> {tour.distance}</span>
                    
                  </div>
                  <h3 className="text-lg font-bold">{tour.name}</h3>
                </div>
                {tour.places.map((place: Place, index: number) => (
                  <div key={index} className="flex-shrink-0 w-[300px]  text-center">
                    <Image
                      src={place.images[0]}
                      alt={place.name}
                      className="w-full h-40 object-cover rounded"
                    />
                    <span className="block text-gray-700 mt-2">{place.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
