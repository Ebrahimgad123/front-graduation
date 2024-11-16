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

  const handleAllow = async () => {
    setLoading(true); // بدء حالة التحميل
    if (navigator.geolocation) {
      try {
        const permission = await navigator.permissions.query({ name: 'geolocation' });
        
        if (permission.state === 'granted') {
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
              setLoading(false); 
            },
            (err) => {
              setError(err.message);
              setIsAllowed(false);
              setLoading(false); // انتهاء حالة التحميل
            }
          );
        } else if (permission.state === 'prompt') {
          // إذا كانت الحالة "prompt"، يمكننا طلب الموقع
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const currentCoordinates: Coordinates = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              setMarkerPosition(currentCoordinates);
              setIsAllowed(true);
              dispatch(setLocation(currentCoordinates));
              router.push('/homeApp'); // إعادة توجيه إلى صفحة الخريطة
              setLoading(false); // انتهاء حالة التحميل
            },
            (err) => {
              setError(err.message);
              setIsAllowed(false);
              setLoading(false); // انتهاء حالة التحميل
            }
          );
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
      setError('Geolocation is not supported by this browser.');
      setIsAllowed(false);
      setLoading(false); // انتهاء حالة التحميل
    }
  };

  const handleDeny = () => {
    setError("You denied access to your location. Please allow it for better experience.");
    setIsAllowed(false);
  };

  return (
    <div className="container_loc">
      <div className="content">
        <h2 className="title">Allow TravMate to access this device location?</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="error" aria-live="polite">{error}</p>}
        {isAllowed === null && (
          <div className="button-container">
            <button className="button allow" onClick={handleAllow}>Allow</button>
            <button className="button deny" onClick={handleDeny}>Don’t Allow</button>
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
