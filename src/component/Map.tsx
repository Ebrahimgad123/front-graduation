"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useSelector } from "react-redux";
import { selectLocation } from '../app/store/locationSlice';
import './Map.css'
declare global {
  interface HTMLElement {
    _leaflet_id?: number;
  }
}

const LeafletMap = () => {
  const coordinates = useSelector(selectLocation); // الحصول على الإحداثيات من الـ Redux store
  const [destinations, setDestinations] = useState<any[]>([]); // تعديل النوع إلى any[]
  const [loading, setLoading] = useState(false); // حالة تحميل البيانات
  const [error, setError] = useState<string | null>(null); // حالة الخطأ

  useEffect(() => {
    // التأكد من تحميل البيانات فقط عندما تتوفر الإحداثيات
    if (coordinates?.lat && coordinates?.lng) {
      const fetchCities = async () => {
        setLoading(true); // تفعيل حالة التحميل
        try {
          const response = await fetch(`https://backend-graduation.up.railway.app/api/nearby?latitude=${coordinates.lat}&longitude=${coordinates.lng}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const cities = await response.json();
          setDestinations(cities);
          console.log(cities)
        } catch (error: any) {
          setError('Error fetching cities: ' + error.message); // تخزين الخطأ
        } finally {
          setLoading(false); // إنهاء حالة التحميل
        }
      };

      fetchCities();
    }
  }, [coordinates]);

  // تنظيف الخريطة عند مغادرة الصفحة
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.L) {
        const mapElement = document.getElementById("map") as HTMLElement;
        if (mapElement && mapElement._leaflet_id) {
          mapElement._leaflet_id = undefined;
        }
      }
    };
  }, []);

  // التحقق من وجود الإحداثيات قبل عرض الخريطة
  if (!coordinates?.lat || !coordinates?.lng) {
    return <p>الإحداثيات غير متوفرة، لا يمكن عرض الخريطة</p>;
  }

  return (
    <div>
      {loading && <p>جاري تحميل الوجهات...</p>}
      {error && <p>{error}</p>}

      <MapContainer
   id="map"
   center={[coordinates.lat, coordinates.lng]}
   zoom={8}
   dragging={true}
   zoomControl={true}
   doubleClickZoom={false} // إلغاء التكبير بالنقر المزدوج
  //  style={{ height: "660px", width: "100%" }}
>

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* الماركر الخاص بالموقع الحالي */}
        <Marker
          position={coordinates}
          icon={L.divIcon({
            className: 'leaflet-div-icon',
            html: `<div style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                    <img src="https://1.bp.blogspot.com/-nO3qPOtQJ-A/Xwo_LZEYCBI/AAAAAAAABAU/KDoOKCEW7UYWLsdqqKYwk6D8of93VapgACLcBGAsYHQ/s2048/location%2Bicon.png" style="border-radius: 50%; width: 50px; height: 50px; object-fit: cover;" alt="Icon" />
                    <span style="margin-top: 5px; color: black; font-size: 12px;">موقعك الحالي</span>
                  </div>`,
            iconSize: [0, 0],
            iconAnchor: [30, 70],
            popupAnchor: [0, -40]
          })}
        >
          <Popup>{`موقعك الحالي: ${coordinates.lat}, ${coordinates.lng}`}</Popup>
        </Marker>

        {/* عرض الوجهات المستلمة */}
        {destinations.map((destination, index) => (
          <Marker
            key={index}
            position={{ lat: destination.location.coordinates[1], lng: destination.location.coordinates[0] }}
            icon={L.divIcon({
              className: 'leaflet-div-icon',
              html: `<div style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                      <img src="${destination.image}" style="border-radius: 50%; width: 50px; height: 50px; object-fit: cover;" alt="Destination Icon" />
                      <span style="margin-top: 5px; color: black; font-size: 12px;">${destination.name}</span>
                    </div>`,
              iconSize: [0, 0],
              iconAnchor: [20, 50],
              popupAnchor: [0, 0]
            })}
          >
            <Popup>
              <strong>{destination.name}</strong>
              <br />
              <strong>بلد سياحى اكثر من رائع </strong>
              <br />
              <strong>يتمتع بمعالم سياحيه عملاقه</strong>
              <br />
              <strong>به اماكن متعدده</strong>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
