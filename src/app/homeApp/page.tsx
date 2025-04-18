"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHeart,faSearch,faLocationArrow,faCog,faUser,} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useSelector } from 'react-redux'; 
import { selectLocation } from '../store/locationSlice';
import './style.css'
import { useDispatch } from 'react-redux';
import { addFavorite} from "../store/favoritesSlice";
import { RootState } from "../store/store";
import Image from 'next/image'
import { toggleDarkMode } from '../store/themeSlice';
import { Button } from "@mui/material";
import { Brightness4, Brightness7 } from '@mui/icons-material';
import Navbar from "../Navbar/page";


interface Destination {
  _id: number;
  name: string;
  country: string;
  image: string; 
  distanceFromUser: string; 
}

const TravelApp = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [search, setSearch] = useState('');
  const coordinates= useSelector(selectLocation);
  console.log(coordinates);
  const favorites = useSelector((state: RootState) => state.favorites.items);
 
  useEffect(() => {
    const fetchCities = async () => {
      if (coordinates && coordinates.lat && coordinates.lng) {
        try {
          const response = await fetch(
            `https://backend10-henna.vercel.app/api/nearby?latitude=${coordinates.lat}&longitude=${coordinates.lng}`
          );
          if (!response.ok) throw new Error("Network response was not ok");

          const cities = await response.json();
          setDestinations(cities);
        } catch (error) {
          console.error("Error fetching cities:", error);
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
     
       const [isDropdownOpen, setIsDropdownOpen] = useState(false);
       const darkMode = useSelector((state: RootState) => state.theme.darkMode);
       const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
   
  return (
    <div>
      <Navbar />
      <div className="p-4 bg-blue-950 text-white">
       
       
        <div className="relative mb-4 flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Image
            width={300}
            height={300}
            src="/Images/welcome.jpg"
            alt="World map with regions labeled"
            className="w-[100%] h-[400px] rounded-lg sm:w-[45%]"
          />
          <Image
           width={300}
           height={300}
            src="/Images/map.jpg"
            alt="World map with regions labeled"
            className="w-[100%] h-[400px] rounded-lg sm:w-[45%] image2"
          />
        </div>
        
        <div className="bg-black p-4 rounded-lg mb-4 flex items-center bg-blue-900 text-white">
          <Image
            width={200}
            height={200}
            src="/Images/welcome.jpeg"
            alt="Egypt flag"
            className="w-[50px] h-[50px] rounded-[100%]  mr-4 "/>
          <div >
            <span className="block  text-white">dicover {destinations.length} destination in </span>
            <span className="block font-bold  text-white">Egypt</span>
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
  
        <h2 className="text-xl font-bold mb-4">Recommended Places</h2>
        <div className="flex overflow-x-auto  hide-scrollbar" >
       {destinations.map((destination, index) => (
      <div
        key={`${destination._id}-${index}`} 
        className="min-w-[300px] mr-4"
        style={{
          scrollSnapAlign: "start",
        }}
      >
        <div className="relative">
           <Image
            width={200}
            height={200}
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
           
            {localStorage.getItem('location') ? (
                <>
                  <FontAwesomeIcon icon={faLocationArrow} />{" "}
                  <bdi>{destination.distanceFromUser} كم</bdi>
                </>
              ) : ''}
  
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
    </div>
   
  );
};

export default TravelApp;
