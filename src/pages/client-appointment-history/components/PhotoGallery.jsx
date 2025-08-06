import React, { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PhotoGallery = ({ appointment, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === appointment?.photos?.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? appointment?.photos?.length - 1 : prev - 1
    );
  };

  const handleImageError = (e) => {
    e.target.src = '/api/placeholder/400/300';
  };

  if (!appointment?.photos || appointment?.photos?.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
      <div className="relative w-full max-w-4xl max-h-[90vh]">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-4">
          <div className="flex items-center justify-between text-white">
            <div>
              <h2 className="text-lg font-semibold">
                {appointment?.serviceName}
              </h2>
              <p className="text-sm opacity-80">
                {format(new Date(appointment?.date), "dd 'de' MMMM, yyyy", { locale: ptBR })}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-10 w-10 text-white hover:bg-white/20"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Main Image */}
        <div className="relative bg-black rounded-lg overflow-hidden">
          <img
            src={appointment?.photos?.[currentImageIndex]}
            alt={`Foto ${currentImageIndex + 1} do serviço ${appointment?.serviceName}`}
            className="w-full h-auto max-h-[70vh] object-contain"
            onError={handleImageError}
          />

          {/* Navigation Arrows */}
          {appointment?.photos?.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
              >
                <Icon name="ChevronLeft" size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
              >
                <Icon name="ChevronRight" size={24} />
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentImageIndex + 1} / {appointment?.photos?.length}
          </div>
        </div>

        {/* Thumbnail Strip */}
        {appointment?.photos?.length > 1 && (
          <div className="flex justify-center mt-4 space-x-2 overflow-x-auto">
            {appointment?.photos?.map((photo, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentImageIndex 
                    ? 'border-primary' :'border-transparent opacity-60 hover:opacity-80'
                }`}
              >
                <img
                  src={photo}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/api/placeholder/64/64';
                  }}
                />
              </button>
            ))}
          </div>
        )}

        {/* Download/Share Actions */}
        <div className="flex justify-center mt-4 space-x-2">
          <Button
            variant="outline"
            iconName="Download"
            onClick={() => {
              const link = document.createElement('a');
              link.href = appointment?.photos?.[currentImageIndex];
              link.download = `${appointment?.serviceName}-foto-${currentImageIndex + 1}.jpg`;
              document.body?.appendChild(link);
              link?.click();
              document.body?.removeChild(link);
            }}
            className="bg-black/50 border-white/20 text-white hover:bg-black/70"
          >
            Baixar Foto
          </Button>
          <Button
            variant="outline"
            iconName="Share2"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `Foto do serviço: ${appointment?.serviceName}`,
                  url: appointment?.photos?.[currentImageIndex]
                });
              }
            }}
            className="bg-black/50 border-white/20 text-white hover:bg-black/70"
          >
            Compartilhar
          </Button>
        </div>

        {/* Keyboard Navigation Hint */}
        <div className="absolute bottom-4 right-4 text-white/60 text-xs">
          Use as setas ← → para navegar
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;