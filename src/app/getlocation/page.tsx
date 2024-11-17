"use client";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLocation } from '../store/locationSlice'; // تأكد من تعديل المسار حسب هيكل مشروعك
import './location.css'; 
import { useRouter } from 'next/navigation';

interface Coordinates {
  lat: number;
  lng: number;
}

const Page: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [markerPosition, setMarkerPosition] = useState<Coordinates | null>(null);
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch(); // الحصول على الدالة dispatch

  const handleLocationRequest = () => {
    setLoading(true); // بدء حالة التحميل
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentCoordinates: Coordinates = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMarkerPosition(currentCoordinates);
          setIsAllowed(true);
          dispatch(setLocation(currentCoordinates));
          router.push('/homeApp'); 
          setLoading(false); // انتهاء حالة التحميل
        },
        (err) => {
          setError(err.message);
          setIsAllowed(false);
          setLoading(false); // انتهاء حالة التحميل
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
      setIsAllowed(false);
      setLoading(false); // انتهاء حالة التحميل
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
          setLoading(false); // انتهاء حالة التحميل
        }
      } catch (error) {
        setError('Error checking location permissions.');
        setLoading(false); // انتهاء حالة التحميل
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
    {loading && <p>Loading...</p>}
    {error && <p className="error" aria-live="polite">{error}</p>}
    {isAllowed === null && (
      <div className="button-container">
        <button className="button allow" onClick={handleAllow}>Near By</button>
        <button className="button deny" onClick={handleDeny}>General Search</button>
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
