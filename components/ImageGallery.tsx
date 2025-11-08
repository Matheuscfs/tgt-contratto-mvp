import React, { useState } from 'react';
import { PortfolioItem } from '../types';

interface ImageGalleryProps {
  items: PortfolioItem[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ items }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openLightbox = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedImage(null);
  };

  if (!items || items.length === 0) {
    return <p className="text-gray-500">Nenhuma imagem no portfólio.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer"
            onClick={() => openLightbox(item.url)}
          >
            <img src={item.url} alt={item.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-end p-2">
              <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">{item.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {lightboxOpen && selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-4 right-4 text-white text-3xl z-50"
            onClick={closeLightbox}
          >
            &times;
          </button>
          <img 
            src={selectedImage} 
            alt="Lightbox" 
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
          />
        </div>
      )}
    </>
  );
};

export default ImageGallery;