
import React from 'react';

interface MapEmbedProps {
  lat: number;
  lng: number;
  address: string;
  zoom?: number;
}

const MapEmbed: React.FC<MapEmbedProps> = ({ lat, lng, address, zoom = 15 }) => {
  // This is a placeholder. In a real app, you would use a library like Leaflet, Google Maps, or Mapbox.
  const mapImageUrl = `https://picsum.photos/seed/map/600/400`;

  return (
    <div className="relative w-full h-64 rounded-lg overflow-hidden border">
      <img src={mapImageUrl} alt="Map placeholder" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-white p-4 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-400 mb-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
        <p className="font-semibold">{address}</p>
        <a 
          href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-4 inline-block bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors"
        >
          Obter rotas
        </a>
      </div>
    </div>
  );
};

export default MapEmbed;
