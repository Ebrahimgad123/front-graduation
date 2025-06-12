"use client";
import React, { useState,useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { setLocation } from '../../store/locationSlice'; 
import './location.css'; 
import { useRouter } from 'next/navigation';
import { ClipLoader } from "react-spinners";
interface Coordinates {
  lat: number;
  lng: number;
}

const Page: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch(); 
 
  const handleLocationRequest = () => {
    setLoading(true); 
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentCoordinates: Coordinates = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setIsAllowed(true);
          dispatch(setLocation(currentCoordinates));
          router.push('/homeApp'); 
          setLoading(false); 
        },
        (err) => {
          setError(err.message);
          setIsAllowed(false);
          setLoading(false); 
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
      setIsAllowed(false);
      setLoading(false); 
    }
  };

  const handleAllow = async () => {
    if (navigator.permissions) {
      try {
        const permission = await navigator.permissions.query({ name: 'geolocation' });
        if (permission.state === 'granted' || permission.state === 'prompt') {
          handleLocationRequest();
        } else {
          setError('Access to location has been denied.');
          setIsAllowed(false);
        }
      } catch (error) {
        setError('Error checking location permissions.');
        setLoading(false); 
      }
    } else {
      handleLocationRequest();
    }
  };

  const handleDeny = () => {
    localStorage.removeItem('location');
    router.push('/homeApp'); 
  };

  return (
<div className="container_loc">
  <div className="content">
    <h2 className="title">Would you like to search for nearby places or perform a general search?</h2>
    {error && <p className="error" aria-live="polite">{error}</p>}
    {isAllowed === null && (
      <div className="button-container ">
        <button className="button allow" onClick={handleAllow}>Near By</button>
        <button className="button deny" onClick={handleDeny}>General Search</button>
         <div className="flex items-center justify-center mt-4"><div>
         {loading && (
        <ClipLoader color="#416aef" size={50}  />
           )}</div></div>
      </div>
      
    )}
    
    {isAllowed === false && (
      <p>Please enable location access in your browser settings.</p>
    )}
  </div>
</div>

  );
};

export default Page;
