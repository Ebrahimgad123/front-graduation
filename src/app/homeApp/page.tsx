"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHeart,
  faMap,
  faCompass,
  faSearch,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useSelector } from 'react-redux'; 
import { selectLocation } from '../store/locationSlice';
import './style.css'
import { useDispatch } from 'react-redux';
import { addFavorite} from "../store/favoritesSlice";
import { RootState } from "../store/store";
interface Destination {
  _id: number;
  name: string;
  country: string;
  image: string; // Ensure this property exists
  distanceFromUser: string; // Adjust type if needed
}

const TravelApp = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [search, setSearch] = useState('');
  const coordinates= useSelector(selectLocation);
  console.log(coordinates);
 
  useEffect(() => {
    const fetchCities = async () => {
      if (coordinates && coordinates.lat && coordinates.lng) {
        try {
          const response = await fetch(`https://backend-graduation.up.railway.app/api/nearby?latitude=${coordinates.lat}&longitude=${coordinates.lng}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const cities = await response.json();
          setDestinations(cities);
          console.log(cities);
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      }
    };

    fetchCities();
  }, [coordinates]);
    
  const router = useRouter();
  const [travelTips] = useState([
    { id: 1, title: "advice 1", description: "حافظ على شرب الماء دائماً. (Always stay hydrated)" },
    { id: 2, title: "advice 2", description: "خطط لمسار رحلتك مسبقاً. (Plan your itinerary in advance)" },
    { id: 3, title: "advice 3", description: "احزم أمتعتك بخفة لتسهيل السفر. (Pack light to make travel easier)" },
    { id: 4, title: "advice 4", description: "احتفظ بأغراضك الثمينة في مكان آمن. (Keep your valuables secure)" },
    { id: 5, title: "advice 5", description: "تعلم بعض العبارات الأساسية باللغة المحلية. (Learn a few basic phrases in the local language)" },
    { id: 6, title: "advice 6", description: "جرب المأكولات المحلية لتجربة أصيلة. (Try local cuisine for an authentic experience)" },
    { id: 7, title: "advice 7", description: "وثق رحلاتك بالصور واليوميات. (Document your travels with photos and journals)" },
    { id: 8, title: "advice 8", description: "وثق رحلاتك بالصور واليوميات. (Document your travels with photos and journals)" },
    { id: 9, title: "advice 9", description: "وثق رحلاتك بالصور واليوميات. (Document your travels with photos and journals)" },
    { id: 10, title: "advice 10", description: "وثق رحلاتك بالصور واليوميات. (Document your travels with photos and journals)" },
    { id: 11, title: "advice 11", description: "وثق رحلاتك بالصور واليوميات. (Document your travels with photos and journals)" },
    { id: 12, title: "advice 12", description: "وثق رحلاتك بالصور واليوميات. (Document your travels with photos and journals)" },
    { id: 13, title: "advice 13", description: "وثق رحلاتك بالصور واليوميات. (Document your travels with photos and journals)" },
    { id: 14, title: "advice 14", description: "وثق رحلاتك بالصور واليوميات. (Document your travels with photos and journals)" },
    { id: 15, title: "advice 15", description: "وثق رحلاتك بالصور واليوميات. (Document your travels with photos and journals)" },
    { id: 16, title: "advice 16", description: "وثق رحلاتك بالصور واليوميات. (Document your travels with photos and journals)" },
    { id: 17, title: "advice 17", description: "وثق رحلاتك بالصور واليوميات. (Document your travels with photos and journals)" },
  ]);

  const dispatch = useDispatch();
  const addToFavorites = (id: number, name: string, image: string) => {
    dispatch(addFavorite({ id, name, image }));
  };

  const filteredDestinations = search? destinations.filter(destination =>
         destination.name.toLowerCase().includes(search.toLowerCase())
       ): destinations;
     

     const favorites = useSelector((state: RootState) => state.favorites.items);
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
       <div onClick={()=>{router.push('/homeApp/favorites')}} className=" cursor-pointer flex items-center bg-red-700 p-1 rounded-full ">
         <FontAwesomeIcon icon={faHeart} className="text-white" />
         <button  className="mb-2 text-white ">{favorites.length}</button>
       </div>
       <div className="relative">
         <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="border rounded-full pl-10 pr-4 py-2 w-full lg:w-[700px] xl:w-[800px]"
            placeholder="Search for Places"
          />
          <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-500" />
          {search && (
          <ul className="absolute top-14 left-0 w-full bg-white shadow-lg border border-gray-200 rounded-lg max-h-60 overflow-y-auto z-10">
            {filteredDestinations.length > 0 ? (
              filteredDestinations.map((destination) => (
                <li key={destination._id} className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-lg">
                  <span className="text-lg font-medium">{destination.name}</span>
                  <img
                    src={destination.image}
                    alt={destination.name}
                    width={90}
                    height={60}
                    className="rounded-xl object-cover ml-4"
                  />
                </li>
              ))
            ) : (
              <p className="text-center text-gray-500">No results found</p>
            )}
          </ul>
        )}

        </div>
      </div>
      <div className="relative mb-4 flex flex-col sm:flex-row gap-3 justify-center items-center">
  <img
    src="/Images/welcome.jpg"
    alt="World map with regions labeled"
    className="w-[90%] h-[400px] rounded-lg sm:w-[45%]"
  />
  <img
    src="/Images/map.jpg"
    alt="World map with regions labeled"
    className="w-[90%] h-[400px] rounded-lg sm:w-[45%]"
  />
</div>

    
      <div className="flex items-center mb-4">
        <button className="bg-gray-200 px-4 py-2 rounded-full">Cairo</button>
        <span className="ml-2">افتتح مؤخرا</span>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg mb-4 flex items-center">
        <img
          src="/Images/welcome.jpeg"
          alt="Egypt flag"
          className="w-[50px] h-[50px] rounded-[100%]  mr-4"
        />
        <div>
          <span className="block">dicover {destinations.length} destination in </span>
          <span className="block font-bold">Egypt</span>
        </div>
        <FontAwesomeIcon icon={faLocationArrow} className="ml-auto" />
      </div>
      <h2 className="text-xl font-bold mb-4"> advices for Trip</h2>
      <div className="flex overflow-x-auto mb-4 scrollbar-hidden"> {/* إضافة class هنا */}
        {travelTips.map((tip) => (
          <div key={tip.id} className="min-w-[200px] mx-2">
            <h3 className="font-bold">{tip.title}</h3>
            <span className="text-gray-500">{tip.description}</span>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4">Discover</h2>
      <div className="flex overflow-x-auto mb-4" style={{ scrollSnapType: "x mandatory" }}>
  {destinations.map((destination, index) => (
    <div
      key={`${destination._id}-${index}`} // Combine id and index for a unique key
      className="min-w-[300px] mr-4"
      style={{
        scrollSnapAlign: "start",
      }}
    >
      <div className="relative">
        <img
          onClick={() => router.push(`/homeApp/${destination._id}`)}
          src={destination.image}
          alt={destination.name}
          className="w-full h-[200px] object-cover rounded-lg"
        />
       <div 
        onClick={() => addToFavorites(destination._id, destination.name, destination.image)} 
        className="absolute top-2 right-2 px-2 py-1 rounded-full border border-white text-red-500 hover:text-black active:text-white cursor-pointer"
      >
        <FontAwesomeIcon icon={faHeart} />
      </div>

        <div className="absolute bottom-2 left-2 bg-black text-white px-2 py-1 rounded-full">
          <FontAwesomeIcon icon={faLocationArrow} />{" "}
            <bdi>كم</bdi>{destination.distanceFromUser}
        </div>
      </div>
      <div className="mt-2 mb-24">
        <h3 className="font-bold">{destination.name}</h3>
        <span className="text-gray-500">{destination.country}</span>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default TravelApp;