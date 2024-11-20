'use client'

import { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Poppins } from 'next/font/google';
import Image from "next/image";

import locationsData from '@/data/locations.json'; // Adjust the path as needed

const center = {
  lat: 40.7128, // Default center (e.g., New York City)
  lng: -74.0060,
};

const containerStyle = {
  width: '100%',
  height: '100%',
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-poppins',
});

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    // Load categories from locations.json
    const fetchCategories = () => {
      // Assuming you want to create categories from locations data
      const uniqueCategories = Array.from(new Set(locationsData.map(location => location.category)))
        .map(category => ({
          name: category,
          imageUrl: 'placeholder-image-url', // Replace with your actual image URLs
          discount: Math.floor(Math.random() * 50) // Random discount for demo purposes
        }));
      setCategories(uniqueCategories);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // Set markers directly from dummy data
    setMarkers(locationsData);
  }, []);

  const handleMapLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  const handleBoundsChanged = () => {
    if (map) {
      const bounds = map.getBounds();
      const northEast = bounds.getNorthEast();
      const southWest = bounds.getSouthWest();

      const fetchMarkers = () => {
        const filteredMarkers = locationsData.filter(marker =>
          marker.latitude >= southWest.lat() &&
          marker.latitude <= northEast.lat() &&
          marker.longitude >= southWest.lng() &&
          marker.longitude <= northEast.lng()
        );
        setMarkers(filteredMarkers);
      };

      fetchMarkers();
    }
  };

  return (
    <div className={`${poppins.variable} flex`}>
      <div className="w-1/3 p-4 overflow-y-auto">
        <h1 className="text-2xl font-semibold">Categories</h1>
        <div className="grid grid-cols-1 gap-4 mt-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative p-4 bg-white rounded-lg shadow-md cursor-pointer"
            >
              <Image src={category.imageUrl} alt={category.name} className="w-full h-24 object-cover rounded-t-lg" />
              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full">
                {category.discount}%
              </div>
              <h2 className="mt-2 text-lg font-medium">{category.name}</h2>
              <button className="mt-2 bg-blue-500 text-white py-1 px-3 rounded">
                Activate Now
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="w-2/3">
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            onLoad={handleMapLoad}
            onBoundsChanged={handleBoundsChanged}
          >
            {markers.map((marker) => (
              <Marker
                key={marker.id}
                position={{ lat: marker.latitude, lng: marker.longitude }}
                onClick={() => {
                  // Logic to show marker info
                  alert(`Marker clicked: ${marker.name}`);
                }}
              />
            ))}
          </GoogleMap>
        )}
      </div>
    </div>
  );
}
