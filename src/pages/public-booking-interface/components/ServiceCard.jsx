import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ServiceCard = ({ service, onSelect, isSelected = false }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })?.format(price);
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}min` : `${hours}h`;
  };

  return (
    <div className={`bg-card border rounded-lg p-4 transition-all duration-200 cursor-pointer ${
      isSelected 
        ? 'border-primary ring-2 ring-primary/20 shadow-elevated' 
        : 'border-border hover:border-primary/50 hover:shadow-soft'
    }`} onClick={() => onSelect(service)}>
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Service Image */}
        <div className="w-full sm:w-24 h-32 sm:h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
          <Image
            src={service?.image}
            alt={service?.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Service Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-foreground text-lg leading-tight">
              {service?.name}
            </h3>
            {isSelected && (
              <div className="flex-shrink-0 ml-2">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Check" size={14} color="white" />
                </div>
              </div>
            )}
          </div>

          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {service?.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Icon name="Clock" size={14} />
              <span>{formatDuration(service?.duration)}</span>
            </div>
            
            <div className="flex items-center space-x-1 font-semibold text-primary">
              <Icon name="DollarSign" size={14} />
              <span>{formatPrice(service?.price)}</span>
            </div>

            {service?.category && (
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Icon name="Tag" size={14} />
                <span className="text-xs bg-muted px-2 py-1 rounded-full">
                  {service?.category}
                </span>
              </div>
            )}
          </div>

          {/* Service Features */}
          {service?.features && service?.features?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {service?.features?.slice(0, 3)?.map((feature, index) => (
                <span key={index} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {feature}
                </span>
              ))}
              {service?.features?.length > 3 && (
                <span className="text-xs text-muted-foreground">
                  +{service?.features?.length - 3} mais
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Mobile Select Button */}
      <div className="sm:hidden mt-4">
        <Button
          variant={isSelected ? "default" : "outline"}
          fullWidth
          iconName={isSelected ? "Check" : "Plus"}
          iconPosition="left"
        >
          {isSelected ? "Selecionado" : "Selecionar Serviço"}
        </Button>
      </div>
    </div>
  );
};

export default ServiceCard;